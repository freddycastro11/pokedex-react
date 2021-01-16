import React from 'react'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
const Pagination = (props) => {

    const {onLeftClick, onRightClick , page, totalPages} = props

    return (
        <div className="pagination">
            <button onClick={onLeftClick} className="pagination-btn">
                <FiArrowLeft />
            </button>
                <div>{page} de {totalPages}</div>
            <button onClick={onRightClick} className="pagination-btn">
                <FiArrowRight />
            </button>
        </div>
    )
}

export default Pagination
