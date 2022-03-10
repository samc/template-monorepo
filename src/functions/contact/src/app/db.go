package app

import (
	"context"

  prisma "taygo.contact/db"
)

// DB is a type alias for Prisma's `PrismaClient`.
type DB = prisma.PrismaClient

// NewDB returns a new Prisma client instance.
func NewDB(ctx context.Context) *DB {
	return prisma.NewClient()
}

// InitDB initializes the `db` method handler for the application.
func (app *App) InitDB(ctx context.Context) (err error) {
  if err := app.db.Prisma.Connect(); err != nil {
    return err
  }

  return nil
}
