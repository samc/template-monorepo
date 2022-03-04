// import * as Protocol from "@taygo/protocol";
// import * as Testing from "@testing-library/react";

// import * as TS from "@taygo/sensors/universal/ts";

// import * as Locale from "./locale";
// import * as Props from "./locale.constants";

// describe(Props.COMPONENT_ID, () => {
// 	describe("[Default]", () => {
// 		it("renders correctly", () => {
// 			const node = Testing.render(<Locale.LocaleSensor />);

// 			expect(node).toMatchSnapshot();
// 		});

// 		it("detects `languagechange` event and propagates data", async () => {
// 			const Component = (): JSX.Element => {
// 				return (
// 					<Locale.LocaleSensor>
// 						{(data) => {
// 							const { locale } = data;
// 							return <div data-testid={Props.COMPONENT_ID} data-locale={locale} />;
// 						}}
// 					</Locale.LocaleSensor>
// 				);
// 			};
// 			const node = Testing.render(<Component />);
// 			const element = node.getByTestId(Props.COMPONENT_ID);

// 			triggerGeoPositionRequest(window, navigator);

// 			await Testing.waitFor(() => {
// 				expect(element.getAttribute("data-locale")).toBe(Protocol.Locale.fr);
// 			});
// 		});
// 	});

// 	describe("[HOC]", () => {
// 		it("renders correctly", () => {
// 			interface ComponentProps extends TS.EnhancedProps<typeof Locale.withLocaleSensor> {}

// 			const Component = (props: ComponentProps): JSX.Element => {
// 				return <div data-testid={Props.COMPONENT_ID} {...props} />;
// 			};

// 			const ComponentWithWindowSensor = Locale.withLocaleSensor(Component);
// 			const node = Testing.render(<ComponentWithWindowSensor />);

// 			expect(node).toMatchSnapshot();
// 		});

// 		it("detects `languagechange` event and propagates data", async () => {
// 			interface ComponentProps extends TS.EnhancedProps<typeof Locale.withLocaleSensor> {}

// 			const Component = (props: ComponentProps): JSX.Element => {
// 				const { locale } = props.sensors.locale;

// 				return <div data-testid={Props.COMPONENT_ID} data-locale={locale} />;
// 			};
// 			const ComponentWithWindowSensor = Locale.withLocaleSensor(Component);

// 			const node = Testing.render(<ComponentWithWindowSensor />);
// 			const element = node.getByTestId(Props.COMPONENT_ID);

// 			triggerGeoPositionRequest(window, navigator);

// 			await Testing.waitFor(() => {
// 				expect(element.getAttribute("data-locale")).toBe(Protocol.);
// 			});
// 		});
// 	});
// });

// /**
//  * Trigger a synthetic window `languagechange` event.
//  *
//  * @param window - a window containing a DOM document.
//  * @param navigator - the state and the identity of the user agent.
//  * @param element - HTML element with corresponding `requestGeoPosition` onClick handler
//  */
// function triggerGeoPositionRequest(window: Window, navigator: Navigator): void {
// 	const event = new Event("languagechange");

// 	Object.defineProperty(navigator, "languages", {
// 		configurable: true,
// 		value: [Protocol.Locale.fr],
// 	});

// 	Testing.fireEvent(window, event);
// }
