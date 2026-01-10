"use strict";
// method pour creer mon chrono dans le dom
// method pour gerer le timer
// method start mon chrono
// method pour stop le chrono
const container = document.getElementById("chrono-container");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
class Chrono {
    constructor() {
        this.min = 0;
        this.sec = 0;
        this.milisec = 0;
        this.interval = null;
    }
    init(container) {
        this.minSpan = document.createElement("span");
        this.secSpan = document.createElement("span");
        this.miliSpan = document.createElement("span");
        this.minSpan.textContent = "00";
        this.secSpan.textContent = "00";
        this.miliSpan.textContent = "00";
        container.append(this.minSpan, this.secSpan, this.miliSpan);
    }
    changeTime() {
        this.milisec++;
        if (this.milisec === 10) {
            this.milisec = 0;
            this.sec++;
        }
        if (this.sec === 60) {
            this.sec = 0;
            this.min++;
        }
        this.display();
    }
    display() {
        this.minSpan.textContent = this.min.toString().padStart(2, "00");
        this.secSpan.textContent = this.sec.toString().padStart(2, "00");
        this.miliSpan.textContent = this.milisec.toString();
    }
    start() {
        if (this.interval !== null)
            return;
        this.interval = window.setInterval(() => {
            this.changeTime();
        }, 100);
    }
    stop() {
        if (this.interval !== null)
            clearInterval(this.interval);
        this.interval = null;
    }
}
// initialisation d un chrono
const monChrono = new Chrono();
monChrono.init(container);
startBtn.addEventListener("click", () => {
    monChrono.start();
});
stopBtn.addEventListener("click", () => {
    monChrono.stop();
});
