{ nix ? import ./.nix { } }:

let
  inherit (nix) pkgs;
in
pkgs.mkShell rec {
  name = "eden";
  env = pkgs.buildEnv {
    name = name;
    paths = buildInputs;
  };
  buildInputs = [
    pkgs.aws
    pkgs.gitflow
    pkgs.go
    pkgs.kubernetes-helm
    pkgs.nixpkgs-fmt
    pkgs.nodejs-16-4-0
    pkgs.poetry
    pkgs.python
    pkgs.skaffold
  ];
}
