/**
 * Reference: https://github.com/streamich/react-use/blob/master/src/useScroll.ts
 */
import * as React from "react";

import * as Utils from "@taygo/utils";

import { useRafState } from "./_use-raf-state";

export interface UseScrollState {
	x: number;
	y: number;
}

export const useScroll = (
	ref: React.RefObject<HTMLElement>,
): UseScrollState => {
	if (process.env.NODE_ENV === "development") {
		if (typeof ref !== "object" || typeof ref.current === "undefined") {
			console.error("`useScroll` expects a single ref argument.");
		}
	}

	const [state, setState] = useRafState<UseScrollState>({
		x: 0,
		y: 0,
	});

	React.useEffect(() => {
		const handler = () => {
			if (ref.current) {
				console.info({
					x: ref.current.scrollLeft,
					y: ref.current.scrollTop,
				});
				setState({
					x: ref.current.scrollLeft,
					y: ref.current.scrollTop,
				});
			}
		};

		if (ref.current) {
			Utils.on(ref.current, "scroll", handler, {
				capture: false,
				passive: true,
			});
		}

		return () => {
			if (ref.current) {
				Utils.off(ref.current, "scroll", handler);
			}
		};
	}, [ref]);

	return state;
};
