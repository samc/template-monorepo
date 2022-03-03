import styled from "styled-components";

/* eslint-disable-next-line */
export interface PrimitivesProps {}

const StyledPrimitives = styled.div`
	color: pink;
`;

export function Primitives(props: PrimitivesProps) {
	return (
		<StyledPrimitives>
			<h1>Welcome to Primitives!</h1>
		</StyledPrimitives>
	);
}

export default Primitives;
