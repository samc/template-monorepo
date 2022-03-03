---
to: <%= src %>/app/service.go
force: true
---
package app

import (
	"context"

  micro "go-micro.dev/v4"
	"go-micro.dev/v4/metadata"
	"go-micro.dev/v4/server"
	"go-micro.dev/v4/logger"

  pb "eden.<%= fileName %>/api/eden/<%= fileName %>"
)

// Service is a type alias for the Go Micro's service type.
type Service = micro.Service

// NewService returns the local `Service` type alias struct.
func NewService(ctx context.Context) Service {
	return micro.NewService()
}

// InitService initializes the `<%= fileName %>` service.
func (app *App) InitService(ctx context.Context) (err error) {
  // Set service options.
  app.service.Init(
    micro.Name(app.config.Name),
  )

  // Initialize server
  server := app.service.Server()

  // Register the service handlers
  if err = pb.RegisterAccountServiceHandler(server, handler); err != nil {
    return err
  }

  // Register event subscriptions
<% Object.keys(h.service.methods).forEach(function(method) { -%>
<% if (method !== "Get" && method !== "List") { -%>
  micro.RegisterSubscriber(pb.<%= className %>Event_EVENT_<%= `${method.toUpperCase()}_${constantName}`  %>.String(), app.service.Server(), handler.<%= h.inflection.humanize(method) %>Event)
<% }; -%>
<% }); -%>

  // Run the service
  if err = app.service.Run(); err != nil {
		return err
	}

	return nil
}
