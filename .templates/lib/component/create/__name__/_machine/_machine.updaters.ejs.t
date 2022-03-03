---
to: "<%= options.controller ? `${target}/${fileName}/machine/machine.updaters.ts` : null %>"
---
<%- h.render(`${templates}/new/machine/__name__/__name__.updaters.ejs.t`, { ...locals, fileName: "machine" }) %>