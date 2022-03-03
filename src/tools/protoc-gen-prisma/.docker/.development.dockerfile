ARG GOLANG_VERSION

#  ⌜                                       ⌝
#     Stage 1:
#      - Create trusted root certificate
#  ⌞                                       ⌟

FROM alpine:latest as certs-builder
RUN apk --update --no-cache add ca-certificates

#  ⌜                                                              ⌝
#    Stage 2:
#     - Setup virtual working directory
#     - Setup Go environment
#     - Download dependencies
#     - Copy root certificates
#     - Install Compile Daemon
#        * See available configurations at:
#          https://github.com/githubnemo/CompileDaemon#development
#     - Run Compile Daemon as an entrypoint
#  ⌞                                                              ⌟

FROM golang:${GOLANG_VERSION}-alpine AS go-builder

WORKDIR /app

ENV GO111MODULE=on\
  CGO_ENABLED=0 \
  GOOS=linux \
  GOARCH=amd64

COPY ./go.* ./
RUN go mod download
COPY ./ ./

COPY --from=certs-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

RUN go get github.com/githubnemo/CompileDaemon

ENTRYPOINT CompileDaemon -build="go build -o start ./cmd/app/app.go" -command="./start"
