import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeItem({ employee }) {
    const role = {
        cook: 'повар',
        driver: 'водитель',
        waiter: 'официант'
    }

    return (
        <Link to={`/employee/${employee.id}`}>
            <div className='emloyee-item'>
                <div>Имя: {employee.name}</div>
                <div>Должность: {role[employee.role]}</div>
                <div>Номер телефона: {employee.phone}</div>
                <div>Дата рождения: {employee.birthday}</div>
                <div>В архиве: {employee.isArchive ? <span>да</span> : <span>нет</span>}</div>
            </div>
        </Link>
    )
}

export default EmployeeItem;