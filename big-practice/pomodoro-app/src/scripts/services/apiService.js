import API_BASE_URL from '../constant/urls';

class ApiService {
  /**
   * Constructor function for ApiService object.
   * @param {String} path
   */
  constructor(path) {
    this.baseUrl = API_BASE_URL;
    this.path = path;
  }

  /**
   * Send GET HTTP request to retrieve task details.
   * @param {String} id - The ID of the task to retrieve.
   * @returns {Promise<Object>} response from the server containing task details.
   */
  getTaskDetail = id => this.sendRequest(id, 'GET');

  /**
   * Method to return an array of object list
   * @returns {Array}
   */
  getList = () => this.sendRequest(null, 'GET');

  /**
   * Send POST HTTP request.
   * @param {Object} data
   * @returns {Promise<Object>} response from server.
   */
  postTask = data => this.sendRequest(null, 'POST', data);

  /**
   * Send DELETE HTTP request.
   * @param {String} id
   * @returns {Promise<Object>} response from server.
   */
  deleteTask = id => this.sendRequest(id, 'DELETE');

  /**
   * Send PATCH HTTP request.
   * @param {String} id - The ID of the item to be updated.
   * @param {Object} data - The data to update the item with.
   * @returns {Promise<Object>} - The response from the server.
   */
  updateTask = (id, data) => this.sendRequest(id, 'PATCH', data);

  /**
   * Send a request to a specified API endpoint.
   * @param {string|null} id - The ID or identifier for the resource, or null if not applicable.
   * @param {string} method - The HTTP request method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param {object} body - The request body to send as JSON.
   * @returns {Promise} Promise that resolves with the response data if the request is successful, or rejects with an error if it fails.
   * @throws {Error} If the request was not successful.
   */
  sendRequest = async (id, method, body) => {
    const url = `${this.baseUrl}${this.path}${id ? `/${id}` : ''}`;
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Error while sending request');
    }
  };
}

export default ApiService;
