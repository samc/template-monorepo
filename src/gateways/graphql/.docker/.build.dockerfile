ARG ENTITY_GATEWAY_GRAPHQL_PORT
ARG TOOLS_NODEJS_VERSION

FROM node:${TOOLS_NODEJS_VERSION}-alpine as base

FROM base as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

FROM base

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY . .

EXPOSE ${ENTITY_GATEWAY_GRAPHQL_PORT}

ENTRYPOINT [ "node", "server.js" ]
