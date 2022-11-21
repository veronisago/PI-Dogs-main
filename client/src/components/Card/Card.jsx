import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../../redux/actions";
import './Card.css'

export default function Card({ id, image, name, temperament, weight }) {

    const dispatch = useDispatch()

    const handleClick = async (e) => {
        await axios.delete(`http://localhost:3001/dogs/${id}`)
        dispatch(getDogs())
    }

    return (
        <>
            <div className="card-container">
                {
                    typeof id == 'string' && <button onClick={handleClick}>x</button>
                }
                <img src={image} alt="img not found" className="card-image" />
                <Link className="card-name" to={`/dog/${id}`}>
                    <h3>{name}</h3>
                </Link>
                <h4>{weight} lb</h4>
                <div className="card-temperament">
                    {temperament?.map((e, i) => {
                        return (
                            <div key={i} className="card-element">
                                {e}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

