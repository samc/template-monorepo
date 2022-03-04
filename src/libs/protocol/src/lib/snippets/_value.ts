import { Unit } from "@taygo/protocol/constants";

/**
 * Normalizes CSS units to the specified <Unit> specification
 * if necessary.
 * @param value Value to be normalized
 * @param unit Unit used to convert the target value
 */
export function value(value: string | number, unit: Unit): string {
	if (typeof value === "number") {
		value = `${value}${unit}`;
	}

	return value;
}
