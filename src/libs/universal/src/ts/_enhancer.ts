import { EnhancedComponent, RC } from ".";

/**
 * Signature for an enhancer created via `Universal.enhance`.
 */
export type Enhancer<
	TUniversalComponentInjectedProps,
	TUniversalComponentProps extends object = {},
> = <
	TWrappedComponent extends RC<
		Omit<
			React.ComponentProps<TWrappedComponent>,
			keyof TUniversalComponentInjectedProps
		> &
			TUniversalComponentInjectedProps
	>,
>(
	WrappedComponent: TWrappedComponent,
	universalProps?: TUniversalComponentProps | undefined,
) => EnhancedComponent<TWrappedComponent>;
