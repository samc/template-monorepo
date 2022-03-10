//go:build tools

package tools

import (
	_ "github.com/99designs/gqlgen"                         //latest
	_ "github.com/bufbuild/buf/cmd/buf"                     //v1.0.0-rc8
	_ "github.com/envoyproxy/protoc-gen-validate"           //latest
	_ "github.com/go-delve/delve/cmd/dlv"                   //latest
	_ "github.com/google/gnostic/cmd/protoc-gen-jsonschema" //latest
	_ "github.com/google/gnostic/cmd/protoc-gen-openapi"    //latest
	_ "github.com/martinxsliu/protoc-gen-graphql"           //latest
	_ "github.com/ramya-rao-a/go-outline"                   //latest
	_ "golang.org/x/tools/gopls"                            //latest
  _ "google.golang.org/protobuf/cmd/protoc-gen-go"        //latest
	_ "honnef.co/go/tools/cmd/staticcheck"                  //latest
)
