import { useState } from 'react';
import { StationDetailsPencil, StationDetMusic, StationDefaultIcon } from '../services/img.import.service'
import {StationModal} from './station-modal'
export const Hero = ({ station, handleImgUpload }) => {
    console.log('station', station);
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <article className='hero-container'>
            <div className='hero-img' onClick={() => setIsModalOpen(true)}>
                <StationDetailsPencil className='pencil' />
                {(station.coverUrl.length >0)?
                <img src={station.coverUrl} alt="" />
                :<StationDefaultIcon className='station-def-icon' />}
            </div>
            <div className='hero-details'>
                <span>PLAYLIST</span>
                <h1>{station.name}</h1>
            </div>

            {isModalOpen && <StationModal setIsModalOpen= {setIsModalOpen} handleImgUpload={handleImgUpload}  station={station}/>}

        </article>
    )
}