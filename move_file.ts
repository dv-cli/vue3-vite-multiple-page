const fs = require("fs");

fs.readdirSync("./dist/src/modules").forEach(name => {
  fs.copyFileSync(`./dist/src/modules/${name}/index.html`, `./dist/${name}.html`);
});

fs.rmdirSync("./dist/src", { recursive: true });
