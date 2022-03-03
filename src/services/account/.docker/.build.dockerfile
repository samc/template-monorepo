ARG GOLANG_VERSION

#  ⌜                                       ⌝
#     Stage 1:
#      - Create trusted root certificate
#  ⌞                                       ⌟

FROM alpine:latest as certs-builder
RUN apk --update --no-cache add ca-certificates

#  ⌜                                   ⌝
#    Stage 2:
#     - Setup virtual working directory
#     - Setup Go environment
#     - Download dependencies
#     - Build Go binary
#     - Copy root certificate
#  ⌞                                   ⌟

FROM golang:${GOLANG_VERSION}-alpine AS go-builder

WORKDIR /app

ENV GO111MODULE=on\
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

COPY ./go.* ./
RUN go mod download
COPY ./ ./

RUN go build \
  -installsuffix 'static' \
  -o start ./cmd/app

#  ⌜                                   ⌝
#    Stage 3:
#     - Copy root certificates
#     - Copy Go binary
#     - Run Go binary
#  ⌞                                   ⌟

FROM scratch AS final

COPY --from=certs-builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=go-builder /app/start /app/start

CMD ["/app/start"]
