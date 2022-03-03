---
to: "<%= `${target}/${fileName}/${fileName}.styled.tsx` %>"
---
import * as React from "react";
import * as Spring from "@react-spring/web";
import * as X from "@xstyled/styled-components";

import { styled } from "@xstyled/styled-components";
import { animated } from "@react-spring/web";

import * as Theme from "$theme";
import * as Utils from "$utils";

import * as Assets from "./<%= fileName %>.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Utils.StyledComponent<Spring.AnimatedComponent<"div">, RootContainerProps>;
}

// ---[Root.Container]---------------------------------------------------------

interface RootContainerProps {}

Root.Container = styled(animated.div)<RootContainerProps>`
	/** */
`;
