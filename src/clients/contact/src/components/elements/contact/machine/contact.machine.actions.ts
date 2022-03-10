import * as Schema from "@taygo/client.contact/graphql/schema";
import { client } from "@taygo/client.contact/graphql/client";

import { Contact as Machine } from "./contact.machine";

export async function submitContactForm(
	context: Machine.Context,
): Promise<Schema.Contact> {
	const { debug, status, ...variables } = context;
	const mutation = await client.mutate<
		Schema.Contact,
		Schema.CreateContactMutationVariables
	>({
		mutation: Schema.CreateContactDocument,
		variables: { contact: variables },
	});

	return mutation.data;
}
