const gama = document.getElementById("categories")
const gameList = document.getElementById("gameList")
const nextBtn = document.getElementById("next-button")
const searchInput = document.getElementById("search-input")
const gamesCounter = document.getElementById("gamesCounter")
import api from "./data/api.js"
import categories from "./data/categories.js";


let gameData = api[0].GameTemplateNameTranslations
const images = api[0].GameTemplateImages

gameData.map((temp) => {
    return images.map(({CdnUrl, GameTemplateId}) => {
        if (temp.GameTemplateId === GameTemplateId) {
            return temp.image = CdnUrl
        }
    })
})

gama.innerHTML = categories.map((el) => {
    return `<div class=${el.active ? "active_category" : ""}>${el.svg} ${el.title}</div>`
}).join("")
let gameCount = 60;

const pipe = gameData
searchInput.addEventListener("input", (e) => {
    gameData = pipe.filter(({Value}) => {
        return Value.toLowerCase().includes(e.target.value.toLowerCase())
    })
    render()
})

const render = () => {
    gameList.innerHTML = gameData.slice(0, gameCount).map(({Value, image}) => {
        return (`<div class="game-image "> <img alt="img"   src="https://static.inpcdn.com/${image}"> <div class="game-name color-success text-light">${Value}</div></div>`)
    }).join("")
    gamesCounter.innerText = gameData.length;
}

render()

const next = () => {
    gameCount = gameCount + 60
    render()
}

nextBtn.addEventListener("click", next)