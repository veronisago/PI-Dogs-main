import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { getDogDetail } from '../../redux/actions';
import './Detail.css'



export default function DetailPage(props) {
    const id = props.match.params.id
    const dispatch = useDispatch();
    const dogDetail = useSelector((state) => state.dogDetail)
    const loading = useSelector((state) => state.loading)

    useEffect(() => {
        dispatch(getDogDetail(id))
    }, [id, dispatch])


    if (loading) {
        return (
            <Loading />
        )
    }


    return (
        <div className='detail'>
            <h1>Dog Details</h1>
            <div className='detail-info'>
                <div className='detail-img-container'>
                    <img src={dogDetail.image} alt="iimg not found" width="200px" height="250px" />
                </div>
                <div className='detail-container'>
                    <p className='detail-name'>{dogDetail.name}</p>
                    <div>{dogDetail.temperament?.map((temp, i) => (
                        <b key={i}>{temp}, </b>
                    ))}</div>
                    <p>Height: {dogDetail.height} in.</p>
                    <p>Weight: {dogDetail.weight} lb</p>
                    <p>Life span: {dogDetail.life_span}</p>
                    <div>
                        <Link to='/home'><button>Volver a pagina principal</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}