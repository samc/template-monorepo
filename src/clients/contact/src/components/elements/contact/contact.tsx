import * as React from "react";

import * as Constants from "./contact.constants";

import { Animator as _Animator } from "./contact.animator";
import { Controller as _Controller } from "./contact.controller";
import { Observer as _Observer } from "./contact.observer";
import { View as _View } from "./contact.view";

export class Contact extends React.Component<Contact.View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: Contact.View.Props = _View.defaultProps;

	public render(): React.ReactNode {
		return (
			<_Controller>
				<_Observer>
					<_Animator>
						<_View {...this.props} />
					</_Animator>
				</_Observer>
			</_Controller>
		);
	}
}

export namespace Contact {
	export import Animator = _Animator;
	export import Controller = _Controller;
	export import Observer = _Observer;
	export import View = _View;
}
