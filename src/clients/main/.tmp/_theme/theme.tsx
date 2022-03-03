import * as React from "react";

import * as Constants from "./theme.constants";

import { Controller as _Controller } from "./theme.controller";
import { View as _View } from "./theme.view";

export class Theme extends React.Component<Theme.View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: Theme.View.Props = _View.defaultProps;

	public render(): React.ReactNode {
		return (
			<_Controller>
				<_View {...this.props} />
			</_Controller>
		);
	}
}

export module Theme {
	export import Controller = _Controller;
	export import View = _View;
}
