import * as React from "react";
import { inspect } from "@xstate/inspect";
import { setAutoFreeze } from "immer";

import * as Constants from "./app.constants";

import { Controller } from "./app.controller";
import { View } from "./app.view";

export class App extends React.Component<View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: View.Props = View.defaultProps;

	public render(): React.ReactNode {
		return (
			<Controller>
				<View {...this.props} />
			</Controller>
		);
	}
}

setAutoFreeze(false);
inspect({ iframe: false });
