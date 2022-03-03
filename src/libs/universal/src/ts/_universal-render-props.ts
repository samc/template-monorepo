/**
 * Render properties for components rendered via `Universal.render`
 */
export interface UniversalRenderProps<TData extends object = {}> {
	children?: ((data: TData) => React.ReactNode) | React.ReactNode;
	render?: (data: TData) => React.ReactNode;
	comp?: React.ComponentType<TData>;
	component?: React.ComponentType<TData>;
}
