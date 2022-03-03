import * as Immer from "immer";
import * as React from "react";
import { shouldPolyfill } from "@formatjs/intl-getcanonicallocales/should-polyfill";

import * as Protocol from "@eden/protocol";
import * as Universal from "@eden/universal";

import * as TS from "@eden/sensors/ts";
import * as Utils from "@eden/sensors/utils";

import * as Constants from "./locale.constants";
import * as Errors from "./locale.errors";

export interface LocaleSensorProps
	extends TS.SensorConfigProps,
		Universal.UniversalRenderProps<LocaleSensorPayload> {}

export interface LocaleSensorData {
	/**
	 * The canonical locale code for the active locale.
	 */
	code: Protocol.Locale;
}

export interface LocaleSensorState extends TS.PropsWithData<LocaleSensorData> {}

export interface LocaleSensorPayload extends LocaleSensorState {}

const defaultProps = Object.freeze<LocaleSensorProps>({
	throttle: Constants.THROTTLE,
});

const defaultData = Object.freeze<LocaleSensorData>({
	code: Protocol.Locale.en_US,
});

const defaultState = Object.freeze<LocaleSensorState>({
	data: defaultData,
});

const defaultPayload = Object.freeze<LocaleSensorPayload>({
	...defaultState,
});

export class Locale extends React.Component<
	LocaleSensorProps,
	LocaleSensorState
> {
	constructor(props: LocaleSensorProps) {
		super(props);

		this.handleLanguageChange = this.handleLanguageChange.bind(this);
	}

	public static readonly displayName = Constants.COMPONENT_ID;

	public static readonly defaultProps: LocaleSensorProps = defaultProps;
	public static readonly defaultData: LocaleSensorData = defaultData;
	public static readonly defaultPayload: LocaleSensorPayload = defaultPayload;
	public static readonly defaultState: LocaleSensorState = defaultState;
	public readonly state: LocaleSensorState = defaultState;

	public static Context: React.Context<LocaleSensorPayload>;

	private unmounted = false;

	public render(): React.ReactNode {
		return (
			<Locale.Context.Provider value={this.ctx}>
				{Universal.render(this.props, this.ctx)}
			</Locale.Context.Provider>
		);
	}

	public componentDidMount(): void {
		this.handleLanguageChange();
		this.bindEvents();
	}

	public componentWillUnmount(): void {
		this.unmounted = true;
		this.unbindEvents();
	}

	// ===[Context]===

	private get ctx(): LocaleSensorPayload {
		const { state } = this;
		return { ...state };
	}

	// ===[Events]===

	private bindEvents(): void {
		Utils.on(window, "languagechange", this.handleLanguageChange);
	}

	private unbindEvents(): void {
		Utils.off(window, "languagechange", this.handleLanguageChange);
	}

	private handleLanguageChange = Utils.throttle((): void => {
		if (this.unmounted) {
			return;
		}

		this.setData({
			code: Locale.preferredLocales(),
		});
	}, this.props.throttle);

	// ===[Helpers]===

	private static preferredLocales(): Protocol.Locale {
		if (!!!Utils.isBrowser && !!!Utils.isNavigator) {
			return Protocol.Locale.en_US;
		}

		if (navigator.languages && navigator.languages.length > 0) {
			return Intl.getCanonicalLocales(navigator.languages)[0];
		}

		return Intl.getCanonicalLocales([navigator.language])[0];
	}

	// ===[Setters]===

	private setData(data: LocaleSensorData): void {
		const state = Immer.produce(this.state, (draft) => {
			draft.data = data;
		});
		this.setState(state);
	}
}

// ---[Locale.Context]---------------------------------------------------------

Locale.Context = React.createContext<LocaleSensorPayload>(defaultPayload);

export const useLocaleSensor = (): LocaleSensorPayload => {
	const context = React.useContext(Locale.Context);
	if (!!!context) {
		throw new Error(Errors.Panic.USED_OUTSIDE_OF_PROVIDER);
	}
	return context;
};

export const withLocaleSensor = Universal.enhance(Locale, "sensors", "locale");

//

async function polyfill() {
	/**
	 * This platform already supports Intl.getCanonicalLocales
	 */
	if (shouldPolyfill()) {
		await import("@formatjs/intl-getcanonicallocales/polyfill");
	}
}

polyfill();
