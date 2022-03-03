import * as Next from "next";

import * as Api from "@eden/client.main/api";
import * as Templates from "@eden/client.main/templates";
import * as Blocks from "@eden/client.main/blocks";
import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";

export default function Router(props: TS.StaticProps["props"]) {
	const { data, params } = props;

	switch (params.route) {
		case "home":
			return <Blocks.Factory {...data.getPagesDocument.data} />;
		default:
			/**
			 * @todo Add 404 page
			 */
			return <Blocks.Factory {...data.getPagesDocument.data} />;
	}
}

export async function getStaticProps(
	context: Next.GetStaticPropsContext,
): Promise<TS.StaticProps> {
	const { params } = context;

	const client = Api.ExperimentalGetTinaClient();
	const content = await client.ContentQuery({
		relativePath: `${params.route}.md`,
	});

	return {
		props: {
			...content,
			params,
		},
	};
}

export async function getStaticPaths(): Promise<TS.StaticPaths> {
	const client = Api.ExperimentalGetTinaClient();
	const pagesListData = await client.getPagesList();

	return {
		paths: pagesListData.data.getPagesList.edges.map((page) => ({
			params: { route: page.node.sys.filename },
		})),
		fallback: false,
	};
}
