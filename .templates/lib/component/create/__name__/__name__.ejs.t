---
to: "<%= `${target}/${fileName}/${fileName}.tsx` %>"
---
import * as React from "react";

import * as Constants from "./<%= fileName %>.constants";

<% if (options.animator) { -%>
import { Animator as _Animator } from "./<%= fileName %>.animator";
<% } -%>
<% if (options.controller) { -%>
import { Controller as _Controller } from "./<%= fileName %>.controller";
<% } -%>
<% if (options.observer) { -%>
import { Observer as _Observer } from "./<%= fileName %>.observer";
<% } -%>
import { View as _View } from "./<%= fileName %>.view";

export class <%= className %> extends React.Component<<%= className %>.View.Props> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = Constants.Component.NAME;
	public static readonly defaultProps: <%= className %>.View.Props =
		_View.defaultProps;


	public render(): React.ReactNode {
		return (
<% if (options.controller) { -%>
			<_Controller>
<% } -%>
<% if (options.observer) { -%>
				<_Observer>
<% } -%>
<% if (options.animator) { -%>
					<_Animator>
<% } -%>
						<_View {...this.props} />
<% if (options.animator) { -%>
					</_Animator>
<% } -%>				
<% if (options.observer) { -%>
				</_Observer>
<% } -%>				
<% if (options.controller) { -%>
			</_Controller>
<% } -%>
		);
	}
}

export namespace <%= className %> {
<% if (options.animator) { -%>
	export import Animator = _Animator;
<% } -%>
<% if (options.controller) { -%>
	export import Controller = _Controller;
<% } -%>
<% if (options.observer) { -%>
	export import Observer = _Observer;
<% } -%>
	export import View = _View;
}
