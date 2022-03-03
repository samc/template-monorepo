{ sources ? import ./sources.nix }:

let
  inherit (import sources.niv { }) niv;
  growthatpkgs = import sources.growthatpkgs { };
  overlay = _: pkgs: {
    inherit (import sources.niv { }) niv;
    inherit (import sources.growthatpkgs { })
      act
      nodejs-16-4-0
      ;
  };
in
rec {
  pkgs = import sources.nixpkgs {
    overlays = [ overlay ];
  };
}
