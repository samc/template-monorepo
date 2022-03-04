---
to: "<%= options.assets ? `${target}/${fileName}/${fileName}.assets.ts` : null %>"
---
<% if (type.name === "client") { -%>
export {} from "@taygo/client.<%= project.name %>/assets";
<%} else if (type.name === "lib") { -%>
export {} from "@taygo/<%= project.name %>/assets";
<% } -%>
