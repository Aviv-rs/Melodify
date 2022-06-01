import { useState } from 'react'
import { BtnExit, StationDetailsPencil, StationDefaultIcon } from '../../services/img.import.service'


export const StationModal = ({ setIsModalOpen, handleImgUpload, station, onSaveDetails }) => {
    //TODO: add close modal option by pressing outside the modal
    const [name, setName] = useState(station.name)
    const [description, setDescription] = useState(station.description)
    const [tags, setTags] = useState([])

    return <div className="station-modal">
        <form onSubmit={() => {
            onSaveDetails({ name, description })
            setIsModalOpen(false)
        }} className='station-modal-content'>
            <div className='edit-details-title'>
                <h1>Edit details</h1>
                <span></span>
                <BtnExit className='exit-button' onClick={() => setIsModalOpen(false)} />
            </div>
            <div className='edit-details-inputs'>
                <label htmlFor="inputImg">
                    <div className='hero-img modal-hero-img'>
                        <StationDetailsPencil className='pencil' />
                        {(station.coverUrl) ?
                            <img src={station.coverUrl} alt="" />
                            : <StationDefaultIcon className='station-def-icon' />}
                    </div>
                </label>
                <input className='img-input' id='inputImg' onChange={handleImgUpload} type="file"></input>
                <div className='bttns-input'>
                    <input onChange={({ target }) => setName(target.value)} value={name} className='title-input' type="text" placeholder='Add a name' />
                    <textarea onChange={({ target }) => setDescription(target.value)} value={description} className='album-image-description' placeholder='Add an optional description' name="description" id="" cols="30" rows="10"></textarea>
                </div>
                <button className='save-button'>Save</button>
            </div>
        </form>

    </div>

}