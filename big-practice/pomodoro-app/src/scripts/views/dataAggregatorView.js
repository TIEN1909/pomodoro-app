import { POMODORO_TIMES } from '../constant/index';

const { ONE_HOUR_IN_MINUTE, MINUTE_IN_MILLISECONDS } = POMODORO_TIMES;

class DataAggregatorView {
  constructor() {
    this.dataAggregatorElement = document.querySelector('.data-aggregator');
    this.actPomsElement = document.querySelector('.actual-pomofocus');
    this.estPomsElement = document.querySelector('.estimate-pomofocus');
    this.dataTimeElement = document.querySelector('.data-time');
    this.hourDataElement = document.querySelector('.hour-data');

    this.dataAggregatorElement.classList.add('hidden');
  }

  renderDataAggregators(actualAndEstimatePomodoro, listFinishAt) {
    const [actualPomodoro, estimatePomodoro] = actualAndEstimatePomodoro;

    if (estimatePomodoro) {
      this.dataAggregatorElement.classList.remove('hidden');
      this.actPomsElement.textContent = actualPomodoro;
      this.estPomsElement.textContent = estimatePomodoro;
      this.getTimes(listFinishAt);
    } else {
      this.dataAggregatorElement.classList.add('hidden');
    }
  }

  /**
   *
   * @param {number} listFinishAt - Estimated finish time duration in milliseconds.
   */
  getTimes(listFinishAt) {
    const currentTime = new Date();

    // Calculate the Pomodoro end time based on the current time and finishAt duration.
    const pomodoroEndTime = new Date(currentTime.getTime() + listFinishAt);

    // Extract the hour and minute components from the calculated time.
    const pomodoroEndHour = pomodoroEndTime.getHours();
    const pomodoroEndMinute = pomodoroEndTime.getMinutes();

    // Display the estimated finish time in HH:MM format.
    this.dataTimeElement.textContent = `${pomodoroEndHour < 10 ? '0' : ''}
        ${pomodoroEndHour}:${pomodoroEndMinute < 10 ? '0' : ''}${pomodoroEndMinute}`;

    // Display the estimated duration in hours (e.g., 1.5h).
    const durationInHours = listFinishAt / (MINUTE_IN_MILLISECONDS * ONE_HOUR_IN_MINUTE);
    const formattedDuration = durationInHours.toFixed(1);
    this.hourDataElement.textContent = `(${formattedDuration}h)`;
  }
}

export default DataAggregatorView;
