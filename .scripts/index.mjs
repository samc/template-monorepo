#!/usr/bin/env zx

import * as Commander from "commander";
import * as Path from "path";
import Conf from "conf";
import "zx/globals";

import * as Constants from "./constants.mjs";
import * as Commands from "./commands/index.mjs";

const config = new Conf({
	cwd: Path.resolve(".config"),
	defaults: require(Path.resolve(".config/config.json")),
});
config.set(
	require(Path.resolve(
		`.config/config.${process.env.STAGE ?? "development"}.json`,
	)),
);

const program = new Commander.Command();
program.name("eden").description("Eden CLI").version(Constants.VERSION);

// ⌜                   ⌝
//   [[eden.clean]]
//
//   Available options:
//   - --all
// ⌞                   ⌟
program.addCommand(Commands.clean(config));

// ⌜              ⌝
//   [[eden.code]]
// ⌞              ⌟
program.addCommand(Commands.code(config));

// ⌜             ⌝
//   [[eden.dev]]
// ⌞             ⌟
program.addCommand(Commands.dev(config));

// ⌜                     ⌝
//   [[eden.init]]
//
//   Available commands:
//   - git
//   - tree
// ⌞                     ⌟
program.addCommand(Commands.init(config));

// ⌜                        ⌝
//   [[eden.lint]]
//
//   Available options:
//   - --all
//   - --fix
//   - --filter [linters...]
// ⌞                        ⌟
program.addCommand(Commands.lint(config));

// ⌜                        ⌝
//   [[eden.service]]
//
//   Available options:
//   - --all
//
//   Available commands:
//   - run
// ⌞                        ⌟
program.addCommand(Commands.service(config));

program.parse(process.argv.slice(1));
