/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm';
import EmployeeItem from '../EmployeeItem/EmployeeItem';
import {
  SORT_NAME, SORT_BIRTHDAY, SORT_ROLE, SORT_ARCHIVE,
} from '../reducers/employeesAT';

function Mainpage() {
  const dispatch = useDispatch();
  const { employees, sortByArchive, sortByRole } = useSelector((store) => store.employeesState);
  console.log(employees);
  const [editIn, setEditIn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [choseFilter, setChoseFilter] = useState('none');
  function addEmpl() {
    setEditIn((prev) => !prev);
  }
  function nameSort() {
    dispatch({ type: SORT_NAME, payload: employees });
  }
  function bithDaySort() {
    dispatch({ type: SORT_BIRTHDAY, payload: employees });
  }
  function roleSort(e) {
    if (e.target.value === 'none') {
      setChoseFilter('none');
    } else {
      setChoseFilter('role');
      dispatch({ type: SORT_ROLE, payload: e.target.value });
    }
  }
  function sortArchive() {
    setChecked((prev) => !prev);
    setChoseFilter('archive');
    dispatch({ type: SORT_ARCHIVE, payload: checked });
  }
  return (
    <div className="main-gallery">
      <div className="button-gallery">
        <button type="button" onClick={() => nameSort()}>Сортировка по имени</button>
        <button type="button" onClick={() => bithDaySort()}>Сортировка по дате рождения</button>
        <div>
          <label htmlFor="form">Сортировка по должности</label>
          <select className="select-css" onChange={roleSort} name="role" id="form">
            <option value="none">Выберите должность</option>
            <option value="cook">Повар</option>
            <option value="waiter">Официант</option>
            <option value="driver">Водитель</option>
          </select>
        </div>
        <div>
          <input type="checkbox" className="checkbox" onChange={() => sortArchive()} name="isArchived" id="isArchived" />
          <label htmlFor="isArchived">В архиве</label>
        </div>
        <button type="button" onClick={() => setChoseFilter('none')}>Сбросить фильтры</button>
      </div>
      <div className="employees-gallery">
        {
          (choseFilter === 'none') ? (employees && employees.map((employee) => <EmployeeItem key={employee.id} employee={employee} />))
            : (choseFilter === 'role') ? (sortByRole.map((employee) => <EmployeeItem key={employee.id} employee={employee} />))
              : (sortByArchive && sortByArchive.map((employee) => <EmployeeItem key={employee.id} employee={employee} />))
        }
      </div>
      <div className="add-employee">
        <button type="button" onClick={() => addEmpl()}>Добавить сотрудника</button>
        <div className="form-div">{editIn && <AddEmployeeForm />}</div>
      </div>
    </div>
  );
}

export default Mainpage;
