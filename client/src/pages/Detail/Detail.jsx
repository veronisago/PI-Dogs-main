import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
            <div className='detail-title'>
                <h1>Dog Details</h1>
            </div>
            <div className='detail-info'>
                <div className='detail-img-container'>
                    <img src={dogDetail.image} alt="iimg not found" width="200px" height="250px" />
                </div>
                <div className='detail-container'>
                    <p className='detail-name'>{dogDetail.name}</p>
                    <div className='detail-line-decoration'>-</div>
                    <div className='detail-temp'>{dogDetail.temperament?.map((temp, i) => (
                        <b key={i} className='detail-temp-p'>{temp},  </b>
                    ))}</div>
                    <ul>
                        <li className='detail-text'>Height: {dogDetail.height} in.</li>
                        <li className='detail-text'>Weight: {dogDetail.weight} lb</li>
                        <li className='detail-text'>Life span: {dogDetail.life_span}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}