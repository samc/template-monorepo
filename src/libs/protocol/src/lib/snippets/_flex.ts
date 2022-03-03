import * as CSS from "csstype";
import { css } from "@xstyled/styled-components";

/** */
export function flex(
	flexDirection: CSS.Property.FlexDirection = "row",
	justifyContent: CSS.Property.JustifyContent = "center",
	alignItems: CSS.Property.AlignItems = "center",
) {
	return css`
		display: flex;
		flex-direction: ${flexDirection};
		justify-content: ${justifyContent};
		align-items: ${alignItems};
	`;
}
