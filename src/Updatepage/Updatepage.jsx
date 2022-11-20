import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { UPDATE_EMPLOYEE } from '../reducers/employeesAT';


function UpdateEmployeeForm() {
    const { employeeId } = useParams();
    const { employees } = useSelector((store) => store.employeesState);
    const [warning, setWarning] = useState(false);
    const [updEmployee] = employees.filter(el => el.id === +employeeId);
    console.log(updEmployee, employeeId, employees)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function updateEmployee(e) {
        e.preventDefault();
        const { name, role, phone, birthday, isArchive } = e.target;
        if (name.value.trim() !== '' || phone.value.trim() !== '' || birthday.value.trim() !== '') {
            const data = {
                id: employeeId,
                name: name.value,
                role: role.value,
                phone: phone.value,
                birthday: birthday.value,
                isArchive: isArchive.checked,
            }

            dispatch({ type: UPDATE_EMPLOYEE, payload: data });
        } else setWarning(prev => !prev)
    }
    return (
        <form onSubmit={updateEmployee}>
            <input required type="text" name="name" defaultValue={updEmployee && updEmployee.name} placeholder='Имя' />
            <div>
                <label htmlFor="form" >Должность</label>
                <select defaultValue={updEmployee && updEmployee.role} name="role" id='form' >
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
            </div>
            <input required type="tel" name="phone" defaultValue={updEmployee && updEmployee.phone} />
            <input required type="text" name="birthday" defaultValue={updEmployee && updEmployee.birthday} />
            <div>
                <label htmlFor="isArchive">В архиве</label>
                <input type="checkbox" name='isArchive' id='isArchived' />
            </div>
            <button>Изменить</button>
            <button onClick={() => navigate('/')} type="button">Back</button>
            <div>{warning && <div>Заполните все поля</div>}</div>
        </form>
    );
}

export default UpdateEmployeeForm;