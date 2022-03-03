export enum Panic {
	PROPS_MUST_BE_OBJECT = "render(props, data) first argument must be a props object.",
}

export enum Warn {
	CHILDREN_AND_RENDER_EXIST = "Both `render` and `children` are specified for in a universal interface component, `render` will be used.",
	EXPECT_DATA_TO_BE_OBJECT = "Universal component interface normally expects data to be an object",
}
