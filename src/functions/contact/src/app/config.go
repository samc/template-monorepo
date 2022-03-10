package app

import (
	"context"
  "os"

  "go-micro.dev/v4/config"
	"go-micro.dev/v4/config/source"
  "go-micro.dev/v4/config/source/env"
  "go-micro.dev/v4/config/source/file"
)

// Config is a type alias for Micros's `Config`.
type Config = config.Config

// NewConfig returns a new Config instance.
func NewConfig(ctx context.Context) Config {
	c, _ := config.NewConfig()
  return c
}

// InitConfig initializes the `config` method handler for the application.
func (app *App) InitConfig(ctx context.Context) (err error) {
  var src source.Source

  // Load default local config.
  src = file.NewSource(file.WithPath("./.config/config.json"))
  if err = app.config.Load(src); err != nil {
    return err
  }

  // Load local config for the current project stage.
  src = file.NewSource(file.WithPath("./.config/config." + os.Getenv("STAGE") + ".json"))
  if err = app.config.Load(src); err != nil {
    return err
  }

  // Load config passed via environment variables.
  src = env.NewSource(env.WithPrefix("FUNCTION_CONTACT"))
  if err = app.config.Load(src); err != nil {
    return err
  }

  return nil
}
