import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddEmployeeForm from '../AddEmployeeForm/AddEmployeeForm';
import EmployeeItem from '../EmployeeItem/EmployeeItem';
import { SORT_NAME, SORT_BIRTHDAY, SORT_ROLE, SORT_ARCHIVE } from '../reducers/employeesAT'

function Mainpage() {
    const dispatch = useDispatch();
    const { employees, sortByArchive, sortByRole } = useSelector((store) => store.employeesState);
    const [editIn, setEditIn] = useState(false);
    const [checked, setChecked] = useState(false);
    const [choseFilter, setChoseFilter] = useState('none');
    function addEmpl() {
        setEditIn(prev => !prev)
    }
    function nameSort() {
        dispatch({ type: SORT_NAME, payload: employees });
    }
    function bithDaySort() {
        dispatch({ type: SORT_BIRTHDAY, payload: employees });
    }
    function roleSort(e) {
        if (e.target.value === 'none') {
            setChoseFilter('none')
        } else {
            setChoseFilter('role')
            dispatch({ type: SORT_ROLE, payload: e.target.value });
        }
    }
    function sortArchive() {
        setChecked(prev => !prev);
        setChoseFilter('archive');
        dispatch({ type: SORT_ARCHIVE, payload: checked });
    }
    return (
        <>
            <div>
                <button onClick={() => nameSort()}>Сортировка по имени</button>
                <button onClick={() => bithDaySort()}>Сортировка по дате рождения</button>
                <div>
                    <label htmlFor="form" >Сортировка по должности</label>
                    <select onChange={roleSort} name="role" id='form' >
                        <option value="none">Выберите должность</option>
                        <option value="cook">Повар</option>
                        <option value="waiter">Официант</option>
                        <option value="driver">Водитель</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="isArchived">В архиве</label>
                    <input type="checkbox" onChange={() => sortArchive()} name='isArchived' id='isArchived' />
                </div>
            </div>
            <div>
                {
                    (choseFilter === 'none') ? (employees && employees.map((employee) => <EmployeeItem key={employee.id} employee={employee} />))
                        : (choseFilter === 'role') ? (sortByRole.map((employee) => <EmployeeItem key={employee.id} employee={employee} />))
                            : (sortByArchive && sortByArchive.map((employee) => <EmployeeItem key={employee.id} employee={employee} />))
                }
            </div>
            <div>
                <button onClick={() => addEmpl()}>Добавить сотрудника</button>
                <div>{editIn ? <AddEmployeeForm /> : <></>}</div>
            </div>
        </>
    )
};

export default Mainpage;
