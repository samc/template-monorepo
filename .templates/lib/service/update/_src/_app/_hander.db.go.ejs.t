---
to: <%= src %>/app/handler.db.go
force: true
---
package app

import (
	"context"

  prisma "eden.<%= fileName %>/db"
)

<% h.models.forEach((model) => { -%>
<% if (model.type === "model") { -%>
func (app *App) <%=  %>(ctx context.Context) (err error) {
  if err := app.db.Prisma.Connect(); err != nil {
    return err
  }

  defer func() {
    if err := app.db.Prisma.Disconnect(); err != nil {
      panic(err)
    }
  }()

  return nil
}

<% }; -%>

<% }); -%>


func (app *App) InitDB(ctx context.Context) (err error) {
  if err := app.db.Prisma.Connect(); err != nil {
    return err
  }

  defer func() {
    if err := app.db.Prisma.Disconnect(); err != nil {
      panic(err)
    }
  }()

  return nil
}
