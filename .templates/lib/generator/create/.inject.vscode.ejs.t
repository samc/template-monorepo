---
inject: true
to: .vscode/eden.code-workspace
at_line: 58
skip_if: <%= name %>
---
		{
			"name": "templates:<%= fileName %> (new)",
			"path": "../.templates/lib/new/<%= fileName %>"
		},