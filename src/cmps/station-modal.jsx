import { useState } from 'react'
import { ExitBttn, StationDetailsPencil, StationDetMusic, StationDefaultIcon } from '../services/img.import.service'

export const StationModal = ({ setIsModalOpen, handleImgUpload, station }) => {

    return <div className="station-modal">
        <div className='edit-details-title'>
            <h1>Edit details</h1>
            <span></span>
            <ExitBttn className='exit-button' onClick={() => setIsModalOpen(false)} />
        </div>
        <label htmlFor="inputImg">

            <div className='hero-img' >
                <StationDetailsPencil className='pencil' />
                {(station.coverUrl.length > 0) ?
                    <img src={station.coverUrl} alt="" />
                    : <StationDefaultIcon className='station-def-icon' />}
            </div>
        </label>
        <input className='img-input' id='inputImg' onChange={handleImgUpload} type="file"></input>
        <input className='title-input' type="text" />
    </div>
}