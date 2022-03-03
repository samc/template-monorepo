/**
 * The signature for injected universal data via an `enhance` HOC.
 *
 * - A `domain` name must be provided, this will act as the key / value pair to which
 * the data will be passed when your HOC consumes a React component.
 *
 * @example
 *
 * {
 *   foo: {
 *     ..data
 *   }
 * }
 *
 * - If a `type` is provided, the data will be nested under the parent `domain`.
 *
 * @example
 *
 * {
 *   foo: {
 *     bar: {
 *       ...data
 *     }
 *   }
 * }
 */
export type InjectedUniversalData<
	TData extends unknown,
	TDomain extends string,
	TType extends unknown,
> = Record<TDomain, TType extends string ? Record<TType, TData> : TData>;
