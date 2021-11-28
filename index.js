const core = require("@actions/core");
const github = require("@actions/github");
const { execSync } = require("child_process");

function pushSub(name, url) {
  let split = `git subtree split --prefix ${name} -b ${name}`;
  let push = `git push   ${url} ${name}:main`;
  let deleteB = `git branch -D ${name}`;
  let cmd = `${split} && ${push} && ${deleteB}`;
  let res = execSync(cmd);
  return res.toString();
}

try {
  // `who-to-greet` input defined in action metadata file
  //const nameToGreet = core.getInput("who-to-greet");
  //console.log(`Hello ${nameToGreet}!`);
  //const time = new Date().toTimeString();
  //core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2);
  //console.log(`The event payload: ${payload}`);

  let subtrees = `git log | grep git-subtree-dir | tr -d ' ' | cut -d ":" -f2 | sort | uniq | xargs -I {} bash -c 'if [ -d $(git rev-parse --show-toplevel)/{} ] ; then echo {}; fi'`;

  //let subRepos = execSync(subtrees).toString().split(" ");
  let subRepos = ["sub-test"];
  subRepos = subRepos.map((e) => e.replace("\n", ""));
  for (let name of subRepos) {
    let r = pushSub(name, "git@github.com:Talal-l/sub-test.git");
    console.log("repo:", name, r);
  }

  //let gitOut = execSync("git status");
  //console.log("git", gitOut.toString());
} catch (error) {
  core.setFailed(error.message);
}
