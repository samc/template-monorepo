import { css } from "@xstyled/styled-components";

/** */
export function page() {
	return css`
		width: 100vw;
		min-height: 100vh;
		/** mobile viewport bug fix*/
		min-height: -webkit-fill-available;
	`;
}
