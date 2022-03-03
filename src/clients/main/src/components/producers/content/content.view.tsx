import * as NA from "next/app";
import * as React from "react";
import { default as NextDynamic } from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";

import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";

import * as Constants from "./content.constants";

const TinaCMS = NextDynamic(() => import("tinacms"), { ssr: false });

const defaultProps = Object.freeze<View.Props>({
	pageProps: undefined,
	router: undefined,
	Component: undefined,
});

const defaultState = Object.freeze<View.State>({
	/** */
});

export class View extends React.Component<View.Props, View.State> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.NAME}.View`;
	public static readonly defaultProps: View.Props = defaultProps;
	public static readonly defaultState: View.State = defaultState;
	public readonly state: View.State = defaultState;

	// ===[Lifecycle]===

	render(): React.ReactNode {
		const { children, Component, pageProps } = this.props;

		return (
			<React.Fragment>
				<TinaEditProvider
					showEditButton={true}
					editMode={
						<TinaCMS
							branch="main"
							cmsCallback={(cms) => {
								/**
								 * Enables experimental branch switcher
								 */
								cms.flags.set("branch-switcher", true);

								/**
								 * Enables `tina-admin` specific features in the Tina Sidebar
								 */
								cms.flags.set("tina-admin", true);
							}}
							documentCreatorCallback={{
								/**
								 * After a new document is created, redirect to its location
								 */
								onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
									const relativeUrl = `/${slug}/${breadcrumbs.join("/")}`;
									return (window.location.href = relativeUrl);
								},
								/**
								 * Only allows documents to be created to the `Blog Posts` Collection
								 */
								filterCollections: (options) => {
									return options.filter(
										(option) => option.label === "Blog Posts",
									);
								},
							}}
							{...pageProps}
						>
							{(livePageProps) => <Component {...livePageProps} />}
						</TinaCMS>
					}
				>
					{children}
				</TinaEditProvider>
			</React.Fragment>
		);
	}
}

export namespace View {
	export interface Props extends NA.AppProps {}
	export interface State {}
}
