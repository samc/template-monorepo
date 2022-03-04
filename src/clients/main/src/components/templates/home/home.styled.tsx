import * as Spring from "@react-spring/web";
import * as X from "@xstyled/styled-components";
import * as React from "react";
import { animated } from "@react-spring/web";
import styled from "styled-components";

import * as Theme from "@taygo/client.main/theme";

import * as Utils from "@taygo/client.main/utils";

import * as Assets from "./home.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Utils.StyledComponent<
		Spring.AnimatedComponent<"div">,
		RootContainerProps
	>;
}

// ---[Root.Container]---------------------------------------------------------

interface RootContainerProps {}

Root.Container = styled.div`
  flex
`;
