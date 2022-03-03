---
inject: true
to: "<%= updater ? `${target}/${fileName}.ts` : null %>"
---
<% h.replace(locals.attributes.to, /(\spublic\sget\supdate\(\)\s{\n\s\sreturn\s{)(.*?)(\s\s};\n\s})/gms, `$1$2\t\t\t${updater.propertyName}: Updaters.${updater.propertyName},\n$3`, new RegExp(`(?<target>public get update\\(\\) {(?:(?!${updater.propertyName}|}[^;]).)*${updater.propertyName}(?:(?!public get update\\(\\) {|^\\s*$).)*}[^;])`, "ms")) %>