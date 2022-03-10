import * as React from "react";

import * as Constants from "./default.constants";

import { View as _View } from "./default.view";

export class Default extends React.Component<Default.View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: Default.View.Props = _View.defaultProps;

	public render(): React.ReactNode {
		return <_View {...this.props} />;
	}
}

export namespace Default {
	export import View = _View;
}
