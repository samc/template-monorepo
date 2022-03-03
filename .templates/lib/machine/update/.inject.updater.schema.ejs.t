---
inject: true
to: "<%= updater ? `${target}/${fileName}.updaters.ts` : null %>"
---
<% h.replace(locals.attributes.to, /(export type Schema = (?:.*));/gm, `$1 | ${updater.className}Event;`, new RegExp(`\\|?\\s${updater.className}Event\\s?\\|?`, "gm")) %>