import json
import importlib
import os
import pathlib
import platform
import re
import subprocess

from invoke import task
from invoke.collection import Collection
from invoke.config import Config

from scripts import config, fingerprint, linters
from scripts.lib import file as xfile
from scripts.lib import string as xstring

#  ⌜                                ⌝
#    See available configurations at:
#    https://docs.pyinvoke.org
#  ⌞                                ⌟

rootdir = pathlib.Path.cwd()
protodir = pathlib.Path(rootdir, ".proto")
srcdir = pathlib.Path(rootdir, "src")

cfgpath = pathlib.Path(rootdir, ".env.yaml")

if not os.path.isfile(cfgpath) and os.environ.get("INIT") == "True":
    config.generate_config(rootdir)

cfg = Config({"stage": "development"})
cfg.set_runtime_path(cfgpath)
cfg.load_runtime()

ns = Collection()
ns.configure(cfg)


@task(name="refresh")
def _refresh(context):
    # Set the current project stage
    os.environ["PROJECT_STAGE"] = context.stage

    # Set the project commit hash.
    os.environ["PROJECT_COMMIT"] = xstring.normalize(
        subprocess.check_output(
            [
                "git",
                "rev-parse",
                "--abbrev-ref",
                "HEAD",
            ]
        )
    )

    # Set the current operating system & CPU architecture of the current
    # development environment
    os.environ["PROJECT_SYSTEM"] = platform.system().lower()
    os.environ["PROJECT_ARCH"] = platform.machine().lower()

    if fingerprint.has_file_changed(rootdir, "package.json"):
        install_node(context)

    if fingerprint.has_file_changed(rootdir, "pyproject.toml"):
        install_python(context)

    if fingerprint.has_file_changed(rootdir, "tools.go"):
        install_go(context)

    generate(context)


ns.add_task(_refresh)


# --=[Collection.Generate]=----------------------------------------------------

# generate.all (generate)
@task(
    pre=[_refresh],
    default=True,
    name="all",
)
def generate(context):
    """
    Trigger all generators.
    """
    generate_config(context)
    generate_linters(context)


generate_collection = Collection("generate", generate)
ns.add_collection(generate_collection)

# generate.config
@task(
    pre=[_refresh],
    name="config",
    help={"stage": "Indicate project environment (default 'development')"},
)
def generate_config(context, stage="development"):
    """
    Generate all root level config files.
    """
    config.generate_config(rootdir, context.stage or stage)


generate_collection.add_task(generate_config)


# generate.linters
@task(pre=[_refresh], name="linters")
def generate_linters(context):
    """
    Copy the linters found in the `./linters` directory to the `root`,
    and `./.github/linters` directories.
    """
    linters.generate_linters(rootdir)


generate_collection.add_task(generate_linters)


# generate.api
@task(
    pre=[_refresh],
    name="api",
    help={
        "all": "generate api files for all clients & services",
        "clients": "generate api all clients",
        "services": "generate api all services",
        "client": "generate api for a single client",
        "service": "generate api for a single service",
    },
)
def generate_api(
    context, all=False, clients=False, services=False, client=None, service=None
):
    """
    Generate api files.
    """

    def generate_files(type, name, path):
        flags = [
            f"--output {path}",
            f'--template {pathlib.Path(path, "buf.gen.yaml")}',
        ]

        if type == "client":
            flags.append(f'--path={pathlib.Path(protodir, "services")}')

        if type == "service":
            services = list(context.workspace.services.keys())
            services.remove(name)

            for exclusion in services:
                flags.append(
                    f'--exclude={pathlib.Path(protodir, "services", exclusion)}'
                )

        context.run(
            f'buf generate {" ".join(flags)}',
        )

    if all or services:
        for name, path in context.workspace.services.items():
            generate_files("service", name, path)

    if all or clients:
        for name, path in context.workspace.clients.items():
            generate_files("client", name, path)

    if client and not (service or all or clients or services):
        generate_files("client", client, context.workspace.clients[client])

    if service and not (client or all or clients or services):
        generate_files("service", service, context.workspace.services[service])


generate_collection.add_task(generate_api)


# --=[Collection.Dry]=---------------------------------------------------------

# dry.all (dry)
@task(
    pre=[_refresh],
    default=True,
    name="all",
)
def dry(context):
    """
    Run all `dry` tasks.
    """
    dry_release(context)
    dry_act(context)


dry_collection = Collection("dry", dry)
ns.add_collection(dry_collection)


# dry.release
@task(pre=[_refresh], name="release")
def dry_release(context):
    """
    Trigger a new git dry run release via `semantic-release`.
    """
    context.run("npm run release-dry-run")


dry_collection.add_task(dry_release)


# dry.act.all (dry.act)
@task(
    pre=[_refresh],
    default=True,
    name="all",
)
def dry_act(context):
    """
    Trigger all Github Actions dry-runs.
    """
    dry_act_pull_request(context)
    dry_act_push(context)


dry_act_collection = Collection("act", dry_act)
dry_collection.add_collection(dry_act_collection)


# dry.act.pull-request
@task(
    pre=[_refresh],
    name="pull-request",
    aliases=["pr"],
    help={
        "dryrun": "Enable dryrun mode",
        "job": "Run specified job",
        "list": "List available jobs",
        "verbose": "Enable verbose output",
    },
    optional=["job"],
)
def dry_act_pull_request(
    context,
    dryrun=False,
    job=None,
    list=False,
    verbose=False,
):
    """
    Trigger all `pull_request` Github Action workflows on the current branch.
    """
    flags = [
        f"--dryrun={str(dryrun).lower()}",
        f"--env DEFAULT_WORKSPACE={rootdir}",
        f"--env MEGALINTER_VOLUME_ROOT={rootdir}",
        f"--list={str(list).lower()}",
        f"--verbose={str(verbose).lower()}",
        f"--secret GITHUB_TOKEN={os.environ['GITHUB_TOKEN']}",
    ]

    if job:
        context.run(f"act pull_request --job={job} {' '.join(flags)}")
    else:
        context.run(f"act pull_request {' '.join(flags)}")


dry_act_collection.add_task(dry_act_pull_request)


# dry.act.push
@task(
    pre=[_refresh],
    name="push",
    help={
        "dryrun": "Enable dryrun mode",
        "job": "Run specified job",
        "list": "List available jobs",
        "verbose": "Enable verbose output",
    },
    optional=["job"],
)
def dry_act_push(
    context,
    dryrun=False,
    job=None,
    list=False,
    verbose=False,
):
    """
    Trigger all `push` Github Action workflows on the current branch.
    """
    flags = [
        f"--dryrun={str(dryrun).lower()}",
        f"--env DEFAULT_WORKSPACE={rootdir}",
        f"--env MEGALINTER_VOLUME_ROOT={rootdir}",
        f"--list={str(list).lower()}",
        f"--verbose={str(verbose).lower()}",
        f"--secret GITHUB_TOKEN={os.environ['GITHUB_TOKEN']}",
    ]

    if job:
        context.run(f"act push --job={job} {' '.join(flags)}")
    else:
        context.run(f"act push {' '.join(flags)}")


dry_act_collection.add_task(dry_act_push)


# buf.all (buf)
@task(
    pre=[_refresh],
    default=True,
    name="all",
)
def buf(context):
    """
    Run all `buf` tasks.
    """
    buf_login(context)
    buf_generate(context)


buf_collection = Collection("buf", buf)
ns.add_collection(buf_collection)


# buf.login
@task(
    pre=[_refresh],
    aliases=["l"],
    name="login",
)
def buf_login(context):
    """
    Login ot the `buf` registry.
    """
    username = os.environ.get("BUF_USERNAME")
    token = os.environ.get("BUF_TOKEN")

    context.run(
        f'buf login --username {username} --token-stdin < <(echo "{token}")'
    )


buf_collection.add_task(buf_login)


# buf.generate.all (buf.generate)
@task(
    pre=[_refresh],
    aliases=["g", "gen"],
    name="all",
)
def buf_generate(context):
    """
    Run all `buf.generate` tasks.
    """
    buf_generate_services(context)


buf_generate_collection = Collection("generate", buf_generate)
buf_collection.add_collection(buf_generate_collection)

# buf.generate.services
@task(
    pre=[_refresh],
    aliases=["s", "svc"],
    name="services",
)
def buf_generate_services(context):
    """
    Generate protocol buffer definitions for all services.
    """

    api_pb_path = pathlib.Path(
        rootdir,
        "api",
        "lib",
        "growthat",
        "nexus",
    )

    for service in context.deployment.service.keys():
        servicedir = pathlib.Path(
            rootdir,
            "src",
            "services",
            service,
        )

        api_path = pathlib.Path(servicedir, "api")
        api_lib_path = pathlib.Path(api_path, "lib")

        pb_path = pathlib.Path(api_lib_path, "growthat")
        pb_gen_path = pathlib.Path(api_path, "gen")

        buf_build_config_path = pathlib.Path(api_lib_path, "buf.yaml")
        buf_gen_config_path = pathlib.Path(
            servicedir,
            "buf.gen.yaml",
        )

        context.run(f"rm -rf {pb_gen_path}")
        context.run(
            f"buf generate --path {api_pb_path} --path {pb_path} --output {servicedir} --config {buf_build_config_path} --template {buf_gen_config_path} --include-imports"
        )


buf_generate_collection.add_task(buf_generate_services)


# --=[Collection.Init]=--------------------------------------------------------

# init.all
@task(
    post=[_refresh],
    default=True,
    name="all",
)
def init(context):
    """
    Run all `init` tasks.
    """
    init_git(context)
    init_tree(context)


init_collection = Collection("init", init)
ns.add_collection(init_collection)


# init.git
@task(post=[_refresh], name="git")
def init_git(context):
    """
    Initialize all `git` scope modifications.
    """
    context.run("git flow init")
    context.run("git config gitflow.path.hooks .husky")


init_collection.add_task(init_git)


# init.tree
@task(post=[_refresh], name="tree")
def init_tree(context):
    """
    Create any files / directories required prior to development.
    """
    # Misc. directories
    tmpdir = os.path.join(rootdir, ".tmp")
    settingsdir = pathlib.Path(rootdir, ".settings")
    fingerprintdir = os.path.join(tmpdir, "fingerprint")

    dirs = [
        {"path": tmpdir},
        {"path": fingerprintdir},
    ]

    for dir in dirs:
        pathlib.Path(dir["path"]).mkdir(parents=True, exist_ok=True)

    # Settings files
    default_settings_path = os.path.join(settingsdir, "_.json")
    default_settings_str = xfile.get(default_settings_path)
    default_settings_json = json.loads(default_settings_str)
    default_settings_json["init"] = True
    default_settings_str = json.dumps(
        default_settings_json, indent=2, sort_keys=True
    )
    xfile.overwrite(default_settings_path, default_settings_str)


init_collection.add_task(init_tree)


# --=[Collection.Install]=-----------------------------------------------------

# install.all
@task(
    pre=[_refresh],
    default=True,
    name="all",
)
def install(context):
    """
    Run all `install` tasks.
    """
    install_go(context)


install_collection = Collection("install", install)
ns.add_collection(install_collection)


# install.go
@task(
    pre=[_refresh],
    aliases=["g"],
    name="go",
)
def install_go(context):
    """
    Install go build dependencies
    """
    tools_str = xfile.get("tools.go")
    tools = re.findall(
        r"\s+_\s\"(.*)\"\s+\/\/(.*)",
        tools_str,
    )

    for tool in tools:
        (name, version) = tool
        context.run(f"go install {name}@{version}")


install_collection.add_task(install_go)


# install.node
@task(pre=[_refresh], name="node")
def install_node(context):
    """
    Install node build dependencies
    """
    context.run("npm run install")


install_collection.add_task(install_node)


# install.python
@task(pre=[_refresh], name="python")
def install_python(context):
    """
    Install python build dependencies
    """
    context.run("poetry install")


install_collection.add_task(install_python)


# --=[Collection.Update]=------------------------------------------------------

# update.all
@task(
    pre=[_refresh],
    default=True,
    name="all",
)
def update(context):
    """
    Run all `update` tasks.
    """
    update_nix(context)
    update_node(context)
    update_python(context)


update_collection = Collection("update", update)
ns.add_collection(update_collection)


# update.nix
@task(pre=[_refresh], name="nix")
def update_nix(context):
    """
    Update nix dependencies.
    """
    sourcespath = pathlib.Path(rootdir, ".nix", "sources.json")

    context.run(f"niv -s {sourcespath} update growthatpkgs")
    context.run(f"niv -s {sourcespath} update niv")
    context.run(f"niv -s {sourcespath} update nixpkgs")


update_collection.add_task(update_nix)


# update.npm
@task(pre=[_refresh], name="npm")
def update_node(context):
    """
    Update npm packages.
    """
    context.run("npm run update")


update_collection.add_task(update_node)


# update.poetry
@task(pre=[_refresh], name="poetry")
def update_python(context):
    """
    Update python packages
    """
    context.run("poetry update")


update_collection.add_task(update_python)


# --=[Tasks]=------------------------------------------------------------------

# task.clean
@task()
def clean(context):
    """
    Remove build artifacts, downloaded dependencies,
    and generated files.
    """
    context.run("git clean -Xdf")
    context.run("rm -rf ./.github/linters/*")
    context.run("rm -rf ./.github/linters/*")


ns.add_task(clean)


# task.code
@task()
def code(context):
    """
    Launch Visual Studio Code.
    """
    context.run("code .vscode/eden.code-workspace")


ns.add_task(code)

# task.dev
@task()
def dev(context):
    """
    Start the development server.
    """
    context.run("npm run dev", pty=True)


ns.add_task(dev)


# task.lint
@task(
    pre=[_refresh],
    help={
        "all": "Check all files instead of only changed files",
        "fix": "Automatically apply all fixes without prompting",
    },
)
def lint(context, all=False, fix=False):
    """
    Run all `trunk` linters.
    """
    context.run(
        f"trunk check --all={str(all).lower()} --fix={str(fix).lower()}",
    )


ns.add_task(lint)


@task(
    pre=[_refresh],
    help={
        "tool": "",
        "command": "",
    },
)
def tool(context, tool, command):
    toolpath = pathlib.Path(rootdir, "src", "tools", tool)
    context.run(f"invoke --search-root={toolpath} {command}")


ns.add_task(tool)
