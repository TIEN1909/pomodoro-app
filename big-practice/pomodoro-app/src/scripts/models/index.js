import TimerModel from './timer';
import TaskModel from './tasks';

class Model {
  constructor() {
    this.timerModel = new TimerModel();
    this.taskModel = new TaskModel();
  }
}

export default Model;
