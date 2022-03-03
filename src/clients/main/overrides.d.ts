import "@xstyled/system";
import "next/app";
import "styled-components";

import "@eden/types/overrides/extensions";
import "@eden/types/overrides/intl";
import "@eden/types/overrides/object";

type DefaultTheme = import("@eden/client.main/theme").DefaultTheme;

declare module "@xstyled/system" {
	export interface Theme extends DefaultTheme {}
}

declare module "styled-components" {
	export interface DefaultTheme extends DefaultTheme {}
}
