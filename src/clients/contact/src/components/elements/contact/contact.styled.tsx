import * as Spring from "@react-spring/web";
import * as X from "@xstyled/styled-components";
import * as React from "react";
import { animated } from "@react-spring/web";
import { styled } from "@xstyled/styled-components";

import * as Utils from "@taygo/client.contact/utils";
import * as Protocol from "@taygo/protocol";

import * as Assets from "./contact.assets";

// ---[Root]-------------------------------------------------------------------

export class Root {
	public static Container: Root.Container;
}

export namespace Root {
	export type Container = Utils.SC<"form", Root.Container.Props>;
	export namespace Container {
		export interface Props {}
	}
}

// ---[Root.Container]---------------------------------------------------------

Root.Container = styled("form")<Root.Container.Props>`
	${Protocol.flex("column")}
	background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  padding: 12px;

  > * {
    width: 100%;
    margin-bottom: 20px;
  }
`;
