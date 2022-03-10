package app

import (
	"context"
)

// App ...
type App struct {
  config Config
  db *DB
}

// New ...
func New(ctx context.Context) *App {
	return &App{
    config: NewConfig(ctx),
    db: NewDB(ctx),
  }
}

// Init ...
func (app *App) Init(ctx context.Context) (err error) {
  if err = app.InitConfig(ctx); err != nil {
		return err
	}

  if err = app.InitDB(ctx); err != nil {
		return err
	}

  if err = app.InitGraphQL(ctx); err != nil {
    return err
  }

  defer func() {
    if err := app.db.Prisma.Disconnect(); err != nil {
      panic(err)
    }
  }()

	return nil
}
