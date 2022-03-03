---
inject: true
to: "<%= updater ? `${target}/${fileName}.updaters.ts` : null %>"
append: true
skip_if: \[<%= updater.className %>\]
---
<% var machine = machine || component %>
// ---[<%= updater.className %>]------------------------------------------------------------------

/**
 * Event signature for the {@link <%= updater.propertyName %> `<%= updater.propertyName %>`} updater.
 */
type <%= updater.className %>Event = Immer.ImmerUpdateEvent<Type.<%= updater.constantName %>, <%= machine.className %>.Context["<%= updater.propertyName %>"]>;

/**
 * Updater for the {@link <%= updater.className %>.Context.<%= updater.propertyName %> `<%= updater.propertyName %>`} context
 * property.
 */
export const <%= updater.propertyName %> = Immer.createUpdater<<%= machine.className %>.Context, <%= updater.className %>Event>(
	Type.<%= updater.constantName %>,
	(ctx, { input }) => {
		ctx.<%= updater.propertyName %> = input;
	},
);