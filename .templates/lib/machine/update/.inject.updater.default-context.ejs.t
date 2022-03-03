---
inject: true
to: "<%= updater ? `${target}/${fileName}.ts` : null %>"
---
<% h.replace(locals.attributes.to, /(const defaultContext = Object\.freeze<Default\.Context>\({\n)(.*?)(}\);)/gms, `$1$2\t${updater.propertyName}: undefined,\n$3`, new RegExp(`(?<target>const defaultContext = Object\\.freeze<Default\\.Context>\\({(?:(?!${updater.propertyName}).)*${updater.propertyName}(?:(?!const defaultContext = Object\\.freeze<Default\\.Context>\\({|^\\s*$).)*}\\);)`, "ms")) %>