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

// timings (ms)
const timeBeforePlaceholder = 15000;
const minimumRouletteTime = 5000;

// spinning roulette flag
let canWeSpinNow = true;

// last shown colors
let lastShownColors = [0];

// timer array
const timer = [];

// roulette trigger 
window.onkeypress = function (event) {
    if (event.key !== 'Enter' || !canWeSpinNow) { return }
    swellRoulette();
}

// roulette
function swellRoulette() {

    // clearing placeholder timer
    clearPlaceholderTimer();

    // next color rng
    const colorEnum = rng();
    if (lastShownColors.includes(colorEnum)) { return swellRoulette() };

    // roulette trigger prevention 
    canWeSpinNow = false;

    // color swapping
    const lastShownColor = lastShownColors[lastShownColors.length - 1];
    const previousColor = document.querySelector(`#${swellScale[lastShownColor]}`)
    const nextColor = document.querySelector(`#${swellScale[colorEnum]}`)
    previousColor.classList.add('hidden');
    nextColor.currentTime = 0
    nextColor.classList.remove('hidden');

    // saving shown color
    lastShownColors.push(colorEnum)

    // slicing the list of last displayed colors (keeping track only the last 2 shown colors)
    if (lastShownColors.length > 2) { lastShownColors = lastShownColors.slice(-2) }

    // roulette cooldown timer
    setTimeout(() => { canWeSpinNow = true }, minimumRouletteTime)

    // revert to placeholder timer
    timer.push(setPlaceholderTimer());
}

// reverting to placeholder 
function setPlaceholderTimer() {
    return setTimeout(() => {

        // last displayed color 
        const lastShownColor = lastShownColors[lastShownColors.length - 1];

        // swapping to placeholder
        const previousColor = document.querySelector(`#${swellScale[lastShownColor]}`)
        const placeholder = document.querySelector(`#placeholder`)
        previousColor.classList.add('hidden');
        placeholder.currentTime = 0
        placeholder.classList.remove('hidden');

        // reseting the last displayed colors
        lastShownColors = [0];
    }, timeBeforePlaceholder);
}

// revert to placeholder timer reset (in case of another trigger while displaying a color already)
function clearPlaceholderTimer() { for (let i = 0; i < timer.length; i++) { clearTimeout(timer[i]); } }

// random number generator beetween 1 - 7
function rng() { return Math.floor(Math.random() * 7 + 1) }
