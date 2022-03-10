import * as Spring from "@react-spring/web";
import * as X from "@xstyled/styled-components";
import * as React from "react";
import { animated } from "@react-spring/web";
import { styled } from "@xstyled/styled-components";

import * as Theme from "@taygo/client.contact/theme";

import * as Utils from "@taygo/client.contact/utils";

import * as Assets from "./app.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Utils.StyledComponent<
		Spring.AnimatedComponent<"div">,
		RootContainerProps
	>;
}

// ---[Root.Container]---------------------------------------------------------

interface RootContainerProps {}

Root.Container = styled(animated.div)<RootContainerProps>`
	/** */
	background: black;
`;