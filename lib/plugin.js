const validateOptions = require("schema-utils");
const fs = require("fs");

const pluginName = "CombineManifestPlugin";

const schema = {
  type: "object",
  properties: {
    from: {
      type: "array"
    },
    to: {
      type: "string"
    }
  },
  additionalProperties: false
};

const msgStr = (msg) => msg
  ? `${pluginName}:\n${msg}`
  : undefined;

module.exports = class CombineManifestPlugin {

  constructor (opts = {}) {

    opts.from = opts.from || [];

    validateOptions(
      schema,
      opts,
      pluginName
    );

    for (const value of opts.from) {

      if (typeof value !== "string") {

        this.error = "\"from\" must be an array of string";

        break;

      }

    }

    this.opts = opts;

  }

  apply (compiler) {

    compiler.hooks.done.tapAsync(
      pluginName,
      (_stats, callback) => {

        if (this.error) {

          return callback(msgStr(this.error));

        }

        const output = {};

        try {

          for (const p of this.opts.from) {

            Object.assign(
              output,
              JSON.parse(fs.readFileSync(
                p,
                { encoding: "utf-8" }
              ))
            );

          }

        } catch (ex) {

          return callback(msgStr(ex.message || ex));

        }

        fs.writeFile(
          this.opts.to,
          JSON.stringify(
            output,
            null,
            4
          ),
          { encoding: "utf-8" },
          (err) => {

            callback(msgStr(err));

          }
        );

      }
    );

  }

};
