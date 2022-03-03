import * as SC from "@xstyled/styled-components";
import { css } from "@xstyled/styled-components";

/**
 * Parses an object and returns a new object with only
 * valid JSS key:value pairs.
 */
export function apply(obj: SC.CSSObject) {
	return css`
		${obj}
	`;
}
