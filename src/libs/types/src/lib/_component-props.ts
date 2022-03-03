/**
 * Infers prop type from component C
 */
export type ComponentProps<C> = C extends React.ComponentType<infer P>
	? C extends React.ComponentClass<P>
		? React.ClassAttributes<InstanceType<C>> & P
		: P
	: never;
