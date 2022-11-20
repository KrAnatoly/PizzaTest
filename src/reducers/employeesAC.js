import {ALL_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE} from './employeesAT';

export function allEmployeesAC(payload) {
    return {
      type: ALL_EMPLOYEES,
      payload
    };
  }

export function addEmployeeAC(payload) {
    return {
      type: ADD_EMPLOYEE,
      payload
    };
  }

  export function updEmployeeAC(payload) {
    return {
      type: UPDATE_EMPLOYEE,
      payload
    };
  }