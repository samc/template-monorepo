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
      Name: "Documentation",
      Profile: Profiles.Work,
      Position: Positions.Left,
      Groups: [
        {
          Name: "Apollo",
          Color: Chrome.Page.TabGroupColors.Purple,
          Urls: [
            "https://www.apollographql.com/docs",
            "https://www.apollographql.com/docs/federation",
            "https://github.com/apollographql/apollo"
          ]
        },
        {
          Name: "Prisma",
          Color: Chrome.Page.TabGroupColors.White,
          Urls: [
            "https://www.prisma.io/docs",
            "https://www.prisma.io/docs/concepts/components/prisma-schema",
            "https://www.prisma.io/docs/concepts/components/prisma-client",
            "https://github.com/prisma-korea/graphql-schema-generator"
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
          Name: "XState",
          Color: Chrome.Page.TabGroupColors.White,
          Urls: [
            "https://xstate.js.org/docs/about/glossary.html",
            "https://github.com/statelyai/xstate"
          ]
        },
      ]
    },
    {
      Name: "Deployment",
      Profile: Profiles.Work,
      Position: Positions.Left,
      Groups: [
        {
          Name: "Vercel",
          Color: Chrome.Page.TabGroupColors.White,
          Urls: [
            "https://vercel.com/docs",
            "https://github.com/vercel"
          ]
        },
        {
          Name: "GCP",
          Color: Chrome.Page.TabGroupColors.White,
          Urls: [
            "https://cloud.google.com/kubernetes-engine/docs",
            "https://cloud.google.com/bigquery/docs"
          ]
        },
      ]
    }
  ]
})

Exit
