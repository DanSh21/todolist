import { FETCH_AUTH, FETCH_AUTH_ERROR, FETCH_TASKS, FETCH_TASKS_ERROR, SIGN_OUT, FETCH_TOTAL_TASKS, FETCH_ADD_TASK_ERROR, FETCH_ADD_TASK_PENDING, FETCH_ADD_TASK_SUCCESS, FETCH_EDIT_TASK_ERROR, FETCH_EDIT_TASK_PENDING, FETCH_EDIT_TASK_SUCCESS, NEW_TOKEN } from './actions';

export const initialState = {
  token: null,
  total: 0,
  tasks: []
}

export function todo(state = initialState, action) {
  // console.log('STATe', state);
  // console.log('STATe', action);
  switch (action.type) {
    case FETCH_AUTH:
      return {
        ...state,
        token: action.token
      }
    case FETCH_AUTH_ERROR:
      return {
        ...state,
        authError: action.error
      }
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.tasks
      }
    case FETCH_TOTAL_TASKS:
      return {
        ...state,
        totalTasks: action.totalTasks
      }
    case FETCH_TASKS_ERROR:
      return {
        ...state,
        taskError: action.error
      }
    case FETCH_ADD_TASK_ERROR:
      return {
        ...state,
        addTaskError: action.error,
      }
    case FETCH_ADD_TASK_PENDING:
      return {
        ...state,
        addTaskError: null,
        addTaskPending: true
      }
    case FETCH_ADD_TASK_SUCCESS:
      return {
        ...state,
        addTaskPending: false
      }
    case FETCH_EDIT_TASK_ERROR:
      return {
        ...state,
        editTaskError: action.error,
      }
    case FETCH_EDIT_TASK_PENDING:
      return {
        ...state,
        editTaskError: null,
        editTaskPending: true
      }
    case FETCH_EDIT_TASK_SUCCESS:
      return {
        ...state,
        editTaskPending: false
      }
    case SIGN_OUT:
      return {
        ...state,
        token: null
      }
    case NEW_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state;
  }
}