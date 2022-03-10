const { ApolloServer } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const Conf = require("conf");
const Path = require("path");

const config = new Conf({
	cwd: Path.resolve(".config"),
	defaults: require(Path.resolve(".config/config.json")),
});

// Add any local config overrides for the current environment stage.
config.set(
	require(Path.resolve(
		`.config/config.${process.env.STAGE ?? "development"}.json`,
	)),
);

// Add any environment variables passed to the process to the config.
for (let [key, value] of Object.entries(process.env)) {
	key = key.split("_").join(".").toLowerCase();
	config.set(key, value);
}

// The ApolloGateway handles running all of your GraphQL endpoints
const gateway = new ApolloGateway({
	supergraphSdl: new IntrospectAndCompose({
		subgraphs: [
			{ name: "contact", url: config.get("entity.function.contact.url") },
		],
	}),
});

// Create the ApolloServer instance and run it.
const port = config.get("entity.gateway.graphql.port");
const server = new ApolloServer({ gateway });
server.listen(port).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
