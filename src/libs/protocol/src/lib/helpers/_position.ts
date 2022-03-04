import { Position } from "@taygo/protocol/constants";

export function isPositionHorizontal(position: Position) {
	return (
		position === Position.TOP ||
		position === Position.TOP_LEFT ||
		position === Position.TOP_RIGHT ||
		position === Position.BOTTOM ||
		position === Position.BOTTOM_LEFT ||
		position === Position.BOTTOM_RIGHT
	);
}

export function isPositionVertical(position: Position) {
	return (
		position === Position.LEFT ||
		position === Position.LEFT_TOP ||
		position === Position.LEFT_BOTTOM ||
		position === Position.RIGHT ||
		position === Position.RIGHT_TOP ||
		position === Position.RIGHT_BOTTOM
	);
}

export function getPositionIgnoreAngles(position: Position) {
	if (
		position === Position.TOP ||
		position === Position.TOP_LEFT ||
		position === Position.TOP_RIGHT
	) {
		return Position.TOP;
	} else if (
		position === Position.BOTTOM ||
		position === Position.BOTTOM_LEFT ||
		position === Position.BOTTOM_RIGHT
	) {
		return Position.BOTTOM;
	} else if (
		position === Position.LEFT ||
		position === Position.LEFT_TOP ||
		position === Position.LEFT_BOTTOM
	) {
		return Position.LEFT;
	} else {
		return Position.RIGHT;
	}
}
