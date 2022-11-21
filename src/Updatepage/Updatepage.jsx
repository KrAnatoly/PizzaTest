/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { IMaskInput } from 'react-imask';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { UPDATE_EMPLOYEE } from '../reducers/employeesAT';

function UpdateEmployeeForm() {
  const { employeeId } = useParams();
  const { employees } = useSelector((store) => store.employeesState);
  const [warning, setWarning] = useState(false);
  const [ok, setOk] = useState(false);
  const [updEmployee] = employees.filter((el) => el.id === +employeeId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const inputRef = useRef(null);
  function updateEmployee(e) {
    e.preventDefault();
    const {
      name, role, phone, birthday, isArchive,
    } = e.target;
    if (name.value.trim() !== '' && phone.value.trim() !== '' && birthday.value.trim() !== '' && phone.value.trim().length > 15 && birthday.value.trim().length > 9) {
      const data = {
        id: employeeId,
        name: name.value,
        role: role.value,
        phone: phone.value,
        birthday: birthday.value,
        isArchive: isArchive.checked,
      };
      dispatch({ type: UPDATE_EMPLOYEE, payload: data });
      setOk((prev) => !prev);
      setWarning(false);
    } else setWarning((prev) => !prev);
  }
  return (
    <div className="form-div">
      <form onSubmit={updateEmployee}>
        <input required type="text" name="name" defaultValue={updEmployee && updEmployee.name} placeholder="Имя" />
        <div>
          <label htmlFor="form">Должность</label>
          <select className="select-css" defaultValue={updEmployee && updEmployee.role} name="role" id="form">
            <option value="cook">Повар</option>
            <option value="waiter">Официант</option>
            <option value="driver">Водитель</option>
          </select>
        </div>
        <IMaskInput
          mask="+{7}(000)000-00-00"
          unmask
          ref={ref}
          inputRef={inputRef}
          required
          type="tel"
          name="phone"
          defaultValue={updEmployee && updEmployee.phone}
        />
        <IMaskInput
          mask={Date}
          min={new Date(1900, 0, 1)}
          max={new Date(2020, 0, 1)}
          unmask
          ref={ref}
          inputRef={inputRef}
          required
          type="text"
          name="birthday"
          defaultValue={updEmployee && updEmployee.birthday}
        />
        <div>
          <input type="checkbox" className="checkbox" name="isArchive" id="isArchive" />
          <label htmlFor="isArchive">В архиве</label>
        </div>
        <div className="buttons">
          <button type="submit">Изменить</button>
          <button onClick={() => navigate('/')} type="button">Назад</button>
        </div>
        {warning && <div>Заполните все поля</div>}
        {ok && <div>Данные сотрудника успешно обновлены</div>}
      </form>
    </div>
  );
}

export default UpdateEmployeeForm;
