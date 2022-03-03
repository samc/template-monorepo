import * as React from "react";

import * as Constants from "./header.constants";

import { Animator as _Animator } from "./header.animator";
import { Controller as _Controller } from "./header.controller";
import { Observer as _Observer } from "./header.observer";
import { View as _View } from "./header.view";

export class Header extends React.Component<Header.View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: Header.View.Props = _View.defaultProps;

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

export module Header {
	export import Animator = _Animator;
	export import Controller = _Controller;
	export import Observer = _Observer;
	export import View = _View;
}
