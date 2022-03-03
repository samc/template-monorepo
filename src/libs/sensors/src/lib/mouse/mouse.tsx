import * as Immer from "immer";
import * as React from "react";

import * as Universal from "@eden/universal";

import * as TS from "@eden/sensors/ts";
import * as Utils from "@eden/sensors/utils";

import * as Constants from "./mouse.constants";
import * as Errors from "./mouse.errors";

export interface MouseSensorProps
	extends TS.SensorConfigProps,
		Universal.UniversalRenderProps<MouseSensorPayload> {}

export interface MouseSensorData {
	/**
	 * The X (horizontal) coordinate (in pixels) at which the mouse
	 * was moved, relative to the left edge of the entire document.
	 *
	 * @default 0
	 */
	docX: number;

	/**
	 * The Y (vertical) coordinate (in pixels) at which the mouse
	 * was moved, relative to the top edge of the entire document.
	 *
	 * @default 0
	 */
	docY: number;

	/**
	 * Height of the target element.
	 *
	 * @default 0
	 */
	elH: number;

	/**
	 * Width of the target element.
	 *
	 * @default 0
	 */
	elW: number;

	/**
	 * The X (horizontal) coordinate (in pixels) at which the mouse
	 * was moved, relative to the left edge of the target element.
	 *
	 * @default 0
	 */
	elX: number;

	/**
	 * The Y (vertical) coordinate (in pixels) at which the mouse
	 * was moved, relative to the left edge of the target element.
	 *
	 * @default 0
	 */
	elY: number;

	/**
	 * The X (horizontal) coordinate (in pixels) of the target element
	 * relative to the document.
	 *
	 * @default 0
	 */
	posX: number;

	/**
	 * The Y (vertical) coordinate (in pixels) of the target element
	 * relative to the document.
	 *
	 * @default 0
	 */
	posY: number;
}

export interface MouseSensorState extends TS.PropsWithData<MouseSensorData> {}

export interface MouseSensorPayload
	extends MouseSensorState,
		TS.PropsWithTarget {}

const defaultProps = Object.freeze<MouseSensorProps>({
	throttle: Constants.THROTTLE,
});

const defaultData = Object.freeze<MouseSensorData>({
	docX: 0,
	docY: 0,
	elH: 0,
	elW: 0,
	elX: 0,
	elY: 0,
	posX: 0,
	posY: 0,
});

const defaultState = Object.freeze<MouseSensorState>({
	data: defaultData,
});

const defaultPayload = Object.freeze<MouseSensorPayload>({
	...defaultState,
	target: React.createRef<HTMLElement>(),
});

export class Mouse extends React.Component<MouseSensorProps, MouseSensorState> {
	constructor(props: MouseSensorProps) {
		super(props);

		this.handleMouseMove = this.handleMouseMove.bind(this);
	}

	public static readonly displayName = Constants.COMPONENT_ID;

	public static readonly defaultProps: MouseSensorProps = defaultProps;
	public static readonly defaultState: MouseSensorState = defaultState;
	public static defaultPayload: MouseSensorPayload = defaultPayload;
	public readonly state: MouseSensorState = defaultState;

	public static Context: React.Context<MouseSensorPayload>;

	public target: React.RefObject<HTMLElement> = defaultPayload.target;
	private element!: React.RefObject<HTMLElement>["current"];

	private unmounted = false;

	// ===[Lifecycle]===

	public render(): Universal.UniversalRender {
		return (
			<Mouse.Context.Provider value={this.ctx}>
				{Universal.render(this.props, this.ctx)}
			</Mouse.Context.Provider>
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

	private get ctx(): MouseSensorPayload {
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
		Utils.on(document, "mousemove", this.handleMouseMove);
	}

	private unbindEvents(): void {
		Utils.off(document, "mousemove", this.handleMouseMove);
	}

	private handleMouseMove = Utils.throttle((event: MouseEvent): void => {
		if (this.unmounted) {
			return;
		}

		const {
			left,
			top,
			width: elW,
			height: elH,
		} = this.element!.getBoundingClientRect();
		const posX = left + window.pageXOffset;
		const posY = top + window.pageYOffset;
		const elX = event.pageX - posX;
		const elY = event.pageY - posY;

		this.setData({
			docX: event.pageX,
			docY: event.pageY,
			elX,
			elY,
			elH,
			elW,
			posX,
			posY,
		});
	}, this.props.throttle);

	// ===[Setters]===

	private setData(data: MouseSensorData): void {
		const state = Immer.produce(this.state, (draft) => {
			draft.data = data;
		});
		this.setState(state);
	}
}

// ---[Mouse.Context]----------------------------------------------------------

Mouse.Context = React.createContext<MouseSensorPayload>(defaultPayload);

/**
 */
export const useMouseSensor = (): MouseSensorPayload => {
	const context = React.useContext(Mouse.Context);
	if (!!!context) {
		throw new Error(Errors.Panic.USED_OUTSIDE_OF_PROVIDER);
	}
	return context;
};

export const withMouseSensor = Universal.enhance(Mouse, "sensors", "mouse");
