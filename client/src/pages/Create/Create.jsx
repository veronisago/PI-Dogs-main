import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../redux/actions';
import './Create.css'


function validate(create) {
    const errors = {};
    let isError = false;
    var regName = new RegExp("^[A-Z][a-z]+");
    var regHeight = new RegExp("^[0-9]*(-)[0-9]*");
    // var regLife = /^[0-9]*[\s][y][e][a][r][s]/g

    if (!create.name) {
        errors.name = 'Name is required';
        isError = true;
    }
    if (!create.name.match(regName)) {
        errors.name = 'The name must begin with a capital letter';
        isError = true;
    }
    if (create.weight < 2 || create.weight > 88) {
        errors.name = 'Weight is not valid';
        isError = true;
    }
    if (create.temperament.length < 2) {
        errors.temperament = 'Not enough temperaments'
        isError = true;
    }
    if (create.temperament.length > 3) {
        errors.temperament = 'Too many temperaments'
        isError = true;
    }
    if (!create.height) {
        errors.height = 'Height is required';
        isError = true;
    }
    if (!create.height.match(regHeight)) {
        errors.height = 'Height should be a range';
        isError = true;
    }
    if (!create.life_span) {
        errors.life_span = 'Life span must be a number and the word "years"';
        isError = true;
    }

    return isError ? errors : null;
}

export default function CreatePage() {

    const dispatch = useDispatch()
    // const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})

    const [create, setCreate] = useState({
        name: "",
        weight: 0,
        height: "",
        life_span: "",
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        if (property === 'temp') {
            setCreate({
                ...create,
                temperament: [...create.temperament, value]
            })
            setErrors(validate({
                ...create,
                temperament: [...create.temperament, value]
            }))
        } else {
            setCreate({
                ...create,
                [property]: value
            })
            setErrors(validate({
                ...create,
                [property]: value
            }))
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (errors == null) {
            dispatch(postDog(create))
            alert('Perrito creado!!')
            setCreate({
                name: "",
                weight: 0,
                height: "",
                life_span: "",
                temperament: []
            })

        } else {
            alert('You have to complete the form')
        }
        // history.push("/home");
    }

    return (
        <div className='create-container'>
            <div className='create-image'><img src="/Dog-create3.png" alt="" /></div>
            <div className='create-form'>
                <h1>Hey!! creates a new dog breed</h1>
                <form className='form-container' onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type='text' name='name' value={create.name} onChange={changeHandler} className='create-inputs'></input>
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="weight">Weight: </label>
                        <input type='number' name='weight' value={create.weight} onChange={changeHandler} className='create-inputs'></input>
                        {/* <label>lb</label> */}
                        {errors.weight && (
                            <p>{errors.weight}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="height">Height: </label>
                        <input type='text' name="height" placeholder='Type a range, e.g. 2-8 ' value={create.height} onChange={changeHandler} className='create-inputs'></input>
                        {/* <label>in.</label> */}
                        {errors.height && (
                            <p>{errors.height}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="life_span">Life span: </label>
                        <input type='text' name='life_span' placeholder='e.g. 7 years' value={create.life_span} onChange={changeHandler} className='create-inputs'></input>
                        {errors.life_span && (
                            <p>{errors.life_span}</p>
                        )}
                    </div>
                    <div>
                        <select name='temp' onChange={(e) => changeHandler(e)} className='create-inputs'>
                            {temperaments.map((temp) => (
                                <option value={temp.id} key={temp.id}>{temp.name}</option>
                            ))}
                        </select>
                        {errors.temperament && (
                            <p>{errors.temperament}</p>
                        )}
                    </div>
                    <div>
                        {temperaments?.map((e) => create.temperament.includes(String(e.id)) && (<div key={e.id}>{e.name}</div>))}
                    </div>

                    <button className='create-subtmit-button' type="submit">
                        <h4 className='create-button-text'>Create</h4>
                        <img src="/hueso.png" alt="" />
                    </button>

                </form>
            </div>
        </div>
    )
}