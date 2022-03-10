Persistent()

#Include "../../lib/array.ahk"
#Include "../../lib/chrome.ahk"
#Include "../../lib/delay.ahk"
#Include "../../lib/hotkeys.ahk"
#Include "../../lib/shell.ahk"

#Include "constants.ahk"
#Include "helpers.ahk"

SetupTools({
  Index: 3,
  Applications: [
    {
      Name: Applications.Altair.Name,
      Executable: Applications.Altair.Executable,
      TitleMatch: Applications.Altair.Name,
      Position: Positions.Center
    },
  ],
  Pages: [
    {
      Name: "Documentation - Scripting",
      Profile: Profiles.Work,
      Position: Positions.Left,
      Groups: [
        {
          Name: "Nix",
          Color: Chrome.Page.TabGroupColors.Blue,
          Urls: [
            "https://github.com/NixOS/nix",
            "https://github.com/NixOS/nixpkgs",
            "https://nixos.org/manual/nix/stable",
            "https://nixos.org/manual/nixpkgs/stable"
          ]
        },
        {
          Name: "AWS",
          Color: Chrome.Page.TabGroupColors.Yellow,
          Urls: [
            "https://docs.aws.amazon.com"
          ]
        },
        {
          Name: "Serverless",
          Color: Chrome.Page.TabGroupColors.Red,
          Urls: [
            "https://www.serverless.com/framework/docs",
            "https://www.serverless.com/cloud/docs",
            "https://github.com/serverless/serverless"
          ]
        },
        {
          Name: "API Gateway",
          Color: Chrome.Page.TabGroupColors.Red,
          Urls: [
            "https://www.serverless.com/framework/docs",
            "https://www.serverless.com/cloud/docs",
            "https://github.com/serverless/serverless"
          ]
        },
        {
          Name: "Next.js",
          Color: Chrome.Page.TabGroupColors.White,
          Urls: [
            "https://nextjs.org/docs/getting-started",
            "https://github.com/vercel/next.js"
          ]
        },
        {
          Name: "Material UI",
          Color: Chrome.Page.TabGroupColors.Blue,
          Urls: [
            "https://mui.com/getting-started/usage",
            "https://github.com/mui/material-ui"
          ]
        }
      ]
    }
  ]
})

Exit
