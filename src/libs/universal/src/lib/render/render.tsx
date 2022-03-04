import * as React from "react";

import * as TS from "@taygo/universal/ts";
import * as Utils from "@taygo/universal/utils";

import * as Errors from "./render.errors";

export function render<
	TProps extends TS.UniversalRenderProps<TData>,
	TData extends object,
>(props: TProps, data: TData): React.ReactNode {
	if (!!!Utils.isObject(props)) {
		throw new TypeError(Errors.Panic.PROPS_MUST_BE_OBJECT);
	}

	if (Utils.hasRender(props) && Utils.hasChildren(props)) {
		console.warn({
			message: Errors.Warn.CHILDREN_AND_RENDER_EXIST,
		});
		console.trace();
	}

	if (!!!Utils.isObject(data)) {
		console.warn({
			message: Errors.Warn.EXPECT_DATA_TO_BE_OBJECT,
			data,
		});
		console.trace();
	}

	const { comp, component = comp } = props;

	if (component) {
		return React.createElement(component, data);
	}

	if (Utils.hasRender(props)) {
		return props.render(data);
	}

	if (Utils.hasChildren(props)) {
		return props.children(data);
	}

	if (props.children instanceof Array) {
		if (Utils.isReact16Plus()) {
			return props.children;
		} else {
			return React.createElement("div", null, ...props.children);
		}
	}

	return props.children;
}

export type UniversalRender = ReturnType<typeof render>;
