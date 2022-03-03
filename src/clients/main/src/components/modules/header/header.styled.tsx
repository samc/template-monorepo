import * as Spring from "@react-spring/web";
import * as React from "react";
import * as System from "styled-system";
import { animated } from "@react-spring/web";
import { default as styled } from "styled-components";

import * as Theme from "@eden/client.main/theme";

import * as Utils from "@eden/client.main/utils";

import * as Assets from "./header.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Utils.Styled.Component<
		"div",
		Root.Container.Attrs,
		Root.Container.Variants
	>;
}

export namespace Root {
	export type Container = Utils.Styled.Component<
		"div",
		Root.Container.Attrs,
		Root.Container.Variants
	>;

	export namespace Container {
		export interface Attrs {
			readonly isActive: boolean;
		}

		export type Variants = Utils.Styled.Variants<{
			foo: {
				prop: "foo";
				variants: {
					primary: {
						color: "white";
						bg: "primary";
					};
					secondary: {
						color: "white";
						bg: "secondary";
					};
				};
			};
		}>;

		export type Props = Utils.Styled.Component.Props<Root.Container>;
	}
}

// ---[Root.Container]---------------------------------------------------------

Root.Container = styled("div").attrs<Root.Container.Props>((props) => ({
	foo: "primary",
}))<Root.Container.Props>`
	/** */
	color: black;

	/** ===[Variants]=== */
	${System.variant(Root.Container.variants.foo)}
	${System.variant(Root.Container.variants.foo)}
	${System.variant(Root.Container.variants.foo)}
`;

Root.Container.variants = {
	foo: {
		prop: "foo",
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
	},
};
