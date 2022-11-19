import React from "react";
import { Link } from "react-router-dom";
import { removeDog } from "../../redux/actions";
import './Card.css'

export default function Card({ id, image, name, temperament, weight }) {
    return (
        <div className="card-container">
            <button onClick={()=>removeDog(id)}>x</button>
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
    )
}

