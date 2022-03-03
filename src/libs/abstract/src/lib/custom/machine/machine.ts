import * as Immer from "@xstate/immer";
import * as XS from "xstate";

import * as TS from "@eden/abstract/ts";
import * as Utils from "@eden/abstract/utils";

export abstract class Machine<
	TContext extends Machine.Context,
	TStates extends Machine.States<TContext>,
	TEvents extends Machine.Events,
	TServices extends Machine.Services,
	TTypesMeta extends Machine.TypesMeta,
> implements
		Machine.StateMachine<TContext, TStates, TEvents, TServices, TTypesMeta>
{
	constructor() {
		Object.assign(this, this.init());
	}

	protected abstract init(): Machine.StateMachine<
		TContext,
		TStates,
		TEvents,
		TServices,
		TTypesMeta
	>;

	public abstract get update(): Machine.Update<TContext>;

	protected get updaters() {
		const { update } = this;
		return Object.entries(update).reduce((acc, entry) => {
			const [key, { action, type }] = entry;
			acc = {
				...acc,
				[type]: {
					actions: action,
				},
			};
			return acc;
		}, {} as Machine.Updaters<TContext>);
	}
}

export interface Machine<
	TContext extends Machine.Context = any,
	TStates extends Machine.States<TContext> = any,
	TEvents extends Machine.Events = any,
	TServices extends Machine.Services = any,
	TTypesMeta extends Machine.TypesMeta = any,
> extends Machine.StateMachine<
		TContext,
		TStates,
		TEvents,
		TServices,
		TTypesMeta
	> {}

export namespace Machine {
	export interface Context extends Machine.DefaultContext {}

	export type States<TContext extends Machine.Context> = XS.Typestate<TContext>;

	export type Events = XS.AnyEventObject;

	export type Services = XS.ServiceMap;

	export type TypesMeta = XS.TypegenMeta;

	// ===[Class]===

	export type Type<
		TContext extends Machine.Context = any,
		TStates extends Machine.States<TContext> = any,
		TEvents extends Machine.Events = any,
		TServices extends Machine.Services = any,
		TTypesMeta extends Machine.TypesMeta = any,
	> = Machine.Constructor<TContext, TStates, TEvents, TServices, TTypesMeta>;

	export type Constructor<
		TContext extends Machine.Context,
		TStates extends Machine.States<TContext>,
		TEvents extends Machine.Events,
		TServices extends Machine.Services,
		TTypesMeta extends Machine.TypesMeta,
	> = abstract new () => Machine<
		TContext,
		TStates,
		TEvents,
		TServices,
		TTypesMeta
	>;

	// ===[Defaults]===

	export interface DefaultContext extends Record<string, unknown> {
		/**
		 * Current status of the Machine instance
		 */
		status: string;

		/**
		 * Indicates the debug state of the Machine
		 */
		debug: boolean;
	}

	export type StateMachine<
		TContext extends Machine.Context,
		TStates extends Machine.States<TContext>,
		TEvents extends Machine.Events,
		TServices extends Machine.Services,
		TTypesMeta extends Machine.TypesMeta,
	> = XS.StateMachine<
		TContext,
		any,
		TEvents,
		TStates,
		XS.ActionObject<TContext, TEvents>,
		TServices,
		XS.ResolveTypegenMeta<
			TTypesMeta,
			TEvents,
			XS.ActionObject<TContext, TEvents>,
			TServices
		>
	>;

	// ===[Inferrers]===

	// export type From<
	// 	TMachine,
	// 	TKey extends TMachine extends Machine.Type
	// 		? keyof InstanceType<TMachine>
	// 		: TMachine extends Machine
	// 		? keyof TMachine
	// 		: never,
	// > = TMachine extends Machine
	// 	? TMachine[TKey]
	// 	: TMachine extends Machine.Type
	// 	? InstanceType<TMachine>[TKey]
	// 	: never;

	export type FromInstance<
		TMachine extends Machine.Type,
		TKey extends keyof InstanceType<TMachine>,
	> = InstanceType<TMachine>[TKey];

	export type FromInterface<
		TMachine extends Machine,
		TKey extends keyof TMachine,
	> = TMachine[TKey];

	export type ActionsFrom<TMachine> = TMachine extends Machine.Type
		? Machine.ActionsFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.ActionsFromInterface<TMachine>
		: never;
	export type ActionsFromInterface<TMachine extends Machine> =
		Machine.FromInterface<TMachine, "__TAction">;
	export type ActionsFromInstance<TMachine extends Machine.Type> =
		Machine.FromInstance<TMachine, "__TAction">;

	export type ContextFrom<TMachine> = TMachine extends Machine.Type
		? Machine.ContextFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.ContextFromInterface<TMachine>
		: never;
	export type ContextFromInterface<TMachine extends Machine> =
		Machine.FromInterface<TMachine, "__TContext">;
	export type ContextFromInstance<TMachine extends Machine.Type> =
		Machine.FromInstance<TMachine, "__TContext">;

	export type EventsFrom<TMachine> = TMachine extends Machine.Type
		? Machine.EventsFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.EventsFromInterface<TMachine>
		: never;
	export type EventsFromInterface<TMachine extends Machine> =
		Machine.FromInterface<TMachine, "__TEvent">;
	export type EventsFromInstance<TMachine extends Machine.Type> =
		Machine.FromInstance<TMachine, "__TEvent">;

	export type ServicesFrom<TMachine> = TMachine extends Machine.Type
		? Machine.ServicesFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.ServicesFromInterface<TMachine>
		: never;
	export type ServicesFromInterface<TMachine extends Machine> =
		Machine.FromInterface<TMachine, "__TServiceMap">;
	export type ServicesFromInstance<TMachine extends Machine.Type> =
		Machine.FromInstance<TMachine, "__TServiceMap">;

	export type StateFrom<TMachine> = TMachine extends Machine.Type
		? Machine.StateFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.StateFromInterface<TMachine>
		: never;
	export type StateFromInterface<TMachine extends Machine> =
		Machine.FromInterface<TMachine, "initialState">;
	export type StateFromInstance<TMachine extends Machine.Type> =
		Machine.FromInstance<TMachine, "initialState">;

	export type StatesFrom<TMachine> = TMachine extends Machine.Type
		? Machine.StatesFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.StatesFromInterface<TMachine>
		: never;
	export type StatesFromInterface<TMachine extends Machine> =
		Machine.FromInterface<TMachine, "__TTypestate">;
	export type StatesFromInstance<TMachine extends Machine.Type> =
		Machine.FromInstance<TMachine, "__TTypestate">;

	export type InterpreterFrom<TMachine> = TMachine extends Machine.Type
		? Machine.InterpreterFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.InterpreterFromInterface<TMachine>
		: never;
	export type InterpreterFromInterface<TMachine extends Machine> =
		XS.InterpreterFrom<TMachine>;
	export type InterpreterFromInstance<TMachine extends Machine.Type> =
		XS.InterpreterFrom<InstanceType<TMachine>>;

	export type TypesMetaFrom<TMachine> = TMachine extends Machine.Type
		? Machine.TypesMetaFromInstance<TMachine>
		: TMachine extends Machine
		? Machine.TypesMetaFromInterface<TMachine>
		: never;
	export type TypesMetaFromInterface<TMachine extends Machine> =
		Machine.FromInterface<TMachine, "__TResolvedTypesMeta">;
	export type TypesMetaFromInstance<TMachine extends Machine.Type> =
		Machine.FromInstance<TMachine, "__TResolvedTypesMeta">;

	export type Update<TContext extends Record<string, unknown>> = {
		[K in keyof TContext]: Machine.Updater<TContext, K, TContext[K]>;
	};

	export type Updater<
		TContext,
		TType extends string,
		TValue = any,
	> = Immer.ImmerUpdater<
		TContext,
		Immer.ImmerUpdateEvent<`${Uppercase<TType>}_UPDATE`, TValue>
	>;

	export type Updaters<TContext> = {
		[K in keyof TContext as K extends string
			? string extends K
				? never
				: `${Uppercase<K>}_UPDATE`
			: never]: Record<"actions", Updater<TContext, K, TContext[K]>["action"]>;
	};
}
