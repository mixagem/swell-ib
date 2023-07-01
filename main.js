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

// last visited scale
let lastScales = [0];

// timer array
const timer = [];

// trigger
window.onkeypress = function (event) {
    if (event.key !== 'Enter') { return }
    swellRoulette();
}

// roulette
function swellRoulette() {

    // rng for the next color
    clearPlaceholderTimer();
    const newScale = rng();
    if (lastScales.includes(newScale)) { return swellRoulette() };

    // last dipslayed color (in order to add the hidden class)
    const lastShownScale = lastScales[lastScales.length - 1];

    const currentElement = document.querySelector(`#${swellScale[lastShownScale]}`)
    const nextElement = document.querySelector(`#${swellScale[newScale]}`)
    currentElement.classList.add('hidden');
    nextElement.classList.remove('hidden');

    // reseting the video
    nextElement.currentTime = 0

    // saving the color to the list of last displayed colors
    lastScales.push(newScale)

    // slicing the list of last displayed colors (keeping track only the last 2 shown colors)
    if (lastScales.length > 2) {
        lastScales = lastScales.slice(-2)
    }

    // revert to placeholder timmer
    timer.push(setPlaceholderTimer());
}

// 5 secs max before reverting to placeholder 
function setPlaceholderTimer() {
    return setTimeout(() => {

        // last dipslayed color (in order to add the hidden class)
        const lastShownScale = lastScales[lastScales.length - 1];

        const currentElement = document.querySelector(`#${swellScale[lastShownScale]}`)
        const nextElement = document.querySelector(`#${swellScale[0]}`)
        currentElement.classList.add('hidden');
        nextElement.classList.remove('hidden');

        // reseting the video
        nextElement.currentTime = 0

        // reseting the last displayed colors because we went back to the placeholder
        lastScales = [0];
    }, 5000);
}

// revert to placeholder timer reset (in case of another trigger while displaying a color already)
function clearPlaceholderTimer() {
    for (let i = 0; i < timer.length; i++) { clearTimeout(timer[i]); }
}

// random number generator beetween 1 - 7
function rng() { return Math.floor(Math.random() * 7 + 1) }
