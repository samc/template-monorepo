import * as Universal from "@taygo/universal";

export type WithSensorProps<TEnhancer> =
	"sensors" extends keyof Universal.EnhancerProps<TEnhancer>
		? Universal.EnhancerProps<TEnhancer>["sensors"]
		: never;
