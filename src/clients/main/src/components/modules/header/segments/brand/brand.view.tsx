import * as React from "react";

import * as Utils from "@taygo/utils";

import * as Constants from "./brand.constants";
import * as Nodes from "./brand.nodes";
import * as Styled from "./brand.styled";

import * as Animator from "./brand.animator";
import { Controller } from "./brand.controller";

interface ViewProps extends Utils.ComponentWithInnerRef {
	/** */
}

interface ViewState {
	/** */
}

const defaultProps = Object.freeze<ViewProps>({
	innerRef: undefined,
	/** */
});

const defaultState: ViewState = Object.freeze<ViewState>({
	/** */
});

export class View extends React.Component<ViewProps, ViewState> {
	public static readonly displayName = `${Constants.COMPONENT_ID}.View`;

	public static readonly defaultProps: ViewProps = defaultProps;
	public static readonly defaultState: ViewState = defaultState;
	public readonly state: ViewState = defaultState;

	public static contextType = Controller.Context;
	declare context: React.ContextType<typeof View.contextType>;

	public static Container: Container;
	public static Logo = Nodes.Logo;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { children } = this.props;
		const { state } = this.context;

		return (
			<View.Container>
				<View.Logo>
					<View.Logo.Image />
				</View.Logo>
			</View.Container>
		);
	}
}

export interface View {
	Props: ViewProps;
	State: ViewState;
}

// ---[View.Container]--------------------------------------------------------

interface Container extends React.FunctionComponent<ContainerProps> {
	/** */
}

interface ContainerProps {
	/** */
}

View.Container = (props): JSX.Element => {
	const { children } = props;

	return <Styled.Root.Container>{children}</Styled.Root.Container>;
};

View.Container.displayName = `${View.displayName}.Container`;
