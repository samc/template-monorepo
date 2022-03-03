import * as Testing from "@testing-library/react";
import * as React from "react";

import * as TS from "@eden/sensors/universal/ts";

import * as Props from "./mouse.constants";

import * as Mouse from "./mouse";

describe(Props.COMPONENT_ID, () => {
	describe("[Default]", () => {
		it("renders correctly", () => {
			const node = Testing.render(<Mouse.MouseSensor />);

			expect(node).toMatchSnapshot();
		});

		it("detects `mousemove` event and propagates data", async () => {
			const Component = (): JSX.Element => {
				return (
					<Mouse.MouseSensor>
						{(data) => {
							const { docX, docY, refHandlers } = data;
							return (
								<div
									data-testid={Props.COMPONENT_ID}
									data-docx={docX}
									data-docy={docY}
									ref={refHandlers.target}
								/>
							);
						}}
					</Mouse.MouseSensor>
				);
			};
			const node = Testing.render(<Component />);
			const element = node.getByTestId(Props.COMPONENT_ID);

			const event = new MouseEvent("mousemove", {
				bubbles: true,
			});

			triggerMouseMove(element, 999);

			await Testing.waitFor(() => {
				expect(element.getAttribute("data-docx")).toBe("999");
				expect(element.getAttribute("data-docy")).toBe("999");
			});
		});
	});

	describe("[HOC]", () => {
		it("renders correctly", () => {
			interface ComponentProps
				extends TS.EnhancedProps<typeof Mouse.withMouseSensor> {}

			const Component = (props: ComponentProps): JSX.Element => {
				return <div data-testid={Props.COMPONENT_ID} {...props} />;
			};

			const ComponentWithWindowSensor = Mouse.withMouseSensor(Component);
			const node = Testing.render(<ComponentWithWindowSensor />);

			expect(node).toMatchSnapshot();
		});

		it("detects `mousemove` event and propagates data", async () => {
			interface ComponentProps
				extends TS.EnhancedProps<typeof Mouse.withMouseSensor> {}

			const Component = (props: ComponentProps): JSX.Element => {
				const { docX, docY, refHandlers } = props.sensors.mouse;

				return (
					<div
						data-testid={Props.COMPONENT_ID}
						data-docx={docX}
						data-docy={docY}
						ref={refHandlers?.target}
					/>
				);
			};
			const ComponentWithWindowSensor = Mouse.withMouseSensor(Component);

			const node = Testing.render(<ComponentWithWindowSensor />);
			const element = node.getByTestId(Props.COMPONENT_ID);

			triggerMouseMove(element, 999);

			await Testing.waitFor(() => {
				expect(element.getAttribute("data-docx")).toBe("999");
				expect(element.getAttribute("data-docy")).toBe("999");
			});
		});
	});
});

/**
 * Trigger a synthetic window `resize` event.
 *
 * @param element - HTML element.
 * @param value - stub coordinate.
 */
function triggerMouseMove(element: Element, coordinate: number): void {
	const event = new Event("mousemove", {
		bubbles: true,
	});

	Object.defineProperties(event, {
		pageX: { configurable: true, value: coordinate },
		pageY: { configurable: true, value: coordinate },
	});

	Testing.fireEvent(element, event);
}
