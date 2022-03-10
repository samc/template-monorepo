import * as Spring from "@react-spring/web";
import * as SC from "styled-components";
import * as React from "react";
import { animated } from "@react-spring/web";
import styled from "styled-components";

import * as Protocol from "@taygo/protocol";

import * as Theme from "@taygo/client.contact/theme";
import * as Utils from "@taygo/client.contact/utils";

import * as Assets from "./home.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Utils.SC<
		Spring.AnimatedComponent<"div">,
		RootContainerProps
	>;
}

// ---[Root.Container]---------------------------------------------------------

interface RootContainerProps {}

Root.Container = styled.div`
	${Protocol.page()}
	${Protocol.flex()}
	background: linear-gradient(to right, rgba(0,0,0,0), teal), linear-gradient(to right, rgba(255,0,100,.3), rgba(255,100,127,.2)), linear-gradient(to top right, yellow, rgba(0,0,0,0)), radial-gradient(closest-corner at 20% 80%, yellow, red);
	background-attachment: fixed;
`;
