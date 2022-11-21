/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { IMaskInput } from 'react-imask';
import { useDispatch } from 'react-redux';
import { ADD_EMPLOYEE } from '../reducers/employeesAT';

function AddEmployeeForm({ setChoseFilter }) {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(false);
  const [ok, setOk] = useState(false);
  const ref = useRef(null);
  const inputRef = useRef(null);
  function addEmployee(e) {
    e.preventDefault();
    const {
      name, role, phone, birthday, isArchive,
    } = e.target;
    if (name.value.trim() !== '' && phone.value.trim() !== '' && birthday.value.trim() !== '' && phone.value.trim().length > 15 && birthday.value.trim().length > 9) {
      const data = {
        id: new Date(),
        name: name.value,
        role: role.value,
        phone: phone.value,
        birthday: birthday.value,
        isArchive: isArchive.checked,
      };
      dispatch({ type: ADD_EMPLOYEE, payload: data });
      setOk((prev) => !prev);
      setWarning(false);
      setChoseFilter('none');
      e.target.reset();
    } else setWarning((prev) => !prev);
  }
  return (
    <form onSubmit={addEmployee}>
      <input defaultValue="" type="text" name="name" placeholder="Имя" />
      <div>
        <label htmlFor="form">Должность</label>
        <select className="select-css" placeholder="Должность" name="role" id="form">
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
        defaultValue=""
        type="tel"
        name="phone"
        placeholder="Номер телефона"
      />
      <IMaskInput
        mask={Date}
        min={new Date(1900, 0, 1)}
        max={new Date(2020, 0, 1)}
        unmask
        ref={ref}
        inputRef={inputRef}
        required
        defaultValue=""
        type="text"
        name="birthday"
        placeholder="Дата рождения"
      />
      <div>
        <input type="checkbox" className="checkbox" name="isArchive" id="isArchive" />
        <label htmlFor="isArchive">В архиве</label>
      </div>
      <button className="btn" type="submit">Добавить</button>
      {warning && <div>Заполните все поля</div>}
      {ok && <div>Сотрудник успешно добавлен</div>}
    </form>
  );
}

export default AddEmployeeForm;
