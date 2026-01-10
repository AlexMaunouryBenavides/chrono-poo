// method pour creer mon chrono dans le dom
// method pour gerer le timer
// method start mon chrono
// method pour stop le chrono

const container = document.getElementById("chrono-container") as HTMLElement;
const startBtn = document.getElementById("start") as HTMLElement;
const stopBtn = document.getElementById("stop") as HTMLElement;
class Chrono {
  private min: number = 0;
  private sec: number = 0;
  private milisec: number = 0;
  private interval: number | null = null;

  private minSpan!: HTMLElement;
  private secSpan!: HTMLElement;
  private miliSpan!: HTMLElement;

  constructor() {}

  init(container: HTMLElement): void {
    this.minSpan = document.createElement("span");
    this.secSpan = document.createElement("span");
    this.miliSpan = document.createElement("span");

    this.minSpan.textContent = "00";
    this.secSpan.textContent = "00";
    this.miliSpan.textContent = "00";

    container.append(this.minSpan, this.secSpan, this.miliSpan);
  }
  changeTime(): void {
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
  private display(): void {
    this.minSpan.textContent = this.min.toString().padStart(2, "00");
    this.secSpan.textContent = this.sec.toString().padStart(2, "00");
    this.miliSpan.textContent = this.milisec.toString();
  }
  start(): void {
    if (this.interval !== null) return;
    this.interval = window.setInterval(() => {
      this.changeTime();
    }, 100);
  }
  stop(): void {
    if (this.interval !== null) clearInterval(this.interval);
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
