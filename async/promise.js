// const x = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve(1);
//     reject(new Error("this is an error"));
//   }, 2000);
// });

// x.then((result) => console.log("Result: ", result)).catch((err) =>
//   console.log("ERROR: ", err.message)
// );

console.log("Before");
// saving from callback hell using promises

// getUser(1).then((user) => {
//   getRepos(user).then((repos) => {
//     getCommits(repos[0]).then((commits) => {
//       console.log(commits);
//     });
//   });
// });

getUser(1)
  .then((user) => getRepos(user))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log(commits))
  .catch((err) => console.log("Error: ", err.message));

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
