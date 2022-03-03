/**
 * Reference: https://github.com/streamich/react-use/blob/master/src/useRafState.ts
 */
import * as React from "react";

import { useUnmount } from "./_use-unmount";

export const useRafState = <S>(
	initialState: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] => {
	const frame = React.useRef(0);
	const [state, setState] = React.useState(initialState);

	const setRafState = React.useCallback((value: S | ((prevState: S) => S)) => {
		cancelAnimationFrame(frame.current);

		frame.current = requestAnimationFrame(() => {
			setState(value);
		});
	}, []);

	useUnmount(() => {
		cancelAnimationFrame(frame.current);
	});

	return [state, setRafState];
};
