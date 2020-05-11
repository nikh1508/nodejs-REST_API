console.log("Before");
// saving from callback hell using named functions
getUser(1, getRepos);

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("fetched data from db");
    callback({ id: id, user_name: "nikh1508" });
  }, 2000);
}

function getRepos(user) {
  _getRepos(user, getCommits);
}

function _getRepos(user, callback) {
  setTimeout(() => {
    console.log("fetched all repos of user: " + user.user_name);
    callback(["repo-1", "repo-2", "repo-3", "repo-4"]);
  }, 1100);
}

function getCommits(repo) {
  _getCommits(repo[0], displayCommits);
}

function _getCommits(repo, callback) {
  setTimeout(() => {
    console.log("fetching all commits from repo: " + repo);
    callback(["commit-1", "commit-2", "commit-3"]);
  }, 700);
}
function displayCommits(commits) {
  console.log(commits);
}
