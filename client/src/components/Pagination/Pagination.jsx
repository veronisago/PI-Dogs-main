import React from "react";
import './Pagination.css'

export default function Pagination({ dogsPerPage, allDogs, pagination, page }) {
    const pageNumber = [];

    for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i + 1);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumber &&
                    pageNumber.map(number => (
                        <li key={number} >
                            <button onClick={() => pagination(number)} className={`pagination-button ${page === number && "pagination-current-page"}`}>{number}</button>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}