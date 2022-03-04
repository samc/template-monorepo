import * as Leva from "leva";
import * as NextApp from "next/app";
import * as React from "react";

import * as Elements from "@taygo/client.main/elements";
import * as TS from "@taygo/client.main/ts";
import * as Utils from "@taygo/client.main/utils";

import * as Constants from "./app.constants";
import * as Machine from "./app.machine";
import * as Styled from "./app.styled";

import { Controller } from "./app.controller";

const defaultProps = Object.freeze<View.Props>({
	pageProps: undefined,
	router: undefined,
	Component: undefined,
});

const defaultState = Object.freeze<View.State>({});

export class View extends React.Component<View.Props, View.State> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.NAME}.View`;
	public static readonly defaultProps: View.Props = defaultProps;
	public static readonly defaultState: View.State = defaultState;
	public readonly state: View.State = defaultState;

	// ===[Context]===

	public static contextType = Controller.Context;
	declare context: Controller.ContextType;

	// ===[Nodes]===

	public static Container: View.Container;
	public static Relay: View.Relay;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { Component, pageProps } = this.props;
		const { data } = this.context;

		return (
			<React.Fragment>
				<Elements.Show active={data.app.debug.value}>
					<View.Relay />
				</Elements.Show>
				<View.Container>
					<Component {...pageProps} />
				</View.Container>
			</React.Fragment>
		);
	}
}

export namespace View {
	export interface Props extends NextApp.AppProps<TS.StaticProps["props"]> {
		pageProps: TS.StaticProps["props"];
	}
	export interface State {}

	export interface Relay extends React.FunctionComponent<Relay.Props> {}
	export namespace Relay {
		export interface Props {}
	}

	export interface Container extends React.FunctionComponent<Container.Props> {}
	export namespace Container {
		export interface Props {}
	}
}

// ---[View.Relay]---------------------------------------------------------

View.Relay = (props): JSX.Element => {
	const { data } = Controller.useContext();

	const [levaApp, setLevaApp] = Leva.useControls(
		Constants.Component.NAME,
		() => Machine.App.defaultContext,
	);

	React.useEffect(() => {
		setLevaApp({ status: data.app.status.value });
	}, [data.app.debug.value]);
	React.useEffect(() => {
		setLevaApp({ status: data.app.status.value });
	}, [data.app.status.value]);

	React.useEffect(() => {
		data.app.debug.update(levaApp.debug);
	}, [levaApp.debug]);
	React.useEffect(() => {
		data.app.status.update(levaApp.status);
	}, [levaApp.status]);

	return <React.Fragment />;
};

View.Relay.displayName = `${View.displayName}.Relay`;

// ---[View.Container]---------------------------------------------------------

View.Container = (props): JSX.Element => {
	const { children } = props;

	const { data } = Controller.useContext();

	return <Styled.Root.Container>{children}</Styled.Root.Container>;
};

View.Container.displayName = `${View.displayName}.Container`;
