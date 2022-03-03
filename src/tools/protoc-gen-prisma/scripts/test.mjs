const utils = require("../.templates/lib/service/utils");
const schema = require("../api/schema.json");
const models = utils.models(schema.nested.eden.nested)
console.log([...models]);
