import * as Testing from "@testing-library/react";
import * as React from "react";

import * as Util from "@taygo/universal/universal/util";

import * as TS from "@taygo/universal/universal/ts";

import { render, Render } from "./render";

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

interface ChildProps extends HOCState {}

const defaultProps: ChildProps = Object.freeze<ChildProps>({
	foo: "",
});

const Child = (props: ChildProps = defaultProps): JSX.Element => {
	return <div data-testid={COMPONENT_ID} {...props} />;
};

describe("render", () => {
	it("renders correctly with children", () => {
		const node = Testing.render(<HOC>{(data) => <Child {...data} />}</HOC>);
		expect(node).toMatchSnapshot();
	});

	it("render correctly w/ out children", () => {
		const node = Testing.render(<HOC />);
		expect(node).toMatchSnapshot();
	});

	it("propagates state via Function as a Child HOConent (FaCC) pattern", () => {
		const node = Testing.render(<HOC>{(data) => <Child {...data} />}</HOC>);
		const child = node.getByTestId(COMPONENT_ID);

		expect(child.getAttribute("foo")).toEqual("bar");
	});

	it("propagates state via `render` prop pattern", () => {
		const node = Testing.render(<HOC render={(data) => <Child {...data} />} />);
		const child = node.getByTestId(COMPONENT_ID);

		expect(child.getAttribute("foo")).toEqual("bar");
	});

	it("propagates state via `component` prop pattern", () => {
		const node = Testing.render(<HOC component={Child} />);
		const child = node.getByTestId(COMPONENT_ID);

		expect(child.getAttribute("foo")).toEqual("bar");
	});

	it("propagates state via `comp` prop pattern", () => {
		const node = Testing.render(<HOC comp={Child} />);
		const child = node.getByTestId(COMPONENT_ID);

		expect(child.getAttribute("foo")).toEqual("bar");
	});
});
