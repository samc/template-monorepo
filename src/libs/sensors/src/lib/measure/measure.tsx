import * as Immer from "immer";
import * as React from "react";

import * as Universal from "@taygo/universal";

import * as TS from "@taygo/sensors/ts";
import * as Utils from "@taygo/sensors/utils";

import * as Constants from "./measure.constants";
import * as Errors from "./measure.errors";

export interface MeasureSensorProps
	extends TS.SensorConfigProps,
		Universal.UniversalRenderProps<MeasureSensorPayload> {}

export interface MeasureSensorData extends Omit<DOMRectReadOnly, "toJSON"> {}

export interface MeasureSensorState
	extends TS.PropsWithData<MeasureSensorData> {}

export interface MeasureSensorPayload
	extends MeasureSensorState,
		TS.PropsWithTarget {}

const defaultProps = Object.freeze<MeasureSensorProps>({
	throttle: Constants.THROTTLE,
});

const defaultData = Object.freeze<MeasureSensorData>({
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0,
});

const defaultState = Object.freeze<MeasureSensorState>({
	data: defaultData,
});

const defaultPayload: MeasureSensorPayload = {
	...defaultState,
	target: React.createRef<HTMLElement>(),
};

export class Measure extends React.Component<
	MeasureSensorProps,
	MeasureSensorState
> {
	constructor(props: MeasureSensorProps) {
		super(props);

		this.handleMeasure = this.handleMeasure.bind(this);
	}

	public static readonly displayName = Constants.COMPONENT_ID;

	public static readonly defaultProps: MeasureSensorProps = defaultProps;
	public static readonly defaultState: MeasureSensorState = defaultState;
	public static defaultPayload: MeasureSensorPayload = defaultPayload;
	public readonly state: MeasureSensorState = defaultState;

	public static Context: React.Context<MeasureSensorPayload>;

	public target: React.RefObject<HTMLElement> = defaultPayload.target;
	private element!: React.RefObject<HTMLElement>["current"];

	private unmounted = false;
	private observer!: ResizeObserver;

	// ===[Lifecycle]===

	public render(): React.ReactNode {
		return (
			<Measure.Context.Provider value={this.ctx}>
				{Universal.render(this.props, this.ctx)}
			</Measure.Context.Provider>
		);
	}

	public componentDidMount(): void {
		this.bindElement();
		this.bindEvents();
	}

	public componentWillUnmount(): void {
		this.unmounted = true;
		this.unbindEvents();
	}

	// ===[Context]===

	private get ctx(): MeasureSensorPayload {
		const { state } = this;
		return { ...state, target: this.target };
	}

	// ===[Events]===

	private bindElement(): void {
		if (!!!this.target.current) {
			throw new Error(Errors.Panic.TARGET_ELEMENT_NOT_FOUND);
		}
		this.element = this.target.current;
	}

	private bindEvents(): void {
		this.observer = new ResizeObserver(this.handleMeasure);
		this.observer.observe(this.element!);
	}

	private unbindEvents(): void {
		this.observer?.disconnect();
	}

	private handleMeasure = Utils.throttle(
		(entries: ResizeObserverEntry[]): void => {
			if (this.unmounted || !!!entries.length) {
				return;
			}

			const rect = entries[0].contentRect;

			this.setData(rect);
		},
		this.props.throttle,
	);

	// ===[Setters]===

	private setData(data: MeasureSensorData): void {
		const state = Immer.produce(this.state, (draft) => {
			draft.data = data;
		});
		this.setState(state);
	}
}

// ---[Measure.Context]--------------------------------------------------------

Measure.Context = React.createContext<MeasureSensorPayload>(defaultPayload);

export const useMeasureSensor = (): MeasureSensorPayload => {
	const context = React.useContext(Measure.Context);
	if (!!!context) {
		throw new Error(Errors.Panic.USED_OUTSIDE_OF_PROVIDER);
	}
	return context;
};

export const withMeasureSensor = Universal.enhance(
	Measure,
	"sensors",
	"measure",
);
