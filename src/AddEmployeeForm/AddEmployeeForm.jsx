import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_EMPLOYEE } from '../reducers/employeesAT'

function AddEmployeeForm() {
    const dispatch = useDispatch();
    const [ warning, setWarning ] = useState(false);
    function addEmployee(e) {
        e.preventDefault();
        const { name, role, phone, birthday, isArchive } = e.target;
        if (name.value.trim() !== '' || phone.value.trim() !== '' || birthday.value.trim() !== '') {
            const data = {
                id: new Date(),
                name: name.value,
                role: role.value,
                phone: phone.value,
                birthday: birthday.value,
                isArchive: isArchive.checked,
            }
            dispatch({ type: ADD_EMPLOYEE, payload: data });
            e.target.reset();
        } else setWarning(prev => !prev)
    }
    return (
        <form onSubmit={addEmployee}>
            <input defaultValue='' type="text" name="name" placeholder='Имя' />
            <div>
                <label htmlFor="form" >Должность</label>
                <select placeholder='Должность' name="role" id='form' >
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
            </div>
            <input required defaultValue='' type="tel" name="phone" placeholder='Номер телефона' />
            <input required defaultValue='' type="tel" name="birthday" placeholder='Дата рождения' />
            <div>
                <label htmlFor="isArchive">В архиве</label>
                <input type="checkbox" name='isArchive' id='isArchive' />
            </div>
            <button>Добавить</button>
            <div>{warning && <div>Заполните все поля</div>}</div>
        </form>
    )
}

export default AddEmployeeForm;