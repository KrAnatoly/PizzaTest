import React from 'react';
import { useDispatch } from 'react-redux';
import { ADD_EMPLOYEE } from '../reducers/employeesAT'

function AddEmployeeForm() {
    const dispatch = useDispatch();
    function addEmployee(e) {
        e.preventDefault();
        const { name, role, phone, birthday, isArchived } = e.target;
        const data = {
            id: new Date(),
            name: name.value,
            role: role.value,
            phone: phone.value,
            birthday: birthday.value,
            isArchived: isArchived.checked,
        }
        dispatch({ type: ADD_EMPLOYEE, payload: data });
        e.target.reset();
    }
    return (
        <form onSubmit={addEmployee}>
            <input type="text" name="name" placeholder='Имя' />
            <div>
                <label for="form" >Должность</label>
                <select placeholder='Должность' name="role" id='form' >
                    <option selected value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
            </div>
            <input type="tel" name="phone" placeholder='Номер телефона' />
            <input type="tel" name="birthday" placeholder='Дата рождения' />
            <div>
                <label for="isArchived">В архиве</label>
                <input type="checkbox" name='isArchived' id='isArchived' />
            </div>
            <button>Добавить</button>
        </form>
    )
}

export default AddEmployeeForm;