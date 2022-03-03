---
to: "<%= `${target}/${fileName}/${fileName}.constants.ts` %>"
---
export enum Component {
  ID = "<%= propertyName %>",
  NAME = "<%= variant.className %>.<%= className %>",
}
