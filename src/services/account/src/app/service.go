package app

import (
	"context"

  micro "go-micro.dev/v4"
	"go-micro.dev/v4/metadata"
	"go-micro.dev/v4/server"
	"go-micro.dev/v4/logger"

  pb "eden.account/api/eden/account"
)

// Service is a type alias for the Go Micro's service type.
type Service = micro.Service

// NewService returns the local `Service` type alias struct.
func NewService(ctx context.Context) Service {
	return micro.NewService()
}

// InitService initializes the `account` service.
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
  micro.RegisterSubscriber(pb.AccountEvent_EVENT_CREATE_ACCOUNT.String(), app.service.Server(), handler.CreateEvent)
  micro.RegisterSubscriber(pb.AccountEvent_EVENT_UPDATE_ACCOUNT.String(), app.service.Server(), handler.UpdateEvent)
  micro.RegisterSubscriber(pb.AccountEvent_EVENT_DELETE_ACCOUNT.String(), app.service.Server(), handler.DeleteEvent)

  // Run the service
  if err = app.service.Run(); err != nil {
		return err
	}

	return nil
}
