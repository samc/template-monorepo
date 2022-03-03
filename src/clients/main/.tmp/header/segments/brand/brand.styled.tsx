import * as Spring from "@react-spring/web";
import * as SC from "@xstyled/styled-components";
import * as React from "react";
import { animated } from "@react-spring/web";
import { default as styled } from "@xstyled/styled-components";

import * as Utils from "@eden/utils";

import * as Assets from "./brand.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Utils.StyledComponent<"div", RootContainerProps>;
}

// ---[Root.Container]---------------------------------------------------------

interface RootContainerProps {
	/** */
}

Root.Container = styled("div")<RootContainerProps>`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

// ---[Logo]-------------------------------------------------------------------

export class Logo {
	public static Container: Utils.StyledComponent<"div", LogoContainerProps>;
	public static Image: Utils.StyledComponent<
		typeof Assets.Logo,
		LogoImageProps
	>;
}

// ---[Logo.Container]---------------------------------------------------------

interface LogoContainerProps {
	/** */
}

Logo.Container = styled("div")<LogoContainerProps>`
	/*  */
`;

// ---[Logo.Image]-------------------------------------------------------------

interface LogoImageProps {}

Logo.Image = styled(Assets.Logo)<LogoImageProps>`
	height: 30px;
`;
