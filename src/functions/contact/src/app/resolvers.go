package app

import (
	"context"

	pb "taygo.contact/api/taygo/contact"
	"taygo.contact/db"
	"taygo.contact/graphql"
	"taygo.contact/graphql/model"
)

func (app *App) Resolvers(ctx context.Context) (resolver *graphql.Resolver, err error) {
  resolver = &graphql.Resolver{}

  resolver.MutationResolver.CreateContact = func(ctx context.Context, contact model.ContactCreateInput) (*model.Contact, error) {
    // Validate `CreateContact` input
    pbc := &pb.Contact{
      Email: contact.Email,
      Name: contact.Name,
      Message: contact.Message,
    }
    err = pbc.Validate()
    if err != nil {
      return nil, err
    }

    // Create new `Contact`
    c, err := app.db.Contact.CreateOne(
      db.Contact.Email.Set(contact.Email),
      db.Contact.Name.Set(contact.Name),
      db.Contact.Message.Set(contact.Message),
    ).Exec(ctx)
    if err != nil {
      return nil, err
    }

    // Return `Contact`
    return &model.Contact{
      ID: c.ID,
      Email: c.Message,
      Name: c.Message,
      Message: c.Message,
    }, nil
  }

  return resolver, nil
}
