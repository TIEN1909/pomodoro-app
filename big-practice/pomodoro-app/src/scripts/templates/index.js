import editIcon from '../../assets/icons/icon-edit.png';

class TaskTemplate {
  constructor() {}
  static renderTask = newTask =>
    `<li class="task-item pointer" data-id="${newTask.id}" >
      <div class="task-wrapper task-check">
        <span class="icon-checked">
        </span>
        <p class="task-name">${newTask.taskName}</p>
      </div>
      <div class="task-wrapper">
        <div class="task-item-done">
          <span class="task-actual">${newTask.actPomodoro}</span>
          <span>/</span>
          <span class="task-estimate">${newTask.estPomodoro}</span>
        </div>
        <button class="btn-more btn-show-task border-platinum pointer opacity">
          <img src="${editIcon}" alt="icon more" class="icon-more edit">
        </button>
      </div>
    </li>
    `;
}

export default TaskTemplate;
