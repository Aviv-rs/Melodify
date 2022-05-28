import { useState } from 'react'
import { ExitBttn, StationDetailsPencil, StationDetMusic, StationDefaultIcon } from '../services/img.import.service'

export const StationModal = ({ setIsModalOpen, handleImgUpload }) => {

    

    return <div className="station-modal">
        <div className='edit-details-title'>
            <h1>Edit details</h1>
            <span></span>
            <ExitBttn className='exit-button' onClick={() => setIsModalOpen(false)} />
        </div>
        <div className='hero-img' >
            <StationDetailsPencil className='pencil' />
            <StationDefaultIcon className='station-def-icon' />
            <input onChange={handleImgUpload} type="file"></input>
        </div>
    </div>
}