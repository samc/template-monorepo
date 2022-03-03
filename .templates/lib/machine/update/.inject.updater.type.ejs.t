---
inject: true
to: "<%= updater ? `${target}/${fileName}.updaters.ts` : null %>"
after: ===\[Custom\]===
skip_if: <%= updater.constantName %> = "<%= updater.constantName %>_UPDATE",
---
  <%= updater.constantName %> = "<%= updater.constantName %>_UPDATE",