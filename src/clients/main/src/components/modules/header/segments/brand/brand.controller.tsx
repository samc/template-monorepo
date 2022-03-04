import * as Leva from "leva";
import * as React from "react";

import * as Sensors from "@taygo/sensors";
import * as Utils from "@taygo/utils";

import * as Constants from "./brand.constants";
import * as Data from "./brand.data";
import * as Errors from "./brand.errors";

import * as Animator from "./brand.animator";

interface ControllerProps {
	/** */
}

interface ControllerSensors {
	/** */
}

interface ControllerData extends Data.BrandData {
	/** */
}

interface ControllerState {
	data: ControllerData;
	sensors: ControllerSensors;
}

interface ControllerSetters {
	/** */
}

interface ControllerContext {
	setters: ControllerSetters;
	state: ControllerState;
}

const defaultProps = Object.freeze<ControllerProps>({});

const defaultSensors = Object.freeze<ControllerSensors>({
	/** */
});

export const defaultData = Object.freeze<ControllerData>({
	...Data.defaultData,
});

const defaultState = Object.freeze<ControllerState>({
	data: defaultData,
	sensors: defaultSensors,
});

const defaultSetters = Object.freeze<ControllerSetters>({
	/** */
});

const defaultContext = Object.freeze<ControllerContext>({
	setters: defaultSetters,
	state: defaultState,
});

export class Controller extends React.Component<
	ControllerProps,
	ControllerState
> {
	constructor(props: ControllerProps) {
		super(props);

		this.setSensors = this.setSensors.bind(this);
		this.setData = this.setData.bind(this);

		this.observers = this.observers.bind(this);

		this.setters = {
			setSensors: this.setSensors,
			/** */
		};
	}

	public static readonly displayName = `${Constants.COMPONENT_ID}.Controller`;

	public static readonly defaultProps: ControllerProps = defaultProps;
	public static readonly defaultSensors: ControllerSensors = defaultSensors;
	public static readonly defaultData: ControllerData = defaultData;
	public static readonly defaultState: ControllerState = defaultState;
	public static readonly defaultContext: ControllerContext = defaultContext;
	public readonly state: ControllerState = defaultState;

	public readonly setters: ControllerSetters;

	public static Context: React.Context<ControllerContext>;
	public static useController: () => ControllerContext;

	public static Animator: Animator;
	public static Sensors: Sensors;
	public static Relay: Relay;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { children } = this.props;

		return (
			<Controller.Context.Provider value={this.ctx()}>
				<Controller.Animator>
					<Controller.Sensors>
						<Controller.Relay>{children}</Controller.Relay>
					</Controller.Sensors>
				</Controller.Animator>
			</Controller.Context.Provider>
		);
	}

	public componentDidUpdate(
		prevProps: Readonly<ControllerProps>,
		prevState: Readonly<ControllerState>,
	): void {
		this.observers(prevState);
	}

	private ctx(): ControllerContext {
		const { setters, state } = this;

		return {
			setters,
			state,
		};
	}

	// ===[Observers]===

	private observers(prevState: Readonly<ControllerState>): void {
		/** */
	}

	// ===[Setters]===

	@Utils.debug()
	private setSensors(sensors: Partial<ControllerSensors>): void {
		this.setState((state) => ({
			sensors: { ...state.sensors, ...sensors },
		}));
	}

	@Utils.debug()
	private setData(data: Partial<ControllerData>): void {
		this.setState((state) => ({
			data: { ...state.data, ...data },
		}));
	}
}

export interface Controller {
	Props: ControllerProps;
	Sensors: ControllerSensors;
	Data: ControllerData;
	State: ControllerState;
	Setters: ControllerSetters;
	Context: ControllerContext;
}

// ---[Controller.Animator]----------------------------------------------------

interface Animator extends React.FunctionComponent<AnimatorProps> {}

interface AnimatorProps {}

Controller.Animator = (props): JSX.Element => {
	const { children } = props;
	const { state } = Controller.useController();
	return <Animator.Animator {...state.data}>{children}</Animator.Animator>;
};

Controller.Animator.displayName = `${Controller.displayName}.Animator`;

// ---[Controller.Sensors]-----------------------------------------------------

interface Sensors extends React.FunctionComponent<SensorsProps> {}

interface SensorsProps {}

Controller.Sensors = (props): JSX.Element => {
	const { children } = props;

	return <React.Fragment>{children}</React.Fragment>;
};

Controller.Sensors.displayName = `${Controller.displayName}.Sensors`;

// ---[Controller.Relay]-------------------------------------------------------

interface Relay extends React.FunctionComponent<RelayProps> {}

interface RelayProps {}

Controller.Relay = (props): JSX.Element => {
	const { children } = props;

	const { setters, state } = Controller.useController();
	const [leva, setLeva] = Leva.useControls(
		Constants.COMPONENT_ID,
		() => Data.defaultData,
	);

	/** */

	return <React.Fragment>{children}</React.Fragment>;
};

Controller.Relay.displayName = `${Controller.displayName}.Relay`;

// ---[Controller.Context]-----------------------------------------------------

Controller.Context = React.createContext<ControllerContext>(defaultContext);

/**
 * This hook allows any child components to easily reach
 * into the `Header` controller to call setters or access
 * state.
 */
Controller.useController = (): ControllerContext => {
	const context = React.useContext(Controller.Context);
	if (!!!context) {
		throw new Error(Errors.Panic.USED_OUTSIDE_OF_PROVIDER);
	}
	return context;
};
