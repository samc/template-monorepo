/**
 * a property P will be present if :
 * - it is present in both DecorationTargetProps and InjectedProps
 * - InjectedProps[P] can satisfy DecorationTargetProps[P]
 * ie: decorated component can accept more types than decorator is injecting
 *
 * For decoration, inject props or ownProps are all optionally
 * required by the decorated (right hand side) component.
 * But any property required by the decorated component must be satisfied by the injected property.
 */
export type Shared<InjectedProps, TTargetProps> = {
	[P in Extract<
		keyof InjectedProps,
		keyof TTargetProps
	>]?: InjectedProps[P] extends TTargetProps[P] ? TTargetProps[P] : never;
};
