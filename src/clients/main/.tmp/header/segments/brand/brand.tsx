import * as React from "react";

import * as Constants from "./brand.constants";

import { Controller } from "./brand.controller";
import { View } from "./brand.view";

export type BrandProps = View["Props"];
export type BrandState = View["State"];

export const Brand = React.forwardRef<HTMLElement, BrandProps>((props, ref) => {
	return (
		<Controller>
			<View {...props} innerRef={ref} />
		</Controller>
	);
});

Brand.displayName = Constants.COMPONENT_ID;
