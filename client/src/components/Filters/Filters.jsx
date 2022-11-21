import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import './Filters.css'


const initialState = {
    order: '',
    orderBy: '',
    name: '',
    temp: '',
    source: ''
}

export default function Filters() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(initialState);
    const [type, setType] = useState('name')


    useEffect(() => {
        dispatch(getDogs(filter));
    }, [filter, dispatch])


    const handleSubmit = (event) => {
        if (event.target.name === "sorting") {
            let values = event.target.value.split('-')
            setFilter({ ...filter, order: values[1], orderBy: values[0] })
        } else {
            setFilter({ ...filter, [event.target.name]: event.target.value })
        }
    }

    const HandleClear = () => {
        setFilter(initialState)
    }

    const handleFilter = (event) => {
        setType(event.target.value)
    }

    return (
        <div className="filters">
            <div className="filter-sorting-container">
                <h3>Sort by:</h3>
                <select name="sorting" onChange={handleSubmit} className='filter-sorting'>
                    <option value="name-asc">Alphabetical, A-Z </option>
                    <option value="name-desc">Alphabetical, Z-A </option>
                    <option value="weight-asc">Lower to higher weight</option>
                    <option value="weight-desc">Higher to lower weight</option>
                </select>
            </div>
            <div className="filter-container">
                <h3>Filter by:</h3>
                <div className="filter-group">
                    <select name="source" onChange={handleFilter} className='filter-type'>
                        <option value="name">Name</option>
                        <option value="temp">Temperament</option>
                    </select>
                    <input
                        className="filter-name"
                        name={type}
                        type="text"
                        placeholder="Type here..."
                        onKeyDown={e => e.key === "Enter" && handleSubmit(e)}
                    />
                    <select name="source" onChange={e => handleSubmit(e)} className='filter-source'>
                        <option value="all">All breeds</option>
                        <option value="created">Created breeds</option>
                        <option value="api">Existing breeds</option>
                    </select>
                    <button className="filter-button" onClick={HandleClear}><img src="/filter.png" alt="" /></button>
                </div>
            </div>
        </div>
    )
}