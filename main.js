// swell scale enum
const swellScale = {
    0: 'placeholder',
    1: 'red',
    2: 'orange',
    3: 'yellow',
    4: 'lime',
    5: 'green',
    6: 'purple',
    7: 'violet'
}

// last shown colors
let lastShownColors = [0];

// timers
const placeholderTimer = [];
const rouletteTimer = [];

// trigger
window.onkeypress = function (event) {
    if (event.key !== 'Enter') { return }
    swellRoulette();
}

// roulette
function swellRoulette() {
    //clear existing timers
    clearRouletteTimer();
    clearPlaceholderTimer();

    // rng for the next color
    const newScale = rng();
    // if the rng returns one of the last 2 shown colors, we trigger the rng again
    if (lastShownColors.includes(newScale)) { return swellRoulette() };

    // hide last shown color /placeholder
    const lastShownColor = lastShownColors[lastShownColors.length - 1];
    const currentElement = document.querySelector(`#${swellScale[lastShownColor]}`)
    currentElement.classList.add('hidden');

    // saving next color to show
    lastShownColors.push(newScale)

    // slicing the list of last displayed colors (keeping track only the last 2 shown colors)
    if (lastShownColors.length > 2) { lastShownColors = lastShownColors.slice(-2) }

    // trigger roulette animation
    const rouletteElement = document.querySelector(`#roulette`);
    rouletteElement.currentTime = 0;
    rouletteElement.classList.remove('hidden');

    // roulette animation timer (5 sec)
    rouletteTimer.push(setRouletteTimer())
}

function setRouletteTimer() {
    return setTimeout(() => {
        // hide roulette
        const rouletteElement = document.querySelector(`#roulette`);
        rouletteElement.classList.add('hidden');

        // show color
        const colorToShow = lastShownColors[lastShownColors.length - 1]
        const nextElement = document.querySelector(`#${swellScale[colorToShow]}`)
        nextElement.currentTime = 0
        nextElement.classList.remove('hidden');

        // return to placeholder timer
        placeholderTimer.push(setPlaceholderTimer())
    }, 3000);
}

// 15 secs max before reverting to placeholder 
function setPlaceholderTimer() {
    return setTimeout(() => {

        // hide last shown color 
        const lastShownColor = lastShownColors[lastShownColors.length - 1];
        const currentElement = document.querySelector(`#${swellScale[lastShownColor]}`)
        currentElement.classList.add('hidden');

        // show placeholder
        const nextElement = document.querySelector(`#placeholder`)
        nextElement.currentTime = 0
        nextElement.classList.remove('hidden');

        // reset shown colors history
        lastShownColors = [0];
    },15000);
}

// revert to placeholder timer reset (in case of another trigger while displaying a color already)
function clearPlaceholderTimer() { for (let i = 0; i < placeholderTimer.length; i++) { clearTimeout(placeholderTimer[i]); } }

// roulette reset (in case of another trigger while displaying the roulette already)
function clearRouletteTimer() { for (let i = 0; i < rouletteTimer.length; i++) { clearTimeout(rouletteTimer[i]); } }

// random number generator beetween 1 - 7
function rng() { return Math.floor(Math.random() * 7 + 1) }
