package main

import (
	"context"

	"go-micro.dev/v4/errors"
	"go-micro.dev/v4/logger"

	"taygo.contact/src/app"
)

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	if err := run(ctx); err != nil {
		logger.Fatal(errors.FromError(err))
	}
}

func run(ctx context.Context) (err error) {
	if err := logger.Init(logger.WithFields(map[string]interface{}{
		"function": "contact",
	})); err != nil {
		return err
	}

	app := app.New(ctx)
	if err = app.Init(ctx); err != nil {
		return err
	}

	return nil
}
