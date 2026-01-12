"use strict";
// method pour creer mon chrono dans le dom
// method pour gerer le timer
// method start mon chrono
// method pour stop le chrono
// methode pour reset le chrono
const container = document.getElementById("chrono-container");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
class Chrono {
    constructor() {
        this.min = 0;
        this.sec = 0;
        this.milisec = 0;
        this.interval = null;
    }
    init(container) {
        const createCounter = (labelText, value) => {
            const div = document.createElement("div");
            div.className = "container-span";
            const label = document.createElement("label");
            label.textContent = labelText;
            const span = document.createElement("span");
            span.textContent = value.toString();
            div.appendChild(label);
            div.appendChild(span);
            container.appendChild(div);
            return span;
        };
        this.minSpan = createCounter("Min", "00");
        this.secSpan = createCounter("Sec", "00");
        this.miliSpan = createCounter("Mili", "0");
    }
    display() {
        this.minSpan.textContent = this.min.toString().padStart(2, "00");
        this.secSpan.textContent = this.sec.toString().padStart(2, "00");
        this.miliSpan.textContent = this.milisec.toString();
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
    reset() {
        this.min = 0;
        this.sec = 0;
        this.milisec = 0;
        this.display();
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
resetBtn.addEventListener("click", () => {
    monChrono.stop();
    monChrono.reset();
});
