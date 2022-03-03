import * as Spring from "@react-spring/web";
import * as React from "react";

import * as Constants from "./brand.constants";
import * as Data from "./brand.data";
import * as Errors from "./brand.errors";

interface AnimatorProps extends Data.BrandData {}

interface AnimatorSprings {}

interface AnimatorContext {
	springs: Spring.SpringValues<AnimatorSprings>;
}

const defaultProps = Object.freeze<AnimatorProps>({
	...Data.defaultData,
});

const defaultSprings = Object.freeze<AnimatorSprings>({
	/** */
});

const defaultContext = Object.freeze<AnimatorContext>({
	springs: undefined,
});

export class Animator extends React.Component<AnimatorProps> {
	public static readonly displayName = `${Constants.COMPONENT_ID}.Animator`;

	public static readonly defaultProps: AnimatorProps = defaultProps;
	public static readonly defaultSprings: AnimatorSprings = defaultSprings;

	private animator = new Spring.Controller<AnimatorSprings>(defaultSprings);
	private config: Spring.SpringConfig = Spring.config.gentle;

	public static Context: React.Context<AnimatorContext>;
	public static useAnimator: () => AnimatorContext;

	// ===[Lifecycle]===

	public render(): React.ReactNode {
		const { children } = this.props;
		return (
			<Animator.Context.Provider value={this.ctx()}>
				{children}
			</Animator.Context.Provider>
		);
	}

	private ctx(): AnimatorContext {
		const { springs } = this.animator;
		this.updates();
		return { springs };
	}

	// ===[Updaters]===

	private updates(): void {
		/** */
	}
}

export interface Animator {
	Props: AnimatorProps;
	Springs: AnimatorSprings;
	Context: AnimatorContext;
}

// ---[Animator.Context]-----------------------------------------------------

Animator.Context = React.createContext<AnimatorContext>(defaultContext);

/**
 * This hook allows any child components to easily reach
 * into the `Header` controller to call setters or access
 * state.
 */
Animator.useAnimator = (): AnimatorContext => {
	const context = React.useContext(Animator.Context);
	if (!!!context) {
		throw new Error(Errors.Panic.USED_OUTSIDE_OF_PROVIDER);
	}
	return context;
};
