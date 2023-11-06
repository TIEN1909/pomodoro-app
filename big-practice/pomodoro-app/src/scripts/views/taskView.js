import TaskTemplate from '../templates/index';

class TaskView {
  constructor() {
    this.taskListElement = document.querySelector('.task-list');
    this.taskFormElement = document.querySelector('.form-add-task');
    this.btnAddTaskElement = document.querySelector('.btn-add-task');
    this.btnDeleteTaskElement = document.querySelector('.btn-delete');
    this.actPomodoroInputElement = document.querySelector('.actual-pomodoro');
    this.slashElement = document.querySelector('.slash');
    this.actualTimeElement = document.querySelector('.actual-time');
    this.taskNameSelected = document.querySelector('.task-name-selected');
    this.slashElement.classList.add('hidden');
  }

  /**
   * Function to toggle the visibility of certain elements.
   * @function
   */
  toggleElementVisibility() {
    this.btnAddTaskElement.classList.remove('hidden');
    this.taskFormElement.classList.add('hidden');
    this.btnDeleteTaskElement.classList.remove('visibility');
  }

  /**
   * Function to render the task list.
   * @function
   * @param {Array} newTasks - An array of new tasks to render.
   * @param {Function} renderForm - The callback function to render the task form.
   */
  renderTasks = async (newTasks, renderForm, checkedTaskCompleted, handleTaskCompleted) => {
    const taskData = await newTasks;
    this.taskListElement.innerHTML = '';
    taskData.forEach(newTask => {
      const taskTemplate = TaskTemplate.renderTask(newTask);
      this.taskListElement.innerHTML += taskTemplate;
    });

    this.handleCheckedTaskCompleted(checkedTaskCompleted, this.taskListElement);
    this.toggleCheckedTaskCompleted(this.taskListElement, taskData, handleTaskCompleted);

    this.taskListElement.addEventListener('click', e => {
      this.actPomodoroInputElement.classList.remove('hidden');
      this.slashElement.classList.remove('hidden');
      const taskElement = e.target.closest('.task-item');
      const taskSelectedValue = taskElement.querySelector('.task-name');

      const taskId = taskElement.getAttribute('data-id');

      const btnShowTask = e.target.matches('.btn-show-task, .icon-more');
      const iconCheckedElement = e.target.closest('.icon-checked');

      if (taskElement && !btnShowTask && !iconCheckedElement) {
        this.handleSelectedTask(e.target);
        this.taskNameSelected.textContent = taskSelectedValue.textContent;
      }

      if (btnShowTask) {
        this.btnDeleteTaskElement.classList.remove('visibility');
        this.actualTimeElement.classList.remove('hidden');
        const taskNameValue = taskElement.querySelector('.task-name').textContent;
        const actValue = taskElement.querySelector('.task-actual').textContent;
        const estValue = taskElement.querySelector('.task-estimate').textContent;

        this.taskFormElement.setAttribute('form-id', taskId);
        renderForm({ taskName: taskNameValue, actPomodoro: actValue, estPomodoro: estValue });
        this.toggleElementVisibility();

        setTimeout(() => {
          this.taskFormElement.classList.remove('hidden');
          this.btnAddTaskElement.classList.add('top');
        }, 100);
      }
    });
  };

  findSiblings = el => {
    return [...el.parentNode.children].filter(child => child !== el);
  };

  handleSelectedTask = target => {
    const taskItemElement = target.closest('.task-item');
    if (taskItemElement !== null) {
      taskItemElement.classList.add('focus');

      const sibLings = this.findSiblings(taskItemElement);
      sibLings.forEach(sibLing => {
        sibLing.classList.remove('focus');
      });
    }
  };

  handleCheckedTaskCompleted = async (checkedTaskCompleted, taskListElement) => {
    const checkedTask = await checkedTaskCompleted;

    const completedTasks = checkedTask.filter(task => task.isCompleted);

    completedTasks.forEach(task => {
      const taskId = task.id;

      const taskItem = taskListElement.querySelector(`.task-item[data-id="${taskId}"]`);

      if (taskItem) {
        taskItem.classList.toggle('completed');
      }
    });
  };

  toggleCheckedTaskCompleted = (taskListElement, taskData, handleTaskCompleted) => {
    const iconCheckedElements = taskListElement.querySelectorAll('.icon-checked');

    iconCheckedElements.forEach(iconCheckedElement => {
      iconCheckedElement.addEventListener('click', e => {
        const taskItem = e.target.closest('.task-item');
        const taskId = taskItem.getAttribute('data-id');
        const taskObject = taskData.find(task => task.id === +taskId);

        if (taskObject) {
          taskObject.isCompleted = !taskObject.isCompleted;
          if (handleTaskCompleted) {
            handleTaskCompleted(taskObject);
          }
        }
      });
    });
  };
}

export default TaskView;
