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
          Name: "AWS",
          Color: Chrome.Page.TabGroupColors.Yellow,
          Urls: [
            "https://docs.aws.amazon.com",
            "https://docs.aws.amazon.com/lambda/latest/dg/API_Reference.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/golang-handler.html",
            "https://docs.aws.amazon.com/lambda/latest/dg/go-image.html"
          ]
        },
        {
          Name: "Serverless",
          Color: Chrome.Page.TabGroupColors.Red,
          Urls: [
            "https://www.serverless.com/framework/docs",
            "https://www.serverless.com/cloud/docs",
            "https://github.com/serverless/serverless",
            "https://github.com/dherault/serverless-offline",
            "https://www.serverless.com/framework/docs/providers/aws/guide/functions"
          ]
        },
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
