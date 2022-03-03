import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
	projects: {
		app: {
			schema: "src/.tina/__generated__/schema.gql",
			documents: [
				"src/.tina/__generated__/queries.gql",
				"src/.tina/__generated__/frags.gql",
				"src/.tina/queries/queries.gql",
				"src/.tina/queries/frags.gql",
				"src/pages/**/*.{graphql,js,ts,jsx,tsx}",
			],
		},
	},
};

export default config;
