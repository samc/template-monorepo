---
inject: true
to: "<%= updater ? `${target}/${fileName}.ts` : null %>"
---
<% h.replace(locals.attributes.to, /(\sexport interface Context extends Abstract\.Machine\.DefaultContext {)(.*?)(})/gms, `$1$2\t\t\t${updater.propertyName}: undefined,\n$3`, new RegExp(`(?<target>export interface Context extends Abstract\\.Machine\\.DefaultContext {(?:(?!${updater.propertyName}|}$).)*${updater.propertyName}(?:(?!export interface Context extends Abstract\\.Machine\\.DefaultContext {|^\\s*$).)*}$)`, "ms")) %>