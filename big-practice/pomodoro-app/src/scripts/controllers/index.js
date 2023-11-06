import {
  LIST_CURRENT_TIMER,
  POMODORO_TIMES,
  START_BUTTON_TEXT,
  PAUSE_BUTTON_TEXT,
  TIMER_DEFAULT_TIMES
} from '../constant/index';

const { POMODORO_MODE, SHORT_BREAK_MODE, LONG_BREAK_MODE } = LIST_CURRENT_TIMER;
const { WORK_ONE_POMODORO_MINUTES, BREAK_SHORT_MINUTES, BREAK_LONG_MINUTES, MINUTE_IN_MILLISECONDS } = POMODORO_TIMES;

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.TaskModel = this.model.taskModel;
    this.timerModel = this.model.timerModel;
    this.timer = null;
    this.currentMode = POMODORO_MODE;
    this.pomodoroCount = 0;
  }

  initTimerView() {
    this.view.timerView.bindStartButton(this.handleStartTimer.bind(this));
    this.view.timerView.bindResetButton(this.handleResetTimer.bind(this));
    this.view.timerView.bindPomodoroButton(this.handlePomodoroTimer.bind(this));
    this.view.timerView.bindShortBreakButton(this.handleShortBreakTimer.bind(this));
    this.view.timerView.bindLongBreakButton(this.handleLongBreakTimer.bind(this));
    this.view.timerView.updateTimerDisplay(TIMER_DEFAULT_TIMES[POMODORO_MODE]);
    this.view.timerView.updateStartButtonText(START_BUTTON_TEXT);
    this.view.timerView.nextBreakTime(this.handleNextBreak.bind(this));
  }

  initFormView() {
    this.view.timerView.handleSwitchMode();
    this.view.formView.toggleTaskForm();
    this.view.formView.submitTask(this.handleSubmitTask.bind(this));
    this.view.formView.manageEstPomodoroInputValue();
  }

  initTaskView() {
    this.view.taskView.renderTasks(
      this.TaskModel.getTaskList(),
      this.handleRenderForm.bind(this),
      this.checkedTaskCompleted(),
      this.handleTaskCompleted.bind(this),
      this.handelRenderDataAggregator()
    );
    this.view.formView.deleteTask(this.handleDeleteTask.bind(this));
  }

  /**
   * Handles the submission of a task, either by updating an existing task or adding a new one.
   * @param {object} task - The task object to be updated or added.
   */
  handleSubmitTask = async task => {
    if (task.id) {
      try {
        const existingTask = await this.TaskModel.getTaskDetail(task.id);
        task.isCompleted = existingTask.isCompleted;

        await this.TaskModel.updateTask(task);
        this.handelRenderDataAggregator();
        this.initTaskView();
      } catch (error) {
        console.log('error', error);
      }
    } else {
      const newTask = { id: window.crypto.randomUUID(), ...task };
      try {
        await this.TaskModel.addTask(newTask);
        this.handelRenderDataAggregator();
        this.initTaskView();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  handleRenderForm(taskData) {
    const tasksData = taskData;
    this.view.formView.renderForm(tasksData);
  }

  getEstAndActPomodoro = async () => {
    const tasks = await this.TaskModel.getTaskList();

    let estimatePomodoro = 0;
    let actualPomodoro = 0;

    tasks.forEach(task => {
      actualPomodoro += parseInt(task.actPomodoro);
      estimatePomodoro += parseInt(task.estPomodoro);
    });

    return [actualPomodoro, estimatePomodoro];
  };

  getTotalUnfinishedPomodoro = async () => {
    try {
      const [actualPomodoro, estimatePomodoro] = await this.getEstAndActPomodoro();

      let totalUnfinishedPomodoro = estimatePomodoro;

      if (actualPomodoro >= estimatePomodoro) {
        totalUnfinishedPomodoro -= actualPomodoro;
      }

      return totalUnfinishedPomodoro;
    } catch (error) {
      console.error('An error occurred:', error);
      return 0;
    }
  };

  /**
   * Calculate and render aggregated data.
   */
  handelRenderDataAggregator = async () => {
    try {
      const [actualAndEstimatePomodoro, listFinishAt] = await Promise.all([
        this.getEstAndActPomodoro(),
        this.calculateListTaskFinishAt(this.getEstAndActPomodoro())
      ]);
      console.log(actualAndEstimatePomodoro, 'actualAndEstimatePomodoro');
      this.view.dataAggregatorView.renderDataAggregators(actualAndEstimatePomodoro, listFinishAt);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  /**
   * Calculates the estimated time when a list of tasks will finish, based on the total number of finished Pomodoros.
   * @returns {number} The estimated finish time in milliseconds.
   */
  calculateListTaskFinishAt = async () => {
    const totalUnfinishedPomodoro = await this.getTotalUnfinishedPomodoro();

    console.log(totalUnfinishedPomodoro, 'totalUnfinishedPom');

    // If no Pomodoros have been finished, return 0.
    if (totalUnfinishedPomodoro <= 0) {
      return 0;
    }

    // Calculate the total time spent on short breaks between Pomodoros.
    const totalShortBreakTime = (totalUnfinishedPomodoro - 1) * BREAK_SHORT_MINUTES;

    console.log(totalShortBreakTime, 'totalShortBreakTime');

    // Calculate the number of long breaks based on the Pomodoros completed.
    const breaksBeforeLongBreak = Math.floor((totalUnfinishedPomodoro - 1) / 4);

    console.log(breaksBeforeLongBreak, 'breaksBeforeLongBreak');

    // Calculate the total time spent on long breaks.
    const totalLongBreakTime = breaksBeforeLongBreak * (BREAK_LONG_MINUTES - BREAK_SHORT_MINUTES);

    console.log(totalLongBreakTime, 'totalLongBreakTime');

    // Define the duration of a single Pomodoro.
    const pomodoroTime = WORK_ONE_POMODORO_MINUTES;

    console.log(pomodoroTime, 'pomodoroTime');

    // Calculate the estimated finish time based on the cumulative Pomodoro and break times.
    const listFinishAt = totalUnfinishedPomodoro * pomodoroTime + totalShortBreakTime + totalLongBreakTime;
    // Convert the estimated finish time to milliseconds.
    return listFinishAt * MINUTE_IN_MILLISECONDS;
  };

  handleDeleteTask = async id => {
    try {
      await this.TaskModel.deleteTask(id);
      this.view.taskView.renderTasks(this.TaskModel.getTaskList());
      this.handelRenderDataAggregator();
    } catch (error) {
      console.log('error', error);
    }
  };

  /**
   * Handles the start/pause button click event for the timer.
   * If the timer is running, it pauses the timer; otherwise, it starts a new timer.
   */
  handleStartTimer() {
    if (!this.timerModel) return;
    if (this.timerModel.isRunning) {
      this.pauseTimer();
      this.view.timerView.updateStartButtonText(START_BUTTON_TEXT);
    } else {
      this.timerModel.onTimerComplete = () => {
        this.view.timerView.updateStartButtonText(START_BUTTON_TEXT);
      };

      clearInterval(this.timer);

      const defaultTime = this.timerModel.getDefaultTime();

      this.timerModel.startTimer();
      this.view.timerView.updateStartButtonText(PAUSE_BUTTON_TEXT);
      this.view.timerView.updateTimerDisplay(defaultTime);

      this.timer = setInterval(() => this.updateTimer(), 1000);
    }
  }

  /**
   * Handles the transition to the next break time based on the current mode.
   * This function adjusts the timer mode and starts the corresponding timer (Pomodoro, Short Break, or Long Break).
   * @returns {string} The new break time mode ('pomodoro', 'short-break', 'long-break').
   */
  handleNextBreak() {
    if (this.currentMode === POMODORO_MODE) {
      // Increment the Pomodoro count
      this.pomodoroCount++;

      if (this.pomodoroCount >= 4) {
        // If 4 Pomodoros have been completed, switch to a long break and reset the count
        this.handleLongBreakTimer();
        this.pomodoroCount = 0;
      } else {
        // If fewer than 4 Pomodoros have been completed, switch to a short break
        this.handleShortBreakTimer();
      }
    } else if (this.currentMode === SHORT_BREAK_MODE || this.currentMode === LONG_BREAK_MODE) {
      // If in short break or long break mode, switch to Pomodoro
      this.handlePomodoroTimer();
    }

    this.view.timerView.updateStartButtonText(START_BUTTON_TEXT);
    this.currentMode = this.timerModel.currentTimer;

    return this.currentMode;
  }

  /**
   * Resets the timer to its default time and updates the button text.
   */
  handleResetTimer() {
    if (this.timerModel.isRunning) {
      this.pauseTimer();
    }
    this.timerModel.resetTimer();
    this.view.timerView.updateStartButtonText(START_BUTTON_TEXT);
    this.view.timerView.updateTimerDisplay(this.timerModel.getDefaultTime());
  }

  pauseTimer() {
    this.timerModel.pauseTimer();
    clearInterval(this.timer);
  }

  /**
   * Handles the click event for the Pomodoro timer button.
   * Sets the current timer type to 'pomodoro' and resets the timer.
   */
  handlePomodoroTimer() {
    this.timerModel.setCurrentTimer(POMODORO_MODE);
    this.handleResetTimer();
  }

  /**
   * Handles the click event for the Short Break timer button.
   * Sets the current timer type to 'short-break' and resets the timer.
   */
  handleShortBreakTimer() {
    this.timerModel.setCurrentTimer(SHORT_BREAK_MODE);
    this.handleResetTimer();
  }

  /**
   * Handles the click event for the Long Break timer button.
   * Sets the current timer type to 'long-break' and resets the timer.
   */
  handleLongBreakTimer() {
    this.timerModel.setCurrentTimer(LONG_BREAK_MODE);
    this.handleResetTimer();
  }

  /**
   * Updates the timer display every second and triggers actions when the timer completes.
   */
  updateTimer() {
    const { timerModel, timer } = this;

    if (!timerModel || !timer) return;

    // Update the timerModel's state and check if the timer has completed.
    const isTimerComplete = timerModel.updateTimer();

    // Get the current minutes and seconds from timerModel.
    const { minutes, seconds } = timerModel;

    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    const displayText = `${displayMinutes}:${displaySeconds}`;

    this.view.timerView.updateTimerDisplay(displayText);

    // If the timer is complete, pause the timer and handle the end event.
    if (isTimerComplete) {
      timerModel.pauseTimer();
      this.view.timerView.updateStartButtonText(START_BUTTON_TEXT);
    }
  }

  handleTaskCompleted = async taskObject => {
    const taskId = taskObject.id;
    const isCompleted = taskObject.isCompleted;

    try {
      await this.TaskModel.toggleTaskCompleted(taskId, isCompleted);
      this.initTaskView();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  checkedTaskCompleted = async () => {
    const listTask = await this.TaskModel.getTaskList();
    return listTask;
  };

  initHome() {
    this.initTimerView();
    this.initFormView();
    this.initTaskView();
  }
}

export default Controller;
