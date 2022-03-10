import * as ND from "next/document";
import * as React from "react";
import NextDocument from "next/document";
import { ServerStyleSheet } from "styled-components";

import * as Constants from "./document.constants";

const defaultProps = Object.freeze<Document.Props>({
	styleTags: [],
});

export class Document extends NextDocument<Document.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: Document.Props = defaultProps;

	// ===[Nodes]===

	public static Container: Document.Container;
	public static Head: Document.Head;
	public static Body: Document.Body;

	// ===[Lifecycle]===

	render(): JSX.Element {
		const { styleTags } = this.props;

		return (
			<Document.Container>
				<Document.Head styleTags={styleTags} />
				<Document.Body />
			</Document.Container>
		);
	}

	static async getInitialProps(context: ND.DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = context.renderPage;

		try {
			context.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await NextDocument.getInitialProps(context);
			return {
				...initialProps,
				styles: (
					<React.Fragment>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</React.Fragment>
				),
			};
		} finally {
			sheet.seal();
		}
	}
}

export namespace Document {
	export interface Props {
		styleTags: React.ReactElement[];
	}
	export interface State extends React.ComponentState {}

	export interface Container extends React.FunctionComponent<Container.Props> {}
	export namespace Container {
		export interface Props {}
	}

	export interface Head extends React.FunctionComponent<Head.Props> {}
	export namespace Head {
		export interface Props extends Document.Props {}
	}

	export interface Body extends React.FunctionComponent<Body.Props> {}
	export namespace Body {
		export interface Props {}
	}
}

// ---[Document.Container]-----------------------------------------------------

Document.Container = (props): JSX.Element => {
	const { children } = props;

	return <ND.Html>{children}</ND.Html>;
};

Document.Container.displayName = `${Document.displayName}.Container`;

// ---[Document.Head]----------------------------------------------------------

Document.Head = (props): JSX.Element => {
	const { styleTags } = props;

	return <ND.Head>{styleTags}</ND.Head>;
};

Document.Head.displayName = `${Document.displayName}.Head`;

// ---[Document.Body]----------------------------------------------------------

Document.Body = (props): JSX.Element => {
	return (
		<body>
			<ND.Main />
			<ND.NextScript />
		</body>
	);
};

Document.Body.displayName = `${Document.displayName}.Body`;
