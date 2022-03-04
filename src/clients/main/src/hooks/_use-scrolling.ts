import * as React from "react";

import * as Utils from "@taygo/utils";

export const useScrolling = (ref: React.RefObject<HTMLElement>): boolean => {
	const [scrolling, setScrolling] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (ref.current) {
			let scrollingTimeout: NodeJS.Timeout;

			const handleScrollEnd = () => {
				setScrolling(false);
			};

			const handleScroll = () => {
				setScrolling(true);
				clearTimeout(scrollingTimeout);
				scrollingTimeout = setTimeout(() => handleScrollEnd(), 150);
			};

			Utils.on(ref.current, "scroll", handleScroll, false);
			return () => {
				if (ref.current) {
					Utils.off(ref.current, "scroll", handleScroll, false);
				}
			};
		}
		return () => {};
	}, [ref]);

	return scrolling;
};
