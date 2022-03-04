import * as Api from "@taygo/client.main/api";

export interface StaticProps {
	props: {
		params: import("querystring").ParsedUrlQuery;
		data: Api.ContentQueryQuery;
		variables: Api.Exact<{ relativePath: string }>;
		query: string;
	};
}
