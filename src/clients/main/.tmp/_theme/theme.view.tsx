import * as X from "@xstyled/styled-components";
import * as Leva from "leva";
import * as React from "react";

import * as Protocol from "@eden/protocol";

import * as Machines from "@eden/client.main/machines";

import * as Elements from "@eden/client.main/elements";
import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";

import * as Constants from "./theme.constants";

import { Controller } from "./theme.controller";

const defaultProps = Object.freeze<View.Props>({});

const defaultState = Object.freeze<View.State>({});

export class View extends React.PureComponent<View.Props, View.State> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.NAME}.View`;
	public static readonly defaultProps: View.Props = defaultProps;
	public static readonly defaultState: View.State = defaultState;
	public readonly state: View.State = defaultState;

	// ===[Context]===

	public static contextType = Controller.Context;
	declare context: Controller.ContextType;

	// ===[Nodes]===

	public static Relay: View.Relay;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { data } = this.context;
		return (
			<React.Fragment>
				<X.Preflight />
				<X.ThemeProvider theme={this.context.data.theme.config.value}>
					<X.ColorModeProvider>
						<Elements.Show
							active={data.global.stage.value === Protocol.Stage.DEVELOPMENT}
						>
							<View.Relay />
						</Elements.Show>
						{this.props.children}
					</X.ColorModeProvider>
				</X.ThemeProvider>
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
}

// ---[View.Relay]---------------------------------------------------------

View.Relay = (props): JSX.Element => {
	const { data } = Controller.useContext();

	const [levaTheme, setLevaTheme] = Leva.useControls(
		Constants.Component.NAME,
		() => Machines.Theme.defaultContext,
	);

	React.useEffect(() => {
		setLevaTheme({ status: data.theme.debug.value });
	}, [data.theme.debug.value]);
	React.useEffect(() => {
		setLevaTheme({ status: data.theme.status.value });
	}, [data.theme.status.value]);

	React.useEffect(() => {
		data.theme.debug.update(levaTheme.debug);
	}, [levaTheme.debug]);
	React.useEffect(() => {
		data.theme.status.update(levaTheme.status);
	}, [levaTheme.status]);

	return <React.Fragment />;
};
