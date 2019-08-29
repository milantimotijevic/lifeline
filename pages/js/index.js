const electron = require('electron');
var ks = require('node-key-sender');

const intro = document.getElementById('intro');
const info = document.getElementById('info');
const runBtn = document.getElementById('run-btn');
const secSpan = document.getElementById('sec-span');

const combinations = [
    ['space', 'a', 'w'],
    ['space', 'a', 's'],
    ['space', 'd', 'w'],
    ['space', 'd', 's'],
    ['space', 'w'],
    ['space', 's'],
    ['space', 'a'],
    ['space', 'd']
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
    while(true) {
        await step();
    }
}

function step() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            ks.sendKeys(combinations[Math.floor(Math.random()*combinations.length)]);
            resolve();
        }, getRandomInt(1000, 20000)); 
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
