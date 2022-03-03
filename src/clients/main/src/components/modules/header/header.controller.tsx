import * as React from "react";

import * as Abstract from "@eden/abstract";

import * as Machines from "@eden/client.main/machines";

import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";

import * as Constants from "./header.constants";
import * as Machine from "./header.machine";

enum ControllerMachineType {
	HEADER = "header",
	GLOBAL = "global",
}

const defaultProps = Object.freeze<Controller.Props>({
	machines: {
		[ControllerMachineType.HEADER]: new Machine.Header(),
		[ControllerMachineType.GLOBAL]: new Machines.Global(),
	},
});

export class Controller extends Abstract.Controller<
	Controller.Props,
	Controller.State,
	Controller.Machines
> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.ID}.Controller`;
	public static readonly defaultProps: Controller.Props = defaultProps;

	public static MachineType = ControllerMachineType;

	// ===[Context]===

	public static Context: Abstract.ContextType<typeof Controller>;
	public static useContext: Abstract.ContextHookType<typeof Controller.Context>;

	render(): React.ReactNode {
		this.props;
	}
}

export namespace Controller {
	export interface Machines {
		[Controller.MachineType.HEADER]: Machine.Header;
		[Controller.MachineType.GLOBAL]: Machines.Global;
	}

	export interface Props
		extends Abstract.Controller.Props<Controller.Machines> {}
	export interface State
		extends Abstract.Controller.State<Controller.Machines> {}
	export interface Context
		extends Abstract.Controller.Context<Controller.Machines> {}

	export type ContextType = React.ContextType<typeof Controller.Context>;
}
