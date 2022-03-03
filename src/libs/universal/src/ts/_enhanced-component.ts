import * as Hoist from "hoist-non-react-statics";

import { RC } from ".";

/**2
 * Signature for an enhanced component.
 */
export type EnhancedComponent<TWrappedComponent extends RC<any>> =
	TWrappedComponent & Hoist.NonReactStatics<TWrappedComponent, {}>;
