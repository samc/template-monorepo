import * as React from "react";

import * as Constants from "./home.constants";

import { Animator as _Animator } from "./home.animator";
import { Controller as _Controller } from "./home.controller";
import { Observer as _Observer } from "./home.observer";
import { View as _View } from "./home.view";

export class Home extends React.Component<Home.View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: Home.View.Props = _View.defaultProps;

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

export namespace Home {
	export import Animator = _Animator;
	export import Controller = _Controller;
	export import Observer = _Observer;
	export import View = _View;
}
