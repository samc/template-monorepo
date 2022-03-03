export interface ComponentWithInnerRef<TComponentType = HTMLElement> {
	innerRef?: React.Ref<TComponentType>;
}
