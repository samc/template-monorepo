import * as Testing from "@testing-library/react";
import * as React from "react";

import { compose } from "@taygo/universal/universal/lib/compose/compose";
import { createEnhancer } from "@taygo/universal/universal/lib/create-enhancer/create-enhancer";
import { render, Render } from "@taygo/universal/universal/lib/render/render";

import * as TS from "@taygo/universal/universal/ts";

const COMPONENT_ID = "render";

interface HOC1State {
	foo: string;
}

const defaultHOC1State: HOC1State = Object.freeze<HOC1State>({
	foo: "bar",
});

class HOC1 extends React.Component<
	TS.UniversalRenderProps<HOC1State>,
	HOC1State
> {
	public static readonly defaultState: HOC1State = defaultHOC1State;
	public readonly state: HOC1State = defaultHOC1State;

	public render(): Render {
		return render(this.props, this.state);
	}
}

interface HOC2State {
	foo: string;
}

const defaultHOC2State: HOC2State = Object.freeze<HOC2State>({
	foo: "bar",
});

class HOC2 extends React.Component<
	TS.UniversalRenderProps<HOC2State>,
	HOC2State
> {
	public static readonly defaultState: HOC2State = defaultHOC2State;
	public readonly state: HOC2State = defaultHOC2State;

	public render(): Render {
		return render(this.props, this.state);
	}
}

interface HOC3State {
	foo: string;
}

const defaultHOC3State: HOC3State = Object.freeze<HOC3State>({
	foo: "bar",
});

class HOC3 extends React.Component<
	TS.UniversalRenderProps<HOC3State>,
	HOC3State
> {
	public static readonly defaultState: HOC3State = defaultHOC3State;
	public readonly state: HOC3State = defaultHOC3State;

	public render(): Render {
		return render(this.props, this.state);
	}
}

const withHOC1 = createEnhancer(HOC1, "foo", "hoc1");
const withHOC2 = createEnhancer(HOC2, "foo", "hoc2");
const withHOC3 = createEnhancer(HOC3, "bar", "hoc3");
describe("compose", () => {
	it("renders correctly", () => {
		interface ChildProps extends TS.EnhancedProps<typeof hocs> {}

		const defaultProps: ChildProps = Object.freeze<ChildProps>({
			foo: {
				hoc1: {
					foo: "",
				},
			},
		});

		const Child = (props: ChildProps = defaultProps): JSX.Element => {
			return <div data-testid={COMPONENT_ID} />;
		};

		const hocs = compose(withHOC1);
		const ChildWithHOC = hocs(Child);
		const node = Testing.render(<ChildWithHOC />);

		expect(node).toMatchSnapshot();
	});

	it("propagates data when only one higher-order component is present in composition", () => {
		interface ChildProps extends TS.EnhancedProps<typeof hocs> {}

		const defaultProps: ChildProps = Object.freeze<ChildProps>({
			foo: {
				hoc1: {
					foo: "",
				},
			},
		});

		const Child = (props: ChildProps = defaultProps): JSX.Element => {
			const { hoc1 } = props.foo;

			return <div data-testid={COMPONENT_ID} data-hoc1={hoc1.foo} />;
		};

		const hocs = compose(withHOC1);
		const ChildWithHOC = hocs(Child);

		const node = Testing.render(<ChildWithHOC />);
		const child = node.getByTestId(COMPONENT_ID);

		expect(child.getAttribute("data-hoc1")).toEqual("bar");
	});

	it("propagates data when multiple higher-order components are present in composition", () => {
		interface ChildProps extends TS.EnhancedProps<typeof hocs> {}

		const defaultProps: ChildProps = Object.freeze<ChildProps>({
			foo: {
				hoc1: {
					foo: "",
				},
				hoc2: {
					foo: "",
				},
			},
			bar: {
				hoc3: {
					foo: "",
				},
			},
		});

		const Child = (props: ChildProps = defaultProps): JSX.Element => {
			const { hoc1, hoc2 } = props.foo;
			const { hoc3 } = props.bar;

			return (
				<div
					data-testid={COMPONENT_ID}
					data-hoc1={hoc1.foo}
					data-hoc2={hoc2.foo}
					data-hoc3={hoc3.foo}
				/>
			);
		};

		const hocs = compose(withHOC1, withHOC2, withHOC3);
		const ChildWithHOC = hocs(Child);

		const node = Testing.render(<ChildWithHOC />);
		const child = node.getByTestId(COMPONENT_ID);

		expect(child.getAttribute("data-hoc1")).toEqual("bar");
		expect(child.getAttribute("data-hoc2")).toEqual("bar");
		expect(child.getAttribute("data-hoc3")).toEqual("bar");
	});
});
