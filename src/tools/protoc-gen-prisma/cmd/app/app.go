package main

import (
	context "context"
)

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
}

func run(ctx context.Context) (err error) {
	return nil
}
