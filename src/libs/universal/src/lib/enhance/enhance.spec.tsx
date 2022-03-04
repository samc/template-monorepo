import * as Testing from "@testing-library/react";
import * as React from "react";

import * as Util from "@taygo/universal/universal/util";
import { enhance } from "@taygo/universal/universal/lib/enhance/enhance";
import { render, Render } from "@taygo/universal/universal/lib/render/render";

import * as TS from "@taygo/universal/universal/ts";

const COMPONENT_ID = "render";

interface HOCState {
	foo: string;
}

const defaultState: HOCState = Object.freeze<HOCState>({
	foo: "bar",
});

class HOC extends React.Component<TS.UniversalRenderProps<HOCState>, HOCState> {
	public static readonly defaultState: HOCState = defaultState;
	public readonly state: HOCState = defaultState;

	public render(): Render {
		return render(this.props, this.state);
	}
}

interface ChildProps
	extends TS.UniversalEnhancerInjectedProps<typeof withHOC> {}

const defaultProps: ChildProps = Object.freeze<ChildProps>({
	foo: {
		bar: {
			foo: "",
		},
	},
});

const Child = (props: ChildProps = defaultProps): JSX.Element => {
	const { foo } = props.foo.bar;

	return <div data-testid={COMPONENT_ID} data-foo={foo} />;
};

const withHOC = createEnhancer(HOC, "foo", "bar");
const ChildWithHOC = withHOC(Child);

describe("createEnhancer", () => {
	it("renders correctly", () => {
		const node = Testing.render(<ChildWithHOC />);

		expect(node).toMatchSnapshot();
	});

	it("propagates data via higher-order component (HOC) pattern", () => {
		const node = Testing.render(<ChildWithHOC />);
		const child = node.getByTestId(COMPONENT_ID);

		expect(child.getAttribute("data-foo")).toEqual("bar");
	});
});
