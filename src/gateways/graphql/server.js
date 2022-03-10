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

const gateway = new ApolloGateway({
	supergraphSdl: new IntrospectAndCompose({
		subgraphs: [{ name: "contact", url: "http://localhost:4000/query" }],
	}),
});

const port = config.get("port");
const server = new ApolloServer({ gateway });

server.listen(port).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
