import * as Universal from "@eden/universal";

export type WithSensorProps<TEnhancer> =
	"sensors" extends keyof Universal.EnhancerProps<TEnhancer>
		? Universal.EnhancerProps<TEnhancer>["sensors"]
		: never;
