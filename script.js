const AudioContext = window.AudioContext || window.webkitAudioContext;
const aC = new AudioContext();

const oscillator = aC.createOscillator();
const gN = aC.createGain();
oscillator.connect(gN).connect(aC.destination);
gN.gain.value = .2;
oscillator.type = 'square';

let started = false;
let playing = false;

const buttons = document.querySelectorAll('button');
for (button of buttons) {
    button.addEventListener('click', function (event) {
        oscillator.frequency.value = Number(this.getAttribute("data-pitch"));
        if (started === false) {
            started = true;
            playing = true;
            oscillator.start();
            setTimeout(function () {
                aC.suspend();
                playing = false;
            }, 1000);
        } else if (playing === false) {
            aC.resume();
            playing = true;
            setTimeout(function () {
                aC.suspend();
                playing = false;
            }, 1000);
        } else console.log('still playing');
    });
}