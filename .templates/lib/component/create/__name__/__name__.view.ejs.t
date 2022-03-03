---
to: "<%= `${target}/${fileName}/${fileName}.view.tsx` %>"
---
<% if (options.controller) { -%>
import * as Leva from "leva";
<% } -%>
import * as React from "react";

import * as Elements from "@eden/client.<%= project.name %>/elements";
<% if (options.controller) { -%>
import * as Machines from "@eden/client.<%= project.name %>/machines";
<% } -%>
import * as TS from "@eden/client.<%= project.name %>/ts";
import * as Utils from "@eden/client.<%= project.name %>/utils";

import * as Constants from "./<%= fileName %>.constants";
<% if (options.segments) { -%>
import * as Segments from "./<%= fileName %>.segments";
<% } -%>
import * as Styled from "./<%= fileName %>.styled";

<% if (options.animator) { -%>
import { Animator } from "./<%= fileName %>.animator";
<% } -%>
<% if (options.controller) { -%>
import { Controller } from "./<%= fileName %>.controller";
<% } -%>
<% if (options.observer) { -%>
import { Observer } from "./<%= fileName %>.observer";
<% } -%>

const defaultProps = Object.freeze<View.Props>({});

const defaultState = Object.freeze<View.State>({});

export class View extends React.Component<View.Props, View.State> {
	public readonly id = Constants.Component.ID
	public static readonly displayName = `${Constants.Component.NAME}.View`;
	public static readonly defaultProps: View.Props = defaultProps;
	public static readonly defaultState: View.State = defaultState;
	public readonly state: View.State = defaultState;

	<% if (options.controller) { -%>
	// ===[Context]===

	public static contextType = Controller.Context;
	declare context: Controller.ContextType;
	<% } -%>

	// ===[Nodes]===

	public static Container: View.Container;
	<% if (options.controller) { -%>
	public static Relay: View.Relay;
	<% } -%>

	<% if (options.segments) { -%>
	// ===[Segments]===
	// ...
	<% } -%>

	// ===[Lifecycle]===

	render(): React.ReactNode {
<% if (options.controller) { -%>
		const { data } = this.context;
<% } -%>
<% if (variant.name === "layout") { -%>
		const { children } = this.props;
<% } -%>

		return (
			<React.Fragment>
<% if (options.controller) { -%>
				<Elements.Show active={data.<%= propertyName %>.debug.value}>
					<View.Relay />
				</Elements.Show>
<% } -%>
				<View.Container>
<% if (variant.name === "layout") { -%>
					{children}
<% } else { -%>				
					{/* ... */}
<% } -%>				
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
	export namespace Container {
		export interface Props {}
	}
}

<% if (options.controller) { -%>
// ---[View.Relay]---------------------------------------------------------

View.Relay = (props): JSX.Element => {
	const { data } = Controller.useContext();

	const [leva<%= className %>, setLeva<%= className %>] = Leva.useControls(
		Constants.Component.NAME,
		() => Machines.<%= className %>.defaultContext,
	);

	React.useEffect(() => {
		setLeva<%= className %>({ status: data.<%= name %>.status.value });
	}, [data.<%= name %>.debug.value]);
	React.useEffect(() => {
		setLeva<%= className %>({ status: data.<%= name %>.status.value });
	}, [data.<%= name %>.status.value]);

	React.useEffect(() => {
		data.<%= name %>.debug.update(leva<%= className %>.debug);
	}, [leva<%= className %>.debug]);
	React.useEffect(() => {
		data.<%= name %>.status.update(leva<%= className %>.status);
	}, [leva<%= className %>.status]);

	return <React.Fragment />;
};

View.Relay.displayName = `${View.displayName}.Relay`;
<% } -%>

// ---[View.Container]---------------------------------------------------------

View.Container = (props): JSX.Element => {
	const { children } = props;

<% if (options.animator) { -%>
	const { springs } = Animator.useContext();
<% } -%>
<% if (options.controller) { -%>
	const { data } = Controller.useContext();
<% } -%>
<% if (options.observer) { -%>
	const { sensors } = Observer.useContext();
<% } -%>

	return (
<% if (options.animator) { -%>
		<Styled.Root.Container style={springs}>
<% } else { -%>
		<Styled.Root.Container>
<% } -%>
			{children}
		</Styled.Root.Container>
	);
};

View.Container.displayName = `${View.displayName}.Container`;
