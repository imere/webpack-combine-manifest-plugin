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

          console.error(msgStr(this.error));

          return callback();

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

          console.error(msgStr(ex.message || ex));

          return callback();

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

            if (err) {
              console.error(msgStr(err))
            }

            callback();

          }
        );

      }
    );

  }

};
