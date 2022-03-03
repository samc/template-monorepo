---
to: <%= src %>/app/app.go
force: true
---
package app

import (
	"context"
)

// App ...
type App struct {
  config Config
  db *DB
  service Service
}

// New ...
func New(ctx context.Context) *App {
	return &App{
    config: NewConfig(ctx),
    db: NewDB(ctx),
    service: NewService(ctx),
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

	if err = app.InitService(ctx); err != nil {
		return err
	}

	return nil
}
