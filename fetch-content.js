const util = require("util");
const exec = util.promisify(require("child_process").exec);

const repositories = require("./repositories.json");

(async function () {
    await exec("rm -rf content");
    await exec("mkdir temp");

    try {
        for (const repository of repositories) {
            await exec(`mkdir -p content/${repository.name}`);
            await exec(`git clone https://github.com/${repository.repository}.git temp/${repository.name}`);

            for (const [branch, alias] of Object.entries(repository.branches)) {
                await exec(`cd temp/${repository.name} && git checkout ${branch}`);
                await exec(`cp -r temp/${repository.name}/docs content/${repository.name}/${alias}`);
            }
        }
    } catch (error) {
        throw error;
    } finally {
        await exec("rm -rf temp");
    }
})();
