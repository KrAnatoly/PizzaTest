import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { UPDATE_EMPLOYEE } from '../reducers/employeesAT'

function UpdateEmployeeForm() {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function updateEmployee(e) {
        e.preventDefault();
        const { name, role, phone, birthday, isArchived } = e.target;
        const data = {
            id: employeeId,
            name: name.value,
            role: role.value,
            phone: phone.value,
            birthday: birthday.value,
            isArchived: isArchived.checked,
        }
        dispatch({ type: UPDATE_EMPLOYEE, payload: data });
        e.target.reset();
    }
    return (
        <form onSubmit={updateEmployee}>
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
            <button>Изменить</button>
            <button onClick={() => navigate('/')} type="button">Back</button>
        </form>
    )
}

export default UpdateEmployeeForm