import * as Protocol from "@eden/protocol";

export const debug = (logLevel: Protocol.LogLevel = Protocol.LogLevel.INFO) => {
	return (
		target: any,
		name: string,
		descriptor: TypedPropertyDescriptor<any>,
	) => {
		const fn = descriptor.value;
		descriptor.value = function (...args: any[]) {
			const prototype = Object.getPrototypeOf(this);

			const displayName: string =
				target.constructor.displayName || prototype.constructor.displayName;

			if (
				(this as any).id &&
				(this as any).context?.data &&
				(((this as any).context?.data?.[(this as any).id] &&
					(this as any).context?.data?.[(this as any).id].debug?.value) ||
					(this as any).context?.data?.global?.debug?.value)
			) {
				console[logLevel](`${displayName}::${name} ↦`, ...args);
			}
			fn.bind(this)(...args);
		};
		return descriptor;
	};
};

export const LogLevel = Protocol.LogLevel;
