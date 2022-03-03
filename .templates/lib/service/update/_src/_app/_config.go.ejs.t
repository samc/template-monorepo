---
to: <%= src %>/app/config.go
force: true
---
package app

import (
	"context"
  "os"

  "go-micro.dev/v4/config"
	"go-micro.dev/v4/config/source"
  "go-micro.dev/v4/config/source/env"
  "go-micro.dev/v4/config/source/file"
)

// Config ...
type Config = config.Config

// NewConfig ...
func NewConfig(ctx context.Context) Config {
	c, _ := config.NewConfig()
  return c
}

// InitConfig ...
func (app *App) InitConfig(ctx context.Context) (err error) {
  var src source.Source

  // Load default local settings.
  src = file.NewSource(file.WithPath("./.settings/_.json"))
  if err = app.config.Load(src); err != nil {
    return err
  }

  // Load local settings for the current project stage.
  src = file.NewSource(file.WithPath("./.settings/" + os.Getenv("STAGE") + ".json"))
  if err = app.config.Load(src); err != nil {
    return err
  }

  // Load settings passed via environment variables.
  src = env.NewSource(env.WithPrefix("ACCOUNT"))
  if err = app.config.Load(src); err != nil {
    return err
  }

  return nil
}
