import LoadingView from './loadingView';
import TimerView from './timerView';
import FormView from './formView';
import TaskView from './taskView';
import DataAggregatorView from './dataAggregatorView';

class View {
  constructor() {
    this.loadingView = new LoadingView();
    this.timerView = new TimerView();
    this.formView = new FormView();
    this.taskView = new TaskView();
    this.dataAggregatorView = new DataAggregatorView();
  }
}

export default View;
