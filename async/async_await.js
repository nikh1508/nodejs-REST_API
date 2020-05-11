async function displayCommits() {
  //   console.log(await getCommits(await getRepos(await getUser(1))));
  // OR
  try {
    const user = await getUser(1);
    const repos = await getRepos(user);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log(err);
  }
}

console.log("Before");
displayCommits();
console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched data from db");
      resolve({ id: id, user_name: "nikh1508" });
    }, 2000);
  });
}

function getRepos(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetched all repos of user: " + user.user_name);
      resolve(["repo-1", "repo-2", "repo-3", "repo-4"]);
      //   reject(new Error("couldn't fetch the repos"));
    }, 1100);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("fetching all commits from repo: " + repo);
      resolve(["commit-1", "commit-2", "commit-3"]);
    }, 700);
  });
}
