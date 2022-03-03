---
to: "<%= options.controller ? `${target}/${fileName}/machine/machine.ts` : null %>"
---
<%- h.render(`${templates}/new/machine/__name__/__name__.ejs.t`, { ...locals, fileName: "machine" }) %>