import * as React from "react";

interface Props {
	active: boolean;
	component?: React.ReactElement<any>;
}

export const Show: React.FC<Props> = (props): JSX.Element => {
	const { active, children, component = children } = props;
	return <React.Fragment>{active ? component : null}</React.Fragment>;
};
