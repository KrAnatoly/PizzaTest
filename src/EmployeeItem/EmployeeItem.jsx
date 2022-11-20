import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeItem({ employee }) {

    return (
        <Link to={`/employee/${employee.id}`}>
            <div>
                <div>Имя:{employee.name}</div>
                <div>Должность:{employee.role}</div>
                <div>Номер телефона:{employee.phone}</div>
                <div>Дата рождения:{employee.birthday}</div>
                <div>В архиве:{employee && (employee.isArchive ? <p>да</p> : <p>нет</p>)}</div>
            </div>
        </Link>
    )
}

export default EmployeeItem;