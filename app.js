const APIURL = "https://api.github.com/users/";

const form = document.querySelector("#form");
const search = document.querySelector("#search");

// Fetch user
async function getUser(userName) {
  try {
    const { data } = await axios(APIURL + userName);
    createUserCard(data);
    // getRepo(userName);
  } catch (err) {
    if (err.response.status == 404) {
      createErrCard("User do not exist");
    }
  }
}

// Fetch user's repo
// async function getRepo(userName) {
//   try {
//     const { repos } = await axios(APIURL + userName + "/repos?sort=created");
//     // addRepoToCard(repos);
//   } catch (err) {
//     createErrCard("Repos cannot be fetched");
//   }
// }

// Display user card
function createUserCard(user) {
  const cardHTML = `
  <div class="card">
        <div>
          <img
            src="${user.avatar_url}"
            alt="${user.avatar_url}"
            class="avatar"
          />
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>
            ${user.bio ? user.bio : "No bio"}
          </p>
          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos"></div>
        </div>
      </div>
  `;

  main.innerHTML = cardHTML;
}

// Display Error Search card
function createErrCard(errMsg) {
  const cardHTML = `
    <div class="card">
    <h2>${errMsg}</h2>
    </div>
  `;
  main.innerHTML = cardHTML;
}

// Add Repo to card
// function addRepoToCard(repos) {
//   const reposEl = document.querySelector("#repos");

// Show the first ten repos
//   repos.slice(0, 10).forEach((repo) => {
//     const repoEl = document.createElement("a");
//     repoEl.classList.add("repo");
//     repoEl.href = repo.html_url;
//     repoEl.target = "_blank";
//     repoEl.innerText = repo.name;

//     reposEl.appendChild(repoEl);
//   });
// }

// Trigger search user feature
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
