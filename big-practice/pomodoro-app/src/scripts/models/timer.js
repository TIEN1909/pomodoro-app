import { POMODORO_TIMES, LIST_CURRENT_TIMER, RADIX_DECIMAL, TIMER_DEFAULT_TIMES } from '../constant/index';

const { POMODORO_MODE } = LIST_CURRENT_TIMER;
const { WORK_ONE_POMODORO_MINUTES } = POMODORO_TIMES;

class TimerModel {
  constructor() {
    this.minutes = WORK_ONE_POMODORO_MINUTES;
    this.currentTimer = POMODORO_MODE;
    this.seconds = 0;
    this.isRunning = false;
    this.timer = null;
    this.onTimerComplete = null;
  }

  /**
   * Get the default time for the current timer mode.
   * @returns {string} The default time in the 'MM:SS' format.
   */
  getDefaultTime() {
    return TIMER_DEFAULT_TIMES[this.currentTimer];
  }

  /**
   * Starts the timer with the default time for the current timer type.
   */
  startTimer() {
    this.isRunning = true;
    const defaultTime = this.getDefaultTime();
    const [minutes, seconds] = defaultTime.split(':');
    this.minutes = parseInt(minutes, RADIX_DECIMAL);
    this.seconds = parseInt(seconds, RADIX_DECIMAL);
  }

  /**
   * Pauses the timer.
   */
  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timer);
  }

  /**
   * Resets the timer to the default time for the current timer type.
   */
  resetTimer() {
    this.isRunning = false;
    clearInterval(this.timer);
    this.minutes = parseInt(this.getDefaultTime().split(':')[0], RADIX_DECIMAL);
    this.seconds = 0;
  }

  /**
   * Updates the timer by decrementing the seconds and minutes.
   * When the timer reaches zero, it pauses and triggers the onTimerComplete callback.
   */
  updateTimer() {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.pauseTimer();
        this.isRunning = false;
        // Check if an `onTimerComplete` callback function is defined and call it
        if (this.onTimerComplete) {
          this.onTimerComplete();
        }
        return;
      }
      // Reset seconds to 59 and decrement minutes
      this.seconds = 59;
      this.minutes -= 1;
    } else {
      // Decrement the seconds
      this.seconds -= 1;
    }
  }

  /**
   * Sets the current timer type.
   * @param {string} timerType - The timer type ('pomodoro', 'short-break', 'long-break').
   */
  setCurrentTimer(timerType) {
    this.currentTimer = timerType;
  }
}

export default TimerModel;
