const startClock = document.getElementById("start")!;
const stopClock = document.getElementById("stop")!;
const hourSpan = document.getElementById("hour")!;
const minuteSpan = document.getElementById("minute")!;
const secondSpan = document.getElementById("second")!;

class Chronometre {
  private hour: number = 0;
  private minute: number = 0;
  private second: number = 0;
  private intervalId: number | null = null;

  constructor(
    private hourSpan: HTMLElement,
    private minuteSpan: HTMLElement,
    private secondSpan: HTMLElement
  ) {}
  getHour(): number {
    return this.hour;
  }

  getMinute(): number {
    return this.minute;
  }

  getSecond(): number {
    return this.second;
  }
  private updateDisplay(): void {
    this.hourSpan.textContent = this.hour.toString().padStart(2, "0");
    this.minuteSpan.textContent = this.minute.toString().padStart(2, "0");
    this.secondSpan.textContent = this.second.toString().padStart(2, "0");
  }
  setStart(): void {
    if (this.intervalId !== null) return; // évite de démarrer plusieurs fois

    this.intervalId = window.setInterval(() => {
      this.second++;

      if (this.second === 60) {
        this.second = 0;
        this.minute++;
      }

      if (this.minute === 60) {
        this.minute = 0;
        this.hour++;
      }

      this.updateDisplay();
    }, 1000);
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

const chrono = new Chronometre(hourSpan, minuteSpan, secondSpan);

startClock.addEventListener("click", () => {
  chrono.setStart();
});

stopClock.addEventListener("click", () => {
  chrono.stop();
});
