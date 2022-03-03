const inflection = require("inflection");
const pb = require("protobufjs");

const attributes = {
	"(eden.db.attr).optional": (value) => (value ? "?" : ""),
	"(eden.db.attr).unique": (value) => (value ? " @unique" : ""),
	"(eden.db.attr).id": (value) => (value ? " @id" : ""),
	"(eden.db.attr).updatedAt": (value) => (value ? " @updatedAt" : ""),
	"(eden.db.attr).default.value": (value) => (value ? ` @default(${value})` : ""),
	"(eden.db.attr).default.autoincrement": (value) => (value ? " @default(autoincrement())" : ""),
	"(eden.db.attr).default.cuid": (value) => (value ? " @default(cuid())" : ""),
	"(eden.db.attr).default.uuid": (value) => (value ? " @default(uuid())" : ""),
	"(eden.db.attr).default.now": (value) => (value ? " @default(now())" : ""),
	"(eden.db.attr).relation.fields": (value) => (value ? ` @relation(fields: [${value}], ` : ""),
	"(eden.db.attr).relation.references": (value) => (value ? `references: [${value}])` : ""),
};

const primitives = {
	string: "String",
};

/**
 * @param {pb.NamespaceBase|pb.NamespaceBase["nested"]} tree - protobuf namespace / reflection object AST (see {@link pb.NamespaceBase})
 * @param {string} target - name of the target data model
 */
function* models(tree) {
	yield* findTypes(tree);
	yield* findModels(tree);
}
module.exports = models;

function* findTypes(tree) {
  for (const object of Object.values(tree)) {
    if (object.nested) {
      yield* models(object.nested);
    }
  }
}

/**
 * @param {pb.ReflectionObject} object - protobuf reflection object AST (see {@link pb.ReflectionObject})
 */
function* findModels(object) {
  for (const type of Object.entries(object)) {
    const [name, value] = type;
		if (value?.options?.["(eden.db.model).gen"] && value.fields) {
      const fields = Array.from(assembleFields(value.fields));
      yield { type: "model", name, fields }
    } else if (value.values) {
      const values = Array.from(assembleValues(value.values));
      yield { type: "enum", name, values }
		}
	}
}

/**
 * @param {pb.Field[]} fields
 */
function* assembleFields(fields) {
  for (const field of Object.entries(fields)) {
    const [fieldName, fieldDefinition] = field;
    let { options, type } = fieldDefinition;

    type = type.split(".").pop();
    type = inflection.camelize(type);

    if (options) {
      for (const option of Object.entries(options)) {
        const [optionName, optionValue] = option;

        if (optionName === "(eden.db.attr).relation.fields") {
          yield {
            name: optionValue,
            type: "String",
          }
        }

        type += attributes[optionName](optionValue);
      }
    }

    yield {
      name: fieldName,
      type,
    };
  }
}

/**
 * @param {pb.Enum["values"]} values
 */
function* assembleValues(values) {
  for (const value of Object.keys(values)) {
    yield value
  }
}

