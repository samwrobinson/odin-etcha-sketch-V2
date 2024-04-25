let submit = document.querySelector("#submit");
let gridContainer = document.querySelector(".grid-container");
let input = document.querySelector("input");
let clear = document.querySelector('#clear');
let multiColor = document.querySelector('#multi-color');

// Create function to build Grid

function createGrid() {

    let gridSize = parseInt(input.value);
    input.textContent = '';

    if (isNaN(gridSize)) {
        alert("You must enter a number.");
    } else if (gridSize < 1 || gridSize > 100) {
        alert("Please enter a number between 1 & 100.");
        return;
    }

    let containerWidth = gridContainer.clientWidth;
    let containerHeight = gridContainer.clientHeight;

    for (let i=0; i<gridSize*gridSize; i++) {
        let gridCell = document.createElement('div');
        gridCell.classList.add('pixel')
        let pixelWidth = containerWidth / gridSize + 'px';
        let pixelHeight = containerHeight / gridSize + 'px';
        gridCell.style.width = pixelWidth;
        gridCell.style.height = pixelHeight;
        gridCell.style.zIndex = "20";
        gridCell.style.margin = "0";
        gridCell.style.boxSizing = "border-box";

        gridContainer.appendChild(gridCell);

        gridCell.addEventListener("mouseover", darken);

        clear.addEventListener("click", clearGrid)
    }
}

submit.addEventListener('click', createGrid);

function darken(e) {
    e.target.style.backgroundColor = "slategrey";
}

function colorMode() {
    let letters = '0123456789ABCDEF';
    let pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => {
        pixel.addEventListener("mouseover", () => {
            let color = '#';
            for (let i=0; i<6; i ++) {
                color += letters[Math.floor(Math.random()*16)];
            }
            pixel.style.backgroundColor = color;
        })
    })
}

function clearGrid() {
    let pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pixel => {
        pixel.remove();
    });
}

let isRed = false;

function partyMode() {

    isRed = !isRed;

    if (isRed) {
        multiColor.style.backgroundColor = "red";
    } else {
        multiColor.style.backgroundColor = "transparent";
    }
}


multiColor.addEventListener('click', colorMode)
multiColor.addEventListener("click", partyMode);