import * as React from "react";

import * as Utils from "@taygo/utils";

import * as Constants from "./brand.constants";
import * as Styled from "./brand.styled";

import * as Animator from "./brand.animator";
import * as Controller from "./brand.controller";

// // ---[View > Logo.Container]--------------------------------------------------

// interface LogoContainerProps {}

// const LogoContainer: React.FC<LogoContainerProps> = (props): JSX.Element => {
// 	const { children } = props;

// 	return <div>{children}</div>;
// };

// LogoContainer.displayName = `${LogoContainer.displayName}.Container`;

// ---[View > Logo]------------------------------------------------------------

interface LogoProps {}

const defaultProps = Object.freeze<LogoProps>({
	/** */
});

export class Logo extends React.Component<LogoProps> {
	public static readonly displayName = `${Constants.COMPONENT_ID}.Logo`;

	public static readonly defaultProps: LogoProps = defaultProps;

	public static Styled = Styled.Logo;
	public static Container: LogoContainer;
	public static Image: LogoImage;

	render(): React.ReactNode {
		const { children } = this.props;

		return <Logo.Container>{children}</Logo.Container>;
	}
}

export interface Logo {
	Props: LogoProps;
}

// ---[View > Logo.Container]--------------------------------------------------

interface LogoContainer extends React.FunctionComponent<LogoContainerProps> {}

interface LogoContainerProps {}

Logo.Container = (props): JSX.Element => {
	const { children } = props;

	return <Styled.Logo.Container>{children}</Styled.Logo.Container>;
};

Logo.Container.displayName = `${Logo.displayName}.Container`;

// ---[View > Logo.Image]------------------------------------------------------

interface LogoImage extends React.FunctionComponent<LogoImageProps> {}

interface LogoImageProps {}

Logo.Image = (props): JSX.Element => {
	return <Styled.Logo.Image />;
};

Logo.Image.displayName = `${Logo.displayName}.Image`;
