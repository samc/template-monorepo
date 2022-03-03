import * as React from "react";

import * as Elements from "@eden/client.main/elements";
import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";

import * as Constants from "./default.constants";
import * as Styled from "./default.styled";

const defaultProps = Object.freeze<View.Props>({});

const defaultState = Object.freeze<View.State>({});

export class View extends React.Component<View.Props, View.State> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.NAME}.View`;
	public static readonly defaultProps: View.Props = defaultProps;
	public static readonly defaultState: View.State = defaultState;
	public readonly state: View.State = defaultState;

	// ===[Nodes]===

	public static Container: View.Container;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { children } = this.props;

		return (
			<React.Fragment>
				<View.Container>{children}</View.Container>
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
	export namespace Container {
		export interface Props {}
	}
}

// ---[View.Container]---------------------------------------------------------

View.Container = (props): JSX.Element => {
	const { children } = props;

	return <Styled.Root.Container>{children}</Styled.Root.Container>;
};

View.Container.displayName = `${View.displayName}.Container`;
