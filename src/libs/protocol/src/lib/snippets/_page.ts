import { css } from "@xstyled/styled-components";

/** */
export function page() {
	return css`
		width: 100vw;
		/** mobile viewport bug fix*/
		min-height: -webkit-fill-available;
		min-height: 100vh;
	`;
}
