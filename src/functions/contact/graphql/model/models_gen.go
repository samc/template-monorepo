// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Contact struct {
	ID      string `json:"id"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	Message string `json:"message"`
}

type ContactCreateInput struct {
	Email   string `json:"email"`
	Name    string `json:"name"`
	Message string `json:"message"`
}

type ContactUpdateInput struct {
	Email   *string `json:"email"`
	Name    *string `json:"name"`
	Message *string `json:"message"`
}
