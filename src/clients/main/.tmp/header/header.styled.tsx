import * as Spring from "@react-spring/web";
import * as X from "@xstyled/styled-components";
import * as React from "react";
import * as System from "styled-system";
import { animated } from "@react-spring/web";
import { default as styled } from "styled-components";

import * as Theme from "@eden/theme";

import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";
import * as Modules from "@eden/client.main/modules";

import * as Assets from "./header.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Utils.StyledComponent<
		Spring.AnimatedComponent<"nav">,
		RootContainerProps
	>;
	public static Wrapper: Utils.StyledComponent<"div", RootWrapperProps>;
}

// ---[Root.Container]---------------------------------------------------------

interface RootContainerProps {
	/** */
}

interface RootContainerVariants {
	foo: System.VariantArgs;
}

const Button = styled("button")(
	{
		appearance: "none",
		fontFamily: "inherit",
	},
	System.variant({
		scale: "buttons",
		variants: {
			primary: {
				color: "white",
				bg: "primary",
			},
			secondary: {
				color: "white",
				bg: "secondary",
			},
		},
	}),
);

Root.Container = styled(animated.nav)<RootContainerProps>`
	/* Size */
	width: 100%;
	height: 100px;

	/* Position */
	position: fixed;
	top: 0;
	z-index: 100;
`;

// ---[Root.Wrapper]---------------------------------------------------------

interface RootWrapperProps extends X.LayoutProps {
	/** */
}

Root.Wrapper = styled("div")<RootWrapperProps>`
	/* Layout */
	display: flex;
	align-items: stretch;
	justify-content: space-between;

	/* Spacing */
	padding-top: 20px;

	/* Size */
	width: 100%;
	height: 100%;

	/* Variants */
	${System.variant({
		scale: "buttons",
		variants: {
			primary: {
				color: "white",
				bg: "primary",
			},
			secondary: {
				color: "white",
				bg: "secondary",
			},
		},
	})}
`;

Root.Wrapper.variants = {};
