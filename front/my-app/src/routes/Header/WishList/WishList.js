import React, { useEffect } from 'react'
import './WishList.css';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getWishAsync, selectWish, delWishAsync } from './wishSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { selectToken } from '../../Login/loginSlice'

/* Display the wishlist for the connected user */

export default function WishList(props) {
    const { active } = props;
    const myWish = useSelector(selectWish);
    const dispatch = useDispatch();
    const token = useSelector(selectToken);

    useEffect(() => {
        token && dispatch(getWishAsync(token))
    }, [])
    useEffect(() => {
        token && dispatch(getWishAsync(token))
    }, [token])



    return (
        <div className={`wish-list ${active ? 'active' : ''}`}>
            {myWish.map((wish, index) =>
                <div className="box" key={index}>
                    <FontAwesomeIcon className="trash-icon" icon={faTrash}
                        onClick={() => dispatch(delWishAsync({ prod: wish, myToken: token }))} />
                    <img src={`/media/${wish.image}`} alt="Product" />
                    <div className="content">
                        <h3> {wish.desc}</h3>
                        <span className="price">price: {wish.price}</span>
                    </div>
                </div>)}
        </div>
    )
}

WishList.propTypes = {
    activeWishList: PropTypes.bool,
}.isRequired;