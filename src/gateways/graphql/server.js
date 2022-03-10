const { ApolloServer } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const Conf = require("conf");
const Path = require("path");

const config = new Conf({
	cwd: Path.resolve(".config"),
	defaults: require(Path.resolve(".config/config.json")),
});
config.set(
	require(Path.resolve(
		`.config/config.${process.env.STAGE ?? "development"}.json`,
	)),
);
for (let [key, value] of Object.entries(process.env)) {
	key = key.split("_").join(".").toLowerCase();
	config.set(key, value);
}

const gateway = new ApolloGateway({
	supergraphSdl: new IntrospectAndCompose({
		subgraphs: [{ name: "contact", url: config.get("entity.gateway.contact.url") }],
	}),
});

const port = config.get("port");
const server = new ApolloServer({ gateway });

server.listen(port).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
