#!/usr/bin/env zx

import * as FS from "fs";
import pb from "protobufjs";
import glob from "tiny-glob";

const definitions = await glob("api/**/*.proto");
const schema = pb.loadSync(definitions);
FS.promises.writeFile(
	"api/schema.json",
	JSON.stringify(schema.toJSON(), null, 2),
);
