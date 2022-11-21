import React from "react";
import './Paging.css'

export default function Paging({ dogsPerPage, allDogs, paging, page }) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i + 1);
    }

    return (
        <nav>
            <ul className="paging">
                {pageNumber &&
                    pageNumber.map(number => (
                        <li key={number} >
                            <button onClick={() => paging(number)} className={`paging-button ${page === number && "paging-current-page"}`}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}