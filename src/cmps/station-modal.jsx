import { ExitBttn, StationDetailsPencil, StationDefaultIcon } from '../services/img.import.service'

export const StationModal = ({ setIsModalOpen, handleImgUpload, station, setTitle, setDescription, onSubmit }) => {
    //TODO: add close modal option by pressing outside the modal
    return <div className="station-modal">
        <div className='station-modal-content'>
            <div className='edit-details-title'>
                <h1>Edit details</h1>
                <span></span>
                <ExitBttn className='exit-button' onClick={() => setIsModalOpen(false)} />
            </div>
            <div className='edit-details-inputs'>
                <label htmlFor="inputImg">
                    <div className='hero-img modal-hero-img'>
                        <StationDetailsPencil className='pencil' />
                        {(station.coverUrl.length > 0) ?
                            <img src={station.coverUrl} alt="" />
                            : <StationDefaultIcon className='station-def-icon' />}
                    </div>
                </label>
                <input className='img-input' id='inputImg' onChange={handleImgUpload} type="file"></input>
                <div className='bttns-input'>
                    <input onChange={({target}) =>setTitle(target.value)} className='title-input' type="text" placeholder='Add a name' />
                    <textarea onChange={({target}) =>setDescription(target.value)} className='album-image-description' placeholder='Add an optional description' name="" id="" cols="30" rows="10"></textarea>
                    <button className='save-button' onClick={onSubmit}>Save</button>
                </div>
            </div>
            <div className='station-modal-text'>By proceeding, you agree to give Melodify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
        </div>
    </div>
}