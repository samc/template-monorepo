import { css } from "@xstyled/styled-components";

/**
 * Non-intrusive, bold border used to debug bounding boxes for elements. We also check
 * that the current `process.env.NODE_ENV` is equal to `development` so this never
 * never hits a staging / production build.
 */
// export function debug() {
// 	return function (args: SC.ThemedStyledProps<unknown>) {
// 		const { debug } = args.theme.controls;

// 		return debug && Utils.isNodeEnv(Constants.Stage.DEVELOPMENT)
// 			? SC.css`
// 					border: 1px solid rgba(235, 235, 52, 0.5);
// 					background: rgba(235, 235, 52, 0.1);
// 			  `
// 			: css``;
// 	};
// }

export function debug() {
	return css`
		border: 1px solid rgba(235, 235, 52, 0.5);
		background: rgba(235, 235, 52, 0.1);
	`;
}
