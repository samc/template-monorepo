import * as RX from "redux";

import * as TS from "@eden/universal/ts";

/**
 * Composes higher-order enhancer components, resulting in a composite HOC,
 * maintaining type assurance for `n` number of enhancers.
 */
export interface Compose {
	<TInjectedProps>(
		enhancer: TS.Enhancer<TInjectedProps>,
	): TS.Enhancer<TInjectedProps>;

	<TInjectedProps1, TInjectedProps2>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
	): TS.Enhancer<TInjectedProps1 & TInjectedProps2>;

	<TInjectedProps1, TInjectedProps2, TInjectedProps3>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
	): TS.Enhancer<TInjectedProps1 & TInjectedProps2 & TInjectedProps3>;

	<TInjectedProps1, TInjectedProps2, TInjectedProps3, TInjectedProps4>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
		enhancer4: TS.Enhancer<TInjectedProps4>,
	): TS.Enhancer<
		TInjectedProps1 & TInjectedProps2 & TInjectedProps3 & TInjectedProps4
	>;

	<TInjectedProps1, TInjectedProps2, TInjectedProps3, TInjectedProps4>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
		enhancer4: TS.Enhancer<TInjectedProps4>,
	): TS.Enhancer<
		TInjectedProps1 & TInjectedProps2 & TInjectedProps3 & TInjectedProps4
	>;

	<
		TInjectedProps1,
		TInjectedProps2,
		TInjectedProps3,
		TInjectedProps4,
		TInjectedProps5,
	>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
		enhancer4: TS.Enhancer<TInjectedProps4>,
		enhancer5: TS.Enhancer<TInjectedProps5>,
	): TS.Enhancer<
		TInjectedProps1 &
			TInjectedProps2 &
			TInjectedProps3 &
			TInjectedProps4 &
			TInjectedProps5
	>;

	<
		TInjectedProps1,
		TInjectedProps2,
		TInjectedProps3,
		TInjectedProps4,
		TInjectedProps5,
		TInjectedProps6,
	>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
		enhancer4: TS.Enhancer<TInjectedProps4>,
		enhancer5: TS.Enhancer<TInjectedProps5>,
		enhancer6: TS.Enhancer<TInjectedProps6>,
	): TS.Enhancer<
		TInjectedProps1 &
			TInjectedProps2 &
			TInjectedProps3 &
			TInjectedProps4 &
			TInjectedProps5 &
			TInjectedProps6
	>;

	<
		TInjectedProps1,
		TInjectedProps2,
		TInjectedProps3,
		TInjectedProps4,
		TInjectedProps5,
		TInjectedProps6,
		TInjectedProps7,
	>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
		enhancer4: TS.Enhancer<TInjectedProps4>,
		enhancer5: TS.Enhancer<TInjectedProps5>,
		enhancer6: TS.Enhancer<TInjectedProps6>,
		enhancer7: TS.Enhancer<TInjectedProps7>,
	): TS.Enhancer<
		TInjectedProps1 &
			TInjectedProps2 &
			TInjectedProps3 &
			TInjectedProps4 &
			TInjectedProps5 &
			TInjectedProps6 &
			TInjectedProps7
	>;

	<
		TInjectedProps1,
		TInjectedProps2,
		TInjectedProps3,
		TInjectedProps4,
		TInjectedProps5,
		TInjectedProps6,
		TInjectedProps7,
		TInjectedProps8,
	>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
		enhancer4: TS.Enhancer<TInjectedProps4>,
		enhancer5: TS.Enhancer<TInjectedProps5>,
		enhancer6: TS.Enhancer<TInjectedProps6>,
		enhancer7: TS.Enhancer<TInjectedProps7>,
		enhancer8: TS.Enhancer<TInjectedProps8>,
	): TS.Enhancer<
		TInjectedProps1 &
			TInjectedProps2 &
			TInjectedProps3 &
			TInjectedProps4 &
			TInjectedProps5 &
			TInjectedProps6 &
			TInjectedProps7 &
			TInjectedProps8
	>;

	<
		TInjectedProps1,
		TInjectedProps2,
		TInjectedProps3,
		TInjectedProps4,
		TInjectedProps5,
		TInjectedProps6,
		TInjectedProps7,
		TInjectedProps8,
		TInjectedProps9,
	>(
		enhancer1: TS.Enhancer<TInjectedProps1>,
		enhancer2: TS.Enhancer<TInjectedProps2>,
		enhancer3: TS.Enhancer<TInjectedProps3>,
		enhancer4: TS.Enhancer<TInjectedProps4>,
		enhancer5: TS.Enhancer<TInjectedProps5>,
		enhancer6: TS.Enhancer<TInjectedProps6>,
		enhancer7: TS.Enhancer<TInjectedProps7>,
		enhancer8: TS.Enhancer<TInjectedProps8>,
		enhancer9: TS.Enhancer<TInjectedProps9>,
	): TS.Enhancer<
		TInjectedProps1 &
			TInjectedProps2 &
			TInjectedProps3 &
			TInjectedProps4 &
			TInjectedProps5 &
			TInjectedProps6 &
			TInjectedProps7 &
			TInjectedProps8 &
			TInjectedProps9
	>;

	(...args: TS.Enhancer<any>[]): TS.Enhancer<any>;
}

/**
 * Composes higher-order  components, resulting in a composite HOC,
 * maintaining type assurance for `n` number of enhancers.
 *
 * @param hocs - an array of higher-order components.
 */
export const compose: Compose = RX.compose;
