const APIURL = "https://api.github.com/users/"
const input = document.querySelector("#profile")
const form = document.querySelector("#form")
const title = document.querySelector(".card-title")
const main = document.querySelector(".main")
const username = input.value


form.addEventListener("submit", e => {
    e.preventDefault()
    const user = input.value

    if (user) {
        getUser(user)
        input.value = ""
    }
})


async function getUser(username) {
    const responce = await fetch(APIURL + username)
    const data = await responce.json()

    createUser(data)

    getRepos(username)
}

async function getRepos(username) {
    const responce = await fetch(APIURL + username+ "/repos")
    const data = await responce.json()

    addReposToCard(data)
}


function createUser(user) {

    const cardHTML =
        `<div class="card col-lg-8 mx-auto">
            <div class="card-body">
                <img id="profile-image" src="${user.avatar_url}" alt="...">
                <div>

                    <h4 class="card-title">${user.name} | ${user.login}</h4>

                    <p>${user.bio}</p>

                    <a href="${user.html_url}" target="_blank" rel="noopener noreferrer">${user.html_url}</a>
                    <ul>

                        <li><i class="fas fa-map-marker-alt" style="margin-right:10px"></i>${user.company}</li>
                        <li><i class="fas fa-building" style="margin-right:10px"></i>${user.location}</li>
                        <li><i class="fas fa-book" style="margin-right:10px"></i>${user.public_repos} public repos</li>
                        <br>
                        <li>${user.following}<strong> Following</strong></li>
                        <br>
                        <li>${user.followers}<strong> Followers</strong></li>

                    </ul>

                </div>

            </div>
            <hr>
            <div id="repos">

            </div>
        </div>`

    main.innerHTML = cardHTML
}


function addReposToCard(repos) {
    const reposElement = document.querySelector("#repos")

    repos.forEach(repo => {
        const repoEl = document.createElement("a")
        repoEl.className = "btn badge badge-warning"
        repoEl.href = repo.html_url
        repoEl.target = "_blank"
        repoEl.innerHTML = repo.name

        reposElement.appendChild(repoEl)
    });
}