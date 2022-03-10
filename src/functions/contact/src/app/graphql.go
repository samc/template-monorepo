package app

import (
	"context"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/debug"
	"go-micro.dev/v4/logger"

	"taygo.contact/graphql/generated"
)

// InitGraphQL initializes the GraphQL server and enables query / mutation
// resolvers.
func (app *App) InitGraphQL(ctx context.Context) (err error) {
	resolvers, err := app.Resolvers(ctx)
	if err != nil {
		return err
	}

	server := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: resolvers}))
	server.Use(&debug.Tracer{})

	http.Handle("/query", server)

  port := app.config.Get("port").String("4000")

  logger.Infof("GraphQL server listening on port %d", port)
  err = http.ListenAndServe(":"+port, nil)
  if err != nil {
    return err
  }

  return nil
}
