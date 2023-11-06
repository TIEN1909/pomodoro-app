import ApiService from '../services/apiService';

class TaskModel {
  constructor() {
    this.apiService = new ApiService('/tasks');
  }

  /**
   * Get a list of tasks from the API.
   * @returns {Promise} Promise that returns a list of tasks.
   */
  getTaskList = () => this.apiService.getList();

  /**
   * Get detailed information about a task based on its ID.
   * @param {number} id - The ID of the task to retrieve detailed information.
   * @returns {Promise} Promise that returns detailed information about the task.
   */
  getTaskDetail = id => this.apiService.getTaskDetail(id);

  /**
   * Add a new task to the system.
   * @param {object} task - The task object to be added.
   * @returns {Promise} Promise that returns the result of adding the task.
   */
  addTask = async task => await this.apiService.postTask(task);

  /**
   * Update information about a task based on its ID.
   * @param {object} task - The task object to be updated.
   * @param {number} task.id - The ID of the task to be updated.
   * @returns {Promise} Promise that returns the result of updating the task.
   */
  updateTask = async task => await this.apiService.updateTask(task.id, task);

  /**
   * Delete a task based on its ID.
   * @param {number} taskId - The ID of the task to be deleted.
   * @returns {Promise} Promise that returns the result of deleting the task.
   */
  deleteTask = async taskId => await this.apiService.deleteTask(taskId);

  toggleTaskCompleted = async (taskId, isCompleted) => {
    try {
      const updatedTask = {
        id: taskId,
        isCompleted: isCompleted
      };

      await this.updateTask(updatedTask);
    } catch (error) {
      console.error('Error:', error);
    }
  };
}

export default TaskModel;
