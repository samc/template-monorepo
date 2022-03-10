import "@xstyled/system";
import "next/app";
import "styled-components";

import "@taygo/types/overrides/extensions";
import "@taygo/types/overrides/intl";
import "@taygo/types/overrides/object";

type DefaultTheme = import("@taygo/client.contact/theme").DefaultTheme;

declare module "@xstyled/system" {
	export interface Theme extends DefaultTheme {}
}

declare module "styled-components" {
	export interface DefaultTheme extends DefaultTheme {}
}
