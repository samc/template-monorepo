/**
 * Reference: https://github.com/streamich/react-use/blob/master/src/useEffectOnce.ts
 */
import * as React from "react";

export const useEffectOnce = (effect: React.EffectCallback) => {
	React.useEffect(effect, []);
};
