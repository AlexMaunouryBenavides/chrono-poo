const startClock = document.getElementById("start")!;
const stopClock = document.getElementById("stop")!;
const minuteSpan = document.getElementById("minute")!;
const secondSpan = document.getElementById("second")!;
const tenthSpan = document.getElementById("tenth")!;

class Chronometre {
  private minute: number = 0;
  private second: number = 0;
  private tenthOfSecond: number = 0;
  private intervalId: number | null = null;

  constructor(
    private minuteSpan: HTMLElement,
    private secondSpan: HTMLElement,
    private tenthSpan: HTMLElement
  ) {}

  private updateDisplay(): void {
    this.minuteSpan.textContent = this.minute.toString().padStart(2, "0");
    this.secondSpan.textContent = this.second.toString().padStart(2, "0");
    this.tenthSpan.textContent = this.tenthOfSecond.toString();
  }

  setStart(): void {
    if (this.intervalId !== null) return;

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

  stop(): void {
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
