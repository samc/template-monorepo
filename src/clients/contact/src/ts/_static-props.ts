import * as Api from "@taygo/client.contact/api";

export interface StaticProps {
	props: {
		params: import("querystring").ParsedUrlQuery;
		data: Api.ContentQueryQuery;
		variables: Api.Exact<{ relativePath: string }>;
		query: string;
	};
}
