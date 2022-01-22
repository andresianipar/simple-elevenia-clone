const fs = require("fs");

function log(path, data) {
  fs.appendFileSync(path, data, (error) => {
    if (error) {
      return console.log(error);
    }

    return console.log(`Successfully write to file ${path}`);
  });
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }

    return value;
  };
};

function parseError(error) {
  if (error.response) {
    return JSON.stringify(error.response, getCircularReplacer());
  }
  if (typeof error === "object") {
    return JSON.stringify(error, getCircularReplacer());
  }
  return error;
}

module.exports = {
  log,
  parseError,
};
