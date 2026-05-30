function $(tag, className, parent, ns) {
    const elem = ns 
        ? document.createElementNS('http://www.w3.org/2000/svg', tag) 
        : document.createElement(tag);
    elem.className = className;
    parent.appendChild(elem)
    return elem;
}


let lineCoords = []
let coordsBuffer = []
function addLineToCharacterString(coords) {
    coords
        .split(",")
        .forEach(coord => lineCoords.push(Number(coord)))
    if (lineCoords.length === 4) {
        coordsBuffer.push([])
        lineCoords.forEach(coords => coordsBuffer[coordsBuffer.length - 1].push(coords))
        lineCoords = []
    }
}

function submitCharacter() {
    const display = document.getElementById("character-string-result")
    display.value = JSON.stringify(coordsBuffer).replace(/,/g, ", ")
    coordsBuffer = []
}