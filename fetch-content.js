const util = require("util");
const exec = util.promisify(require("child_process").exec);

const repositories = require("./repositories.json");

function transformBranchToFolderName(branch) {
    return branch.startsWith('v') ? branch.substring(1) : branch;
}

(async function () {
    await exec("rm -rf content");

    try {
        let promises = [];

        for (const repository of repositories) {
            for (const [branch, alias] of Object.entries(repository.branches)) {
                promises.push(exec(`mkdir -p content/${repository.name}/${alias} && curl https://codeload.github.com/${repository.repository}/tar.gz/${branch} \
                 | tar -xz -C content/${repository.name}/${alias} --strip=2 ${repository.repository.split('/')[1]}-${transformBranchToFolderName(branch)}/docs`));
            }
        }

        await Promise.all(promises);
    } catch (error) {
        throw error;
    }
})();
