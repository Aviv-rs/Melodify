import { useState } from 'react'
import { BtnExit, StationDetailsPencil, StationDefaultIcon } from '../../services/img.import.service'
import { tags as allTags } from '../../data/station'
import Multiselect from 'multiselect-react-dropdown'



export const StationModal = ({ setIsModalOpen, handleImgUpload, station, onSaveDetails }) => {
    //TODO: add close modal option by pressing outside the modal
    const options = allTags.map(tag => { return { name: tag } })
    const [name, setName] = useState(station.name)
    const [description, setDescription] = useState(station.description)
    const [tags, setTags] = useState([])
    const onSelect = (values) => {
        setTags(values.map(value => value.name))
    }
    return <div className="station-modal">
        <form onSubmit={() => {
            onSaveDetails({ name, description, tags })
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
                    <Multiselect
                        options={options} // Options to display in the dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        selectionLimit={3}
                        displayValue="name" // Property name to display in the dropdown options
                    />
                    <button className='save-button'>Save</button>
                </div>
            </div>
        </form>

    </div >

}