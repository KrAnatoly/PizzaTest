import {ALL_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, SORT_NAME, SORT_BIRTHDAY, SORT_ROLE, SORT_ARCHIVE} from './employeesAT';
import moment from 'moment';

const employeesReducer = (state = { employees: [], sortByArchive:[], sortByRole:[] }, action) => {
    switch (action.type) {
      case ALL_EMPLOYEES:
        return {...state, employees: action.payload }
      case ADD_EMPLOYEE:
        return { ...state, employees: [action.payload, ...state.employees] };
      case UPDATE_EMPLOYEE:
        console.log(+action.payload.id)
        return { ...state, employees: [...state.employees.map(el => (el.id == action.payload.id) ? action.payload : el )] };
      case SORT_NAME:
        return { ...state, employees: action.payload.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          }) }
      case SORT_BIRTHDAY:
            return { ...state, employees: action.payload.sort((a, b) => moment(a.birthday, 'DD.MM.YYYY') - moment(b.birthday, 'DD.MM.YYYY')) }
      case SORT_ROLE:      
        return { ...state, sortByRole: state.employees.filter(el => el.role === action.payload)}
        case SORT_ARCHIVE:
          return { ...state, sortByArchive: state.employees.filter(el => el.isArchive !== action.payload)}
      default:
        return state;
    }
  };
  export default employeesReducer;