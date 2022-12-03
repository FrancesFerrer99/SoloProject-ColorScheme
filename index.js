const seedColorEl = document.getElementById('seed-color')
const selectEl = document.getElementById('mode-selector')
const form = document.getElementById('form')
const colorScheme = document.getElementById('color-scheme')

let colorsArray = []

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let seed = seedColorEl.value.slice(1)
    let mode = selectEl.value
    fetch(`https://www.thecolorapi.com/scheme?hex=${seed}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
                colorsArray = data.colors
                renderColors()
            }
        )
})

document.addEventListener('click', (e) => {
    if(e.target.dataset.hex){
        navigator.clipboard.writeText(e.target.textContent)
    }
})

function renderColors(){
    let colorsHtml = ''
    for(let color of colorsArray){
        let hexValue = color.hex.value
        colorsHtml += `
            <div class="color" style="background-color: ${hexValue}">
                <button class="hex-value-btn btn" data-hex="${hexValue}">${hexValue}</button>
            </div>
        `
    }
    colorScheme.innerHTML = colorsHtml
}