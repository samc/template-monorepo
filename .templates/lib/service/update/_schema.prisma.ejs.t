---
to: <%= root %>/schema.prisma
force: true
---
datasource db {
  provider = "sqlite"
  url      = "file:dev.db"
}

generator db {
  provider = "go run github.com/prisma/prisma-client-go"
  output   = "./db"
  package  = "db"
}

<% h.models.forEach((model) => { -%>
<% if (model.type === "model") { -%>
model <%= model.name %> {
<% model.fields.forEach((field) => { -%>
  <%= field.name %> <%= field.type %>
<% }); -%>
}
<% }; -%>
<% if (model.type === "enum") { -%>
enum <%= model.name %> {
<% model.values.forEach((value) => { -%>
  <%= value %>
<% }); -%>
}
<% }; -%>

<% }); -%>
