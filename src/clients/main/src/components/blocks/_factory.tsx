import React from "react";

import * as Api from "@eden/client.main/api";
import * as Elements from "@eden/client.main/elements";

const defaultProps = Object.freeze<Factory.Props>({});

export class Factory extends React.PureComponent<Factory.Props> {
	public readonly id = "factory";
	public static readonly displayName = "Block.Factory";
	public static readonly defaultProps: Factory.Props = defaultProps;

	// ===[Nodes]===

	public static Selection: Factory.Selection;

	// ===[Lifecycle]===

	public render(): React.ReactNode {
		const { blocks } = this.props;

		return (
			<Elements.Show active={Boolean(blocks.length)}>
				{blocks.map((data, index) => {
					const { __typename: name } = data;

					return (
						<Factory.Selection
							key={`${name}:${index}`}
							data={data}
							index={index}
							name={name}
						/>
					);
				})}
			</Elements.Show>
		);
	}
}

export namespace Factory {
	export interface Props extends Api.Pages {}

	export interface Container extends React.FC<Factory.Container.Props> {}
	export namespace Container {
		export interface Props {
			index: number;
		}
	}

	export interface Foo extends React.FC<Factory.Foo.Props> {}
	export namespace Foo {
		export interface Props {
			index: number;
		}
	}

	export interface Selection extends React.FC<Factory.Selection.Props> {
		Blocks?: {
			PagesBlocksContent: typeof BlockStub;
			PagesBlocksHero: typeof BlockStub;
			PagesBlocksFeatures: typeof BlockStub;
			PagesBlocksTestimonial: typeof BlockStub;
		};
	}
	export namespace Selection {
		export interface Props extends Factory.Container.Props {
			data: Api.PagesBlocks;
			name: Api.PagesBlocks["__typename"];
		}
	}
}

// ---[View.Selection]---------------------------------------------------------

interface BlockStubProps {
	data: Api.PagesBlocks;
	parentField: string;
}

const BlockStub: React.FC<BlockStubProps> = (props) => {
	const { data, parentField = "" } = props;
	return <div style={{ height: 1000, width: 1000, background: "red" }} />;
};

Factory.Selection = (props): JSX.Element => {
	const { data, index, name } = props;

	const Block = Factory.Selection.Blocks[name];

	return (
		<div data-tinafield={`block.${index}`}>
			<Block data={data} parentField={`block.${index}`} />
		</div>
	);
};

/**
 * @todo - add code mod via `hygen` generator to automatically append generated
 *         blocks.
 */
Factory.Selection.Blocks = {
	PagesBlocksContent: BlockStub,
	PagesBlocksHero: BlockStub,
	PagesBlocksFeatures: BlockStub,
	PagesBlocksTestimonial: BlockStub,
};

Factory.Selection.displayName = `${Factory.displayName}.Selection`;
