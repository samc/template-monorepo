import * as Material from "@mui/material";
import * as Leva from "leva";
import * as React from "react";

import * as Elements from "@taygo/client.contact/elements";
import * as TS from "@taygo/client.contact/ts";
import * as Utils from "@taygo/client.contact/utils";

import * as Constants from "./contact.constants";
import * as Machine from "./contact.machine";
import * as Styled from "./contact.styled";

import { Animator } from "./contact.animator";
import { Controller } from "./contact.controller";
import { Observer } from "./contact.observer";

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
	public static Email: View.Email;
	public static Name: View.Name;
	public static Message: View.Message;
	public static Submit: View.Submit;

	public static Relay: View.Relay;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { data } = this.context;

		return (
			<React.Fragment>
				<Elements.Show active={data.contact.debug.value}>
					<View.Relay />
				</Elements.Show>
				<View.Container>
					<View.Email />
					<View.Name />
					<View.Message />
					<View.Submit />
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

	export interface Email extends React.FunctionComponent<Email.Props> {}
	export namespace Email {
		export interface Props {}
	}

	export interface Name extends React.FunctionComponent<Name.Props> {}
	export namespace Name {
		export interface Props {}
	}

	export interface Message extends React.FunctionComponent<Message.Props> {}
	export namespace Message {
		export interface Props {}
	}

	export interface Submit extends React.FunctionComponent<Submit.Props> {}
	export namespace Submit {
		export interface Props {}
	}
}

// ---[View.Relay]---------------------------------------------------------

View.Relay = (props): JSX.Element => {
	const { data } = Controller.useContext();

	const [leva, setLeva] = Leva.useControls(
		Constants.Component.NAME,
		() => Machine.Contact.defaultContext,
	);

	// ===[contact.status]===
	React.useEffect(() => {
		setLeva({ status: data.contact.status.value });
	}, [data.contact.status.value, setLeva]);
	React.useEffect(() => {
		data.contact.status.update(leva.status);
	}, [leva.status]);

	// ===[contact.debug]===
	React.useEffect(() => {
		setLeva({ debug: data.contact.debug.value });
	}, [data.contact.debug.value, setLeva]);
	React.useEffect(() => {
		data.contact.debug.update(leva.debug);
	}, [leva.debug]);

	// ===[contact.email]===
	React.useEffect(() => {
		setLeva({ email: data.contact.email.value });
	}, [data.contact.email.value, setLeva]);
	React.useEffect(() => {
		data.contact.email.update(leva.email);
	}, [leva.email]);

	// ===[contact.name]===
	React.useEffect(() => {
		setLeva({ name: data.contact.name.value });
	}, [data.contact.name.value, setLeva]);
	React.useEffect(() => {
		data.contact.name.update(leva.name);
	}, [leva.name]);

	// ===[contact.message]===
	React.useEffect(() => {
		setLeva({ message: data.contact.message.value });
	}, [data.contact.message.value, setLeva]);
	React.useEffect(() => {
		data.contact.message.update(leva.message);
	}, [leva.message]);

	return <React.Fragment />;
};

View.Relay.displayName = `${View.displayName}.Relay`;

// ---[View.Container]---------------------------------------------------------

View.Container = (props): JSX.Element => {
	const { children } = props;

	const { springs } = Animator.useContext();
	const { dispatch } = Controller.useContext();
	const { sensors } = Observer.useContext();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();
		dispatch.contact("SUBMIT");
	}

	return (
		<Styled.Root.Container onSubmit={handleSubmit}>
			{children}
		</Styled.Root.Container>
	);
};

View.Container.displayName = `${View.displayName}.Container`;

// ---[View.Email]---------------------------------------------------------

View.Email = (props): JSX.Element => {
	const { children } = props;

	const { springs } = Animator.useContext();
	const { data } = Controller.useContext();
	const { sensors } = Observer.useContext();

	return (
		<React.Fragment>
			<Material.TextField
				label="Email"
				placeholder="john@gmail.com"
				onChange={(event) => data.contact.email.update(event.target.value)}
			/>
		</React.Fragment>
	);
};

View.Email.displayName = `${View.displayName}.Email`;

// ---[View.Name]---------------------------------------------------------

View.Name = (props): JSX.Element => {
	const { children } = props;

	const { springs } = Animator.useContext();
	const { data } = Controller.useContext();
	const { sensors } = Observer.useContext();

	return (
		<React.Fragment>
			<Material.TextField
				label="Name"
				placeholder="John Doe"
				onChange={(event) => data.contact.name.update(event.target.value)}
			/>
		</React.Fragment>
	);
};

View.Name.displayName = `${View.displayName}.Name`;

// ---[View.Message]---------------------------------------------------------

View.Message = (props): JSX.Element => {
	const { children } = props;

	const { springs } = Animator.useContext();
	const { data } = Controller.useContext();
	const { sensors } = Observer.useContext();

	return (
		<React.Fragment>
			<Material.TextField
				label="Message"
				placeholder="John Doe"
				onChange={(event) => data.contact.message.update(event.target.value)}
				multiline
			/>
		</React.Fragment>
	);
};

View.Message.displayName = `${View.displayName}.Message`;

// ---[View.Submit]---------------------------------------------------------

View.Submit = (props): JSX.Element => {
	const { children } = props;

	const { springs } = Animator.useContext();
	const { data } = Controller.useContext();
	const { sensors } = Observer.useContext();

	return (
		<React.Fragment>
			<Material.Button type="submit">Sumbit</Material.Button>
		</React.Fragment>
	);
};

View.Submit.displayName = `${View.displayName}.Submit`;
