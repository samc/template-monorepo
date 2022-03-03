import * as React from "react";

import * as Constants from "./content.constants";

import { View as _View } from "./content.view";

export class Content extends React.Component<Content.View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: Content.View.Props = _View.defaultProps;

	public render(): React.ReactNode {
		return <_View {...this.props} />;
	}
}

export namespace Content {
	export import View = _View;
}
