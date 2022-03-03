package app

import (
	"context"

	pb "eden.account/api/eden/account"
	"eden.account/db"
)

// ...
func (app *App) Create(ctx context.Context, request *pb.CreateAccountRequest, response *pb.Account) (err error) {
  var account *db.AccountModel
  account, err = app.db.Account.CreateOne(
    db.Account.Email.Set(request.Account.GetEmail()),
  ).Exec(ctx)
  if err != nil {
    return err
  }
  print(account)

  var credential *db.CredentialModel
  credential, err = app.db.Credential.CreateOne(
    db.Credential.Account.Link(
      db.Account.ID.Equals(account.ID),
    ),
    db.Credential.Type.Set("CREDENTIAL_TYPE_OAUTH2"),
  ).Exec(ctx)
  if err != nil {
    return err
  }
  print(credential)

  var oauth2 *db.CredentialOAuth2Model
  oauth2, err = app.db.CredentialOAuth2.CreateOne(
    db.CredentialOAuth2.Credential.Link(
      db.Credential.ID.Equals(credential.ID),
    ),
    db.CredentialOAuth2.Access.Set("CREDENTIAL_TYPE_OAUTH2"),
    db.CredentialOAuth2.Refresh.Set("CREDENTIAL_TYPE_OAUTH2"),
  ).Exec(ctx)
  if err != nil {
    return err
  }
  print(oauth2)

  account, err = app.db.Account.FindFirst(db.Account.ID.Equals(account.ID)).Exec(ctx)
  print(account)

  return nil
}
