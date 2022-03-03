//go:build tools

package tools

import (
	_ "entgo.io/contrib/entproto/cmd/protoc-gen-ent"        //latest
	_ "entgo.io/contrib/entproto/cmd/protoc-gen-entgrpc"    //latest
	_ "entgo.io/ent/cmd/ent"                                //latest
	_ "github.com/bufbuild/buf/cmd/buf"                     //v1.0.0-rc8
	_ "github.com/google/gnostic/cmd/protoc-gen-jsonschema" //latest
	_ "github.com/google/gnostic/cmd/protoc-gen-openapi"    //latest
	_ "go-micro.dev/v4/cmd/micro"                           //master
	_ "go-micro.dev/v4/cmd/protoc-gen-micro"                //v4
	_ "golang.org/x/tools/gopls"                            //latest
	_ "google.golang.org/grpc/cmd/protoc-gen-go-grpc"       //latest
	_ "google.golang.org/protobuf/cmd/protoc-gen-go"        //latest
	_ "moul.io/protoc-gen-gotemplate"                       //latest
)
