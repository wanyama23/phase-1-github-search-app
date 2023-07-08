const listOfUsersNode = document.querySelector("#user-list")
const githubFormNode = document.querySelector("#github-form")
const searchInputNode = document.querySelector("#search")
const listOfUsersReposNode = document.querySelector("#repos-list")

function fetchUserByName(userName){
    fetch(`https://api.github.com/search/users?q=${userName}`, {
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer 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",
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(data => renderUsers(data.items))
}




function buildGithubUserList(event) {
    event.preventDefault()
    let userName = searchInputNode.value
    fetchUserByName(userName)
}

function renderUsers(users) {
    for(const li of listOfUsersNode.children){
        li.remove()
    }

    users.forEach(user => {
        const li = document.createElement("li")
        const div = document.createElement("div")
        const img = document.createElement("img")
        const a = document.createElement("a")
        const h1 = document.createElement("h1")

        h1.textContent = user.login
        h1.addEventListener("click", handleUserRepositories)
        img.src = user.avatar_url
        a.href = user.html_url
        a.textContent = `${user.login} Profile`

        div.appendChild(h1)
        div.appendChild(img)
        div.appendChild(a)

        li.appendChild(div)
        listOfUsersNode.appendChild(li)
    });
}

function handleUserRepositories(e) {
//console.log(e.target)
const userName = e.target.textContent
fetchReposByUserName(userName)
}


githubFormNode.addEventListener("submit", buildGithubUserList)

// Display of repos
function fetchReposByUserName(userName){
    fetch(`https://api.github.com/users/${userName}/repos`, {
        headers: {
            "Content-type": "application/json",
            Authorization: "Bearer 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",
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(data => renderUserRepos(data))
}

function renderUserRepos(repos) 
    repos.forEach(repo => {
        const li = document.createElement("li")
        const div = document.createElement("div")
        const a = document.createElement("a")
        const h1 = document.createElement("h1")

        h1.textContent = repo.name
        a.href = repo.html_url
       // console.log(repo.html_url);
        a.textContent = repo.name 

        div.appendChild(h1)
        div.appendChild(a)
        li.appendChild(div)
        listOfUsersReposNode.appendChild(li)




    })