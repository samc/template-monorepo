import * as X from "@xstyled/styled-components";

type Keys<TKey extends string> = keyof X.Theme[TKey];

// function getAngle(Angle: Keys<"angle">)
// function getAnimation(Animation: Keys<"animation">)
// function getBorder(Border: Keys<"border">)
// function getBorderColor(BorderColor: Keys<"borderColor">)
// function getBorderStyle(BorderStyle: Keys<"borderStyle">)
// function getBorderWidth(BorderWidth: Keys<"borderWidth">)
export function getColor(color: Keys<"colors">) {
	return X.th.color(color);
}
// function getDuration(Duration: Keys<"duration">])
// function getFont(Font: Keys<"font">])
// function getFontSize(FontSize: Keys<"fontSize">])
// function getFontWeight(FontWeight: Keys<"fontWeight">])
// function getInset(Inset: Keys<"inset">])
// function getLetterSpacing(LetterSpacing: Keys<"letterSpacing">])
// function getLineHeight(LineHeight: Keys<"lineHeight">])
// function getPercent(Percent: Keys<"percent">])
// function getPx(Px: Keys<"px">])
// function getRadius(Radius: Keys<"radius">])
// function getRingWidth(RingWidth: Keys<"ringWidth">])
// function getShadow(Shadow: Keys<"shadow">])
// function getSize(Size: Keys<"size">])
export function getSpace(space: Keys<"space">) {
	return X.th.space(space);
}
// function getTimingFunction(TimingFunction: Keys<"timingFunction">])
// function getTransform(Transform: Keys<"transform">])
// function getTransition(Transition: Keys<"transition">])
// function getTransitionProperty(TransitionProperty: Keys<"transitionProperty">])
// function getZIndex(ZIndex: Keys<"zIndex">])

export const get = {
	color: getColor,
	space: getSpace,
};
