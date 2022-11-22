import React, { Fragment, useState } from "react";
import { useSelector } from 'react-redux';
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import './Home.css'
import Filters from "../../components/Filters/Filters";
import Loading from "../../components/Loading/Loading";


export default function Home() {

    const allDogs = useSelector((state) => state.dogs)
    const loading = useSelector((state) => state.loading)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage //8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage //0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return (
        <div>
            <h1>DOGS API</h1>
            <div>
                <Filters />
            </div>
            {
                loading ? <Loading/> :
                    <>
                        <div className="home-card-container">
                            {
                                currentDogs?.map(el => {
                                    return (

                                        <Card key={el.id}
                                            id={el.id}
                                            image={el.image}
                                            name={el.name}
                                            temperament={el.temperament}
                                            weight={el.weight}
                                            />
                                            )
                                        })
                                        
                                    }
                                    
                        </div>
                        <Pagination
                            dogsPerPage={dogsPerPage}
                            allDogs={allDogs.length}
                            pagination={pagination}
                            page={currentPage}
                        />
                    </>
            }
        </div>
    )
}

