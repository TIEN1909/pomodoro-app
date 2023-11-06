import { LIST_CURRENT_TIMER } from '../constant/index';

const { POMODORO_MODE, SHORT_BREAK_MODE, LONG_BREAK_MODE } = LIST_CURRENT_TIMER;

class TimerView {
  constructor() {
    this.bodyElement = document.body;
    this.btnPomodoroElement = document.querySelector('.btn-pomodoro');
    this.btnShortBreakElement = document.querySelector('.btn-short-break');
    this.btnLongBreakElement = document.querySelector('.btn-long-break');
    this.btnTimerElement = document.querySelectorAll('.btn-timer');
    this.timerTimeElement = document.querySelector('.timer-time');
    this.btnResetTimeElement = document.querySelector('.btn-reset-time');
    this.btnStartTimeElement = document.querySelector('.btn-start-time');
    this.btnNextTimeElement = document.querySelector('.btn-next-time');
    this.numberPomodoroElement = document.querySelector('.number-pomodoro');
    this.totalPomodoroCount = 1;
  }

  // Function to handle switching between Pomodoro, Short Break, and Long Break modes
  handleSwitchMode() {
    this.btnPomodoroElement.addEventListener('click', e => {
      this.clearButtonAttributes();
      e.target.setAttribute('active', true);
      this.bodyElement.className = POMODORO_MODE;
    });

    this.btnShortBreakElement.addEventListener('click', e => {
      this.clearButtonAttributes();
      e.target.setAttribute('active', true);
      this.bodyElement.className = SHORT_BREAK_MODE;
    });

    this.btnLongBreakElement.addEventListener('click', e => {
      this.clearButtonAttributes();
      e.target.setAttribute('active', true);
      this.bodyElement.className = LONG_BREAK_MODE;
    });
  }

  /**
   * Listens for the "Next Break Time" button click event and invokes the provided handleNextBreak function.
   * @param {function} handleNextBreak - The function to handle the "Next Break Time" button click event.
   */
  nextBreakTime(handleNextBreak) {
    this.btnNextTimeElement.addEventListener('click', () => {
      const modeBreakTime = handleNextBreak();
      this.bodyElement.className = modeBreakTime;
      this.clearButtonAttributes();
      this.setActiveButton(modeBreakTime);
      this.setPomodoroNumber(modeBreakTime);
    });
  }

  /**
   * Sets the active button state based on the break time mode passed.
   * @param {string} modeBreakTime - The break time mode ('pomodoro', 'short-break', 'long-break').
   */
  setActiveButton(modeBreakTime) {
    this.btnPomodoroElement.setAttribute('active', modeBreakTime === POMODORO_MODE);
    this.btnShortBreakElement.setAttribute('active', modeBreakTime === SHORT_BREAK_MODE);
    this.btnLongBreakElement.setAttribute('active', modeBreakTime === LONG_BREAK_MODE);
  }

  setPomodoroNumber(modeBreakTime) {
    if (modeBreakTime === POMODORO_MODE) {
      this.totalPomodoroCount += 1;
      this.numberPomodoroElement.textContent = this.totalPomodoroCount;
    }
  }

  // Clear the 'active' attribute of all time buttons
  clearButtonAttributes() {
    this.btnTimerElement.forEach(button => {
      button.setAttribute('active', false);
    });
  }

  /**
   * Binds a click event handler to the Start button element.
   *
   * @param {Function} handler - The function to be executed when the Start button is clicked.
   */
  bindStartButton(handler) {
    this.btnStartTimeElement.addEventListener('click', handler);
  }

  /**
   * Binds a click event handler to the Reset button element.
   *
   * @param {Function} handler - The function to be executed when the Reset button is clicked.
   */
  bindResetButton(handler) {
    this.btnResetTimeElement.addEventListener('click', handler);
  }

  /**
   * Binds a click event handler to the Pomodoro button element.
   *
   * @param {Function} handler - The function to be executed when the Pomodoro button is clicked.
   */
  bindPomodoroButton(handler) {
    this.btnPomodoroElement.addEventListener('click', handler);
  }

  /**
   * Binds a click event handler to the Short Break button element.
   *
   * @param {Function} handler - The function to be executed when the Short Break button is clicked.
   */
  bindShortBreakButton(handler) {
    this.btnShortBreakElement.addEventListener('click', handler);
  }

  /**
   * Binds a click event handler to the Long Break button element.
   *
   * @param {Function} handler - The function to be executed when the Long Break button is clicked.
   */
  bindLongBreakButton(handler) {
    this.btnLongBreakElement.addEventListener('click', handler);
  }

  /**
   * Updates the displayed timer text on the user interface with the provided text.
   *
   * @param {string} displayText - The text to be displayed as the timer value.
   */
  updateTimerDisplay(displayText) {
    this.timerTimeElement.textContent = displayText;
  }

  /**
   * Updates the text of the Start button on the user interface with the provided text.
   *
   * @param {string} buttonText - The text to be displayed on the Start button.
   */
  updateStartButtonText(buttonText) {
    this.btnStartTimeElement.textContent = buttonText;
  }
}

export default TimerView;
