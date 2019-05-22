const util = require("util");
const exec = util.promisify(require("child_process").exec);

const packages = [
  {
    name: "enum",
    repository: "sebastiandedeyne/docs-dummy-repo-1",
    branches: {
      master: "v2",
      v1: "v1"
    }
  },
  {
    name: "another-package",
    repository: "sebastiandedeyne/docs-dummy-repo-1",
    branches: {
      master: "v2",
      v1: "v1"
    }
  }
];

(async function() {
  await exec("rm -rf content");
  await exec("mkdir temp");

  try {
    for (const pkg of packages) {
      await exec(`mkdir -p content/${pkg.name}`);
      await exec(
        `git clone https://github.com/${pkg.repository}.git temp/${pkg.name}`
      );

      for (const [branch, alias] of Object.entries(pkg.branches)) {
        await exec(`cd temp/${pkg.name} && git checkout ${branch}`);
        await exec(`cp -r temp/${pkg.name}/docs content/${pkg.name}/${alias}`);
      }
    }
  } catch (error) {
  } finally {
    await exec("rm -rf temp");
  }
})();
