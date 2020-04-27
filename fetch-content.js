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
    await exec("rm -rf temp && rm -rf content/*");

    for (const repository of repositories) {
        for (const [branch, alias] of Object.entries(repository.branches)) {
            promises.push(exec(`mkdir -p content/${repository.name}/${alias} \
                && mkdir -p temp/${repository.name}/${alias} \
                && cd temp/${repository.name}/${alias} \
                && git init \
                && git config core.sparseCheckout true \
                && echo "/docs" >> .git/info/sparse-checkout \
                && git remote add -f origin git@github.com:spatie/${repository.name}.git \
                && git pull origin ${branch} \
                && cp -r docs/* ../../../content/${repository.name}/${alias} \
                && echo "---\ntitle: ${repository.name}\ncategory: ${repository.category}\n---" > ../../../content/${repository.name}/_index.md`));
        }
    }

    await Promise.all(promises)
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            exec("rm -rf temp");
        });
    console.timeEnd('Fetched repositories');
})();
