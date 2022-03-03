import * as Leva from "leva";
import * as React from "react";

import * as Machines from "@eden/client.main/machines";

import * as Elements from "@eden/client.main/elements";

import * as Constants from "./header.constants";
import * as Segments from "./header.segments";
import * as Styled from "./header.styled";

import { Animator } from "./header.animator";
import { Controller } from "./header.controller";
import { Observer } from "./header.observer";

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

	public static Brand = Segments.Brand;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { data } = this.context;

		return (
			<React.Fragment>
				<Elements.Show active={data.global.debug.value}>
					<View.Relay />
				</Elements.Show>
				<View.Container>
					<View.Relay />
					<View.Brand />
					{/* <View.CTA /> */}
					{/* <View.Cart /> */}
				</View.Container>
			</React.Fragment>
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
	// eslint-disable-next-line @typescript-eslint/no-namespace
	export namespace Container {
		export interface Props {}
	}
}

// ---[View.Relay]---------------------------------------------------------

View.Relay = (props): JSX.Element => {
	const { data } = Controller.useContext();

	const [levaHeader, setLevaHeader] = Leva.useControls(
		Constants.Component.NAME,
		() => Machines.Header.defaultContext,
	);

	React.useEffect(() => {
		setLevaHeader({ active: data.header.active.value });
	}, [data.header.active.value]);
	React.useEffect(() => {
		setLevaHeader({ status: data.header.status.value });
	}, [data.header.status.value]);

	React.useEffect(() => {
		data.header.active.update(levaHeader.active);
	}, [levaHeader.active]);
	React.useEffect(() => {
		data.header.status.update(levaHeader.status);
	}, [levaHeader.status, data.header.status]);

	return <React.Fragment />;
};
View.Relay.displayName = `${View.displayName}.Relay`;

// ---[View.Container]---------------------------------------------------------

View.Container = (props): JSX.Element => {
	const { children } = props;

	const { sensors } = Observer.useContext();
	const { springs } = Animator.useContext();
	const { data } = Controller.useContext();

	const { background, y } = springs;

	return (
		<Styled.Root.Container style={{ background, y }}>
			<Styled.Root.Wrapper ref={sensors.measure.target}>
				{children}
			</Styled.Root.Wrapper>
		</Styled.Root.Container>
	);
};
View.Container.displayName = `${View.displayName}.Container`;
