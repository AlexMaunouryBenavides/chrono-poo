"use strict";
const startClock = document.getElementById("start");
const stopClock = document.getElementById("stop");
const minuteSpan = document.getElementById("minute");
const secondSpan = document.getElementById("second");
const tenthSpan = document.getElementById("tenth");
class Chronometre {
    constructor(minuteSpan, secondSpan, tenthSpan) {
        this.minuteSpan = minuteSpan;
        this.secondSpan = secondSpan;
        this.tenthSpan = tenthSpan;
        this.minute = 0;
        this.second = 0;
        this.tenthOfSecond = 0;
        this.intervalId = null;
    }
    updateDisplay() {
        this.minuteSpan.textContent = this.minute.toString().padStart(2, "0");
        this.secondSpan.textContent = this.second.toString().padStart(2, "0");
        this.tenthSpan.textContent = this.tenthOfSecond.toString();
    }
    setStart() {
        if (this.intervalId !== null)
            return;
        this.intervalId = window.setInterval(() => {
            this.tenthOfSecond++;
            if (this.tenthOfSecond === 10) {
                this.tenthOfSecond = 0;
                this.second++;
            }
            if (this.second === 60) {
                this.second = 0;
                this.minute++;
            }
            this.updateDisplay();
        }, 100); // 100ms = 1/10 de seconde
    }
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
const chrono = new Chronometre(minuteSpan, secondSpan, tenthSpan);
startClock.addEventListener("click", () => {
    chrono.setStart();
});
stopClock.addEventListener("click", () => {
    chrono.stop();
});
