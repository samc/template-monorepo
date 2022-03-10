package app

import (
	"context"

  "taygo.contact/db"
)

// DB is a type alias for Prisma's `PrismaClient`.
type DB = db.PrismaClient

// NewDB returns a new Prisma client instance.
func NewDB(ctx context.Context) *DB {
	return db.NewClient()
}

// InitDB initializes the Prisma client connection.
func (app *App) InitDB(ctx context.Context) (err error) {
  if err := app.db.Prisma.Connect(); err != nil {
    return err
  }

  return nil
}
