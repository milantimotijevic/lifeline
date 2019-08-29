const electron = require('electron');
var ks = require('node-key-sender');

const intro = document.getElementById('intro');
const info = document.getElementById('info');
const runBtn = document.getElementById('run-btn');
const secSpan = document.getElementById('sec-span');


const KEYS = [
    'w',
    'a',
    's',
    'd',
    'space',
    '1'
];

let counter = 10;

async function countdown() {
    info.hidden = false;
    intro.hidden = true;
    while(counter > -1) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
        updateSecSpan();
    }

    info.innerHTML = 'LIFELINE IS NOW RUNNING!!!!!';
    run();
}

function updateSecSpan() {
    counter--;
    secSpan.innerText = counter;
}

runBtn.addEventListener('click', countdown);

async function run() {
    intro.hidden = true;
    let first = true;
    while(true) {
        await step(first);
        first = false;
    }
}

function step(first) {
    return new Promise((resolve, reject) => {
        let delay;
        if (first) {
            delay = 0;
        } else {
            delay = getRandomInt(2000, 30000);
        }
        setTimeout(function() {
            ks.sendKeys(randomizeKeys());
            resolve();
        }, delay); 
    });
}

Array.prototype.randomDiffElement = function(last) {
    if (this.length == 0) {
       return;
    } else if (this.length == 1) {
       return this[0];
    } else {
       var num = 0;
       do {
          num = Math.floor(Math.random() * this.length);
       } while (this[num] == last);
       return this[num];
    }
 };


function randomizeKeys() {
    const selected = [];
    const count = getRandomInt(0, 3);

    let last;
    for (let i = 0; i <= count; i++) {
        last = KEYS.randomDiffElement(last);
        selected.push(last);
    }

    return selected;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
