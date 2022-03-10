import * as Apollo from "@apollo/client";

const cache: Apollo.InMemoryCache = new Apollo.InMemoryCache();

export const client: Apollo.ApolloClient<Apollo.NormalizedCacheObject> =
	new Apollo.ApolloClient({
		cache,
		uri: "http://localhost:5000",
	});
