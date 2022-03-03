package main

import (
	context "context"

	app "eden.account/src/app"
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
    "service": "auth",
  })); err != nil {
    return err
  }

	app := app.New(ctx)
	if err = app.Init(ctx); err != nil {
		return err
	}

	return nil
}
