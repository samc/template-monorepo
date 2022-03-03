---
to: <%= src %>/app/db.go
force: true
---
package app

import (
	"context"

  prisma "eden.<%= fileName %>/db"
)

// DB is a type alias for the Prisma's `PrismaClient`.
type DB = prisma.PrismaClient

// NewDB returns a new Prisma client.
func NewDB(ctx context.Context) *DB {
	return prisma.NewClient()
}

// InitDB ...
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
