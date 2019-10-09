import axios from 'axios';

export const FETCH_AUTH = 'FETCH_AUTH';
export const FETCH_AUTH_ERROR = 'FETCH_AUTH_ERROR';
export const FETCH_TASKS = 'FETCH_TASKS';
export const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR';
export const FETCH_ADD_TASK_PENDING = 'FETCH_ADD_TASK_PENDING';
export const FETCH_ADD_TASK_SUCCESS = 'FETCH_ADD_TASK_SUCCESS';
export const FETCH_ADD_TASK_ERROR = 'FETCH_ADD_TASK_ERROR';
export const FETCH_EDIT_TASK_PENDING = 'FETCH_EDIT_TASK_PENDING';
export const FETCH_EDIT_TASK_SUCCESS = 'FETCH_EDIT_TASK_SUCCESS';
export const FETCH_EDIT_TASK_ERROR = 'FETCH_EDIT_TASK_ERROR';
export const FETCH_TOTAL_TASKS = 'FETCH_TOTAL_TASKS';
export const SIGN_OUT = 'SIGN_OUT';
export const NEW_TOKEN = 'NEW_TOKEN';

export function fetchAuth(token) {
  return {
	type: FETCH_AUTH,
	token: token
  }
}

export function fetchAuthError(error) {
	return {
		type: FETCH_AUTH_ERROR,
		error: error
	}
}

export function clearToken() {
	return {
		type: SIGN_OUT
	}
}

export function fetchTasks(tasks) {
	return {
		type: FETCH_TASKS,
		tasks: tasks
	}
}

export function fetchTasksError(error) {
	return {
		type: FETCH_TASKS_ERROR,
		tasksError: error
	}
}

export function fetchAddTaskPending() {
	return {
		type: FETCH_ADD_TASK_PENDING
	}
}

export function fetchAddTaskSuccess() {
	return {
		type: FETCH_ADD_TASK_SUCCESS
	}
}

export function fetchAddTaskError(error) {
	return {
		type: FETCH_ADD_TASK_ERROR,
		error: error
	}
}

export function fetchEditTaskPending() {
	return {
		type: FETCH_EDIT_TASK_PENDING
	}
}

export function fetchEditTaskSuccess() {
	return {
		type: FETCH_EDIT_TASK_SUCCESS
	}
}

export function fetchEditTaskError(error) {
	return {
		type: FETCH_EDIT_TASK_ERROR,
		error: error
	}
}

export function fetchTotalTasks(total) {
	return {
		type: FETCH_TOTAL_TASKS,
		totalTasks: total
	}
}

export function newToken(token) {
	return {
		type: NEW_TOKEN,
		token: token,
	}
}

const myName = 'Даниил Шарыпов Production'

export function changeToken(token) {
	return dispatch => {
		console.log(token)
		dispatch(newToken(token))
	}
}

export function getAuth(login, pass) {
	return dispatch => {
		console.log(login, pass)
		let bodyFormData = new FormData();
		bodyFormData.set('username', login);
		bodyFormData.set('password', pass);
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url: `https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=${myName}`,
				data: bodyFormData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(res => {
					console.log('Auth', res);
					if (res.error) {
						throw (res.error);
					}
					if (res.data.status === 'error') {
						throw (res.data.message)
					}
					dispatch(fetchAuth(res.data.message.token));
					resolve();
				})
				.catch(error => {
					console.log(error);
					dispatch(fetchAuthError(error));
					resolve();
				})
		})
		
	}
}

export function signOut() {
	return dispatch => {
		dispatch(clearToken());
	}
}

export function getTasks(page, sort_field = 'id', sort_direction = 'asc') {
	return dispatch => {
		return new Promise((resolve, reject) => {
			// console.log(sort_field, sort_direction)
			axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=${myName}&page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`)
				.then(res => {
					// console.log(res)
					if (res.error) {
						throw (res.error);
					}
					dispatch(fetchTasks(res.data.message.tasks))
					dispatch(fetchTotalTasks(res.data.message.total_task_count))
				})
				.catch(error => {
					// console.log(error);
					dispatch(fetchTasksError(error));
					resolve();
				})
		})
	}
}

export function addTask(username, email, text) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			let bodyFormData = new FormData();
			bodyFormData.set('username', username);
			bodyFormData.set('email', email);
			bodyFormData.set('text', text);
			dispatch(fetchAddTaskPending());
			axios({
				method: 'post',
				url: `https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=${myName}`,
				data: bodyFormData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(res => {
					console.log(res)
					if (res.error) {
						throw (res.error);
					}
					if (res.data.status === 'error') {
						throw (res.data.message)
					}
					dispatch(fetchAddTaskSuccess());
					resolve();
				})
				.catch(error => {
					console.log(error);
					dispatch(fetchAddTaskError(error));
					resolve();
				})
		})
	}
} 

export function editTask(id, text, status) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			const { token } = getState().todo;
			console.log(id, text, status)
			let bodyFormData = new FormData();
			bodyFormData.set('text', text);
			bodyFormData.set('status', status);
			bodyFormData.set('token', token);
			console.log(token)
			dispatch(fetchEditTaskPending());
			axios({
				method: 'post',
				url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=${myName}`,
				data: bodyFormData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			})
				.then(res => {
					console.log(res)
					if (res.error) {
						throw (res.error);
					}
					if (res.data.status === 'error') {
						throw (res.data.message)
					}
					dispatch(fetchEditTaskSuccess());
					resolve();
				})
				.catch(error => {
					console.log(error);
					dispatch(fetchEditTaskError(error));
					resolve();
				})
		})
	}
} 
