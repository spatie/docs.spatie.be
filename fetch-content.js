const util = require("util");
const exec = util.promisify(require("child_process").exec);
console.log('Fetching repositories...');
console.time('Fetched repositories');

const repositories = require("./repositories.json");

function transformBranchToFolderName(branch) {
    return branch.startsWith('v') ? branch.substring(1) : branch;
}

(async function () {
    let promises = [];

    for (const repository of repositories) {
        for (const [branch, alias] of Object.entries(repository.branches)) {
            const folder = `content/${repository.name}/${alias}`;
            const url = `https://codeload.github.com/${repository.repository}/tar.gz/${branch}`;

            promises.push(exec(`mkdir -p ${folder} && curl ${url} \
             | tar -xz -C ${folder} --strip=2 ${repository.repository.split('/')[1]}-${transformBranchToFolderName(branch)}/docs \
             && echo "---\ntitle: ${repository.name}\ncategory: ${repository.category}\n---" > content/${repository.name}/_index.md`));
      
        }
    }

    await Promise.all(promises);
    console.timeEnd('Fetched repositories');
})();
