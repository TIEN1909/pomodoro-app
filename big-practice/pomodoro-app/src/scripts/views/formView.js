import { helpers } from '../helpers/index';

class FormView {
  constructor() {
    this.taskFormElement = document.querySelector('.form-add-task');
    this.btnAddTaskElement = document.querySelector('.btn-add-task');
    this.btnCancelElement = document.querySelector('.btn-cancel');
    this.btnDeleteElement = document.querySelector('.btn-delete');
    this.taskInputElement = document.querySelector('.task-input');
    this.btnIncreaseElement = document.querySelector('.btn-increase');
    this.btnDecreaseElement = document.querySelector('.btn-decrease');
    this.estPomodoroInputElement = document.querySelector('.estimate-pomodoro');
    this.actPomodoroInputElement = document.querySelector('.actual-pomodoro');
    this.actualTimeElement = document.querySelector('.actual-time');
    this.slashElement = document.querySelector('.slash');
    this.actualTimeElement.classList.add('hidden');
    this.taskFormElement.classList.add('hidden');
  }

  // Function to toggle the display of the task form.
  toggleTaskForm() {
    this.btnAddTaskElement.addEventListener('click', () => {
      helpers.dom.toggleDisplay(this.taskFormElement, this.btnAddTaskElement);
      this.slashElement.classList.add('hidden');
      this.actPomodoroInputElement.classList.add('hidden');
      this.btnDeleteElement.classList.add('visibility');
      const showForm = this.taskFormElement.classList.contains('hidden');

      if (this.taskInputElement.value !== '' && showForm) {
        this.showAlert();
      }
    });

    this.btnCancelElement.addEventListener('click', () => {
      helpers.dom.toggleDisplay(this.taskFormElement, this.btnAddTaskElement);
      const formId = this.taskFormElement.getAttribute('form-id');

      if (this.taskInputElement !== '' && formId !== '') {
        this.btnAddTaskElement.classList.remove('hidden');
        this.showAlert();
      }
    });
  }

  showAlert() {
    confirm('The changes will be lost. Are you sure you want to close it?');
    this.resetInput();
    this.btnAddTaskElement.classList.remove('hidden');
  }

  resetInput() {
    this.taskInputElement.value = '';
    this.estPomodoroInputElement.value = 1;
    this.clickedTaskId = null;
    this.taskFormElement.setAttribute('form-id', '');
  }

  // Function to control the value of the estimated Pomodoros input
  manageEstPomodoroInputValue() {
    this.btnIncreaseElement.addEventListener('click', () => {
      this.estPomodoroInputElement.value = parseFloat(this.estPomodoroInputElement.value) + 1;
    });

    this.btnDecreaseElement.addEventListener('click', () => {
      if (this.estPomodoroInputElement.value > 0) {
        this.estPomodoroInputElement.value = parseFloat(this.estPomodoroInputElement.value) - 1;
      }
    });
    return this.estPomodoroInputElement.value;
  }

  /**
   * Function to handle task submission.
   *
   * @function
   * @param {function} handleSubmitTask - The callback function for task submission.
   */
  submitTask = handleSubmitTask => {
    this.taskFormElement.addEventListener('submit', e => {
      e.preventDefault();
      const task = {
        id: this.taskFormElement.getAttribute('form-id'),
        taskName: this.taskInputElement.value,
        actPomodoro: this.actPomodoroInputElement.value,
        estPomodoro: this.estPomodoroInputElement.value,
        isCompleted: false
      };
      if (task.taskName && task.estPomodoro) {
        if (task.id) {
          handleSubmitTask(task);
          this.taskFormElement.classList.add('hidden');
        } else {
          task.actPomodoro = 0;
          handleSubmitTask(task);
        }
      }

      this.resetInput();
    });
  };

  /**
   * Function to handle task deletion.
   *
   * @function
   * @param {function} handleDeleteTask - The callback function for task deletion.
   */
  deleteTask(handleDeleteTask) {
    this.btnDeleteElement.addEventListener('click', () => {
      const taskId = this.taskFormElement.getAttribute('form-id');

      if (taskId) {
        handleDeleteTask(taskId);
        this.taskFormElement.classList.add('hidden');
        this.resetInput();
      }
    });
  }

  /**
   * Function to render the form with task data.
   *
   * @function
   * @param {object} taskData - The task data to populate the form with.
   */
  renderForm(taskData) {
    if (taskData) {
      const taskNameElement = document.querySelector('.task-input');
      const actPomodoroElement = document.querySelector('.actual-pomodoro');
      const estPomodoroElement = document.querySelector('.estimate-pomodoro');
      taskNameElement.value = taskData.taskName;
      actPomodoroElement.value = taskData.actPomodoro;
      estPomodoroElement.value = taskData.estPomodoro;

      this.taskFormElement.classList.remove('hidden');
    } else {
      this.taskFormElement.classList.remove('hidden');
    }
  }
}
export default FormView;
