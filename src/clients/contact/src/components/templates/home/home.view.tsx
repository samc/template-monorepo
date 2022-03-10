import * as Leva from "leva";
import * as React from "react";

import * as Elements from "@taygo/client.contact/elements";
import * as Layouts from "@taygo/client.contact/layouts";
import * as TS from "@taygo/client.contact/ts";
import * as Utils from "@taygo/client.contact/utils";

import * as Constants from "./home.constants";
import * as Styled from "./home.styled";
import * as Machine from "./home.machine";

import { Animator } from "./home.animator";
import { Controller } from "./home.controller";
import { Observer } from "./home.observer";

const defaultProps = Object.freeze<View.Props>({});

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

	// ===[Segments]===
	// ...

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { data } = this.context;

		return (
			<Layouts.Default>
				<Elements.Show active={data.home.debug.value}>
					<View.Relay />
				</Elements.Show>
				<View.Container>
          <Elements.Contact />
        </View.Container>
			</Layouts.Default>
		);
	}
}

export namespace View {
	export interface Props {}
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

	const [leva, setLevaHome] = Leva.useControls(
		Constants.Component.NAME,
		() => Machine.Home.defaultContext,
	);

	React.useEffect(() => {
		setLevaHome({ debug: data.home.debug.value });
	}, [data.home.debug.value, setLevaHome]);
	React.useEffect(() => {
		setLevaHome({ status: data.home.status.value });
	}, [data.home.status.value, setLevaHome]);

	React.useEffect(() => {
		data.home.debug.update(leva.debug);
	}, [leva.debug]);
	React.useEffect(() => {
		data.home.status.update(leva.status);
	}, [leva.status]);

	return <React.Fragment />;
};

View.Relay.displayName = `${View.displayName}.Relay`;

// ---[View.Container]---------------------------------------------------------

View.Container = (props): JSX.Element => {
	const { children } = props;

	const { springs } = Animator.useContext();
	const { data } = Controller.useContext();
	const { sensors } = Observer.useContext();

	return (
		<Styled.Root.Container style={springs}>{children}</Styled.Root.Container>
	);
};

View.Container.displayName = `${View.displayName}.Container`;
