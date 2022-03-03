---
to: "<%= options.assets ? `${target}/${fileName}/${fileName}.assets.ts` : null %>"
---
<% if (type.name === "client") { -%>
export {} from "@eden/client.<%= project.name %>/assets";
<%} else if (type.name === "lib") { -%>
export {} from "@eden/<%= project.name %>/assets";
<% } -%>