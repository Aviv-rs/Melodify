import { useEffect, useRef, useState } from 'react'
import { BtnExit, StationDetailsPencil, StationDefaultIcon } from '../../services/img.import.service'
import { tags as allTags } from '../../data/station'
import Multiselect from 'multiselect-react-dropdown'



export const StationModal = ({ setIsModalOpen, handleImgUpload, station, onSaveDetails }) => {
    //TODO: add close modal option by pressing outside the modal
    const options = allTags
    const [name, setName] = useState(station.name)
    const [description, setDescription] = useState(station.description || '')
    const [tags, setTags] = useState(station.tags || [])

    const modalRef = useRef()

    const onSelect = (values) => {
        setTags(values)
    }

    useEffect(() => {
        const handleClickOutsideMenu = (ev) => {
            if (modalRef.current && !modalRef.current.contains(ev.target)) {
                setIsModalOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutsideMenu)
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu)
        }
    }, [modalRef])


    return <div className="station-modal">
        <form onSubmit={() => {
            onSaveDetails({ name, description, tags })
            setIsModalOpen(false)
        }} className='station-modal-content' ref={modalRef}>
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
                        isObject={false}
                        selectedValues={station.tags || ''}
                        options={options} // Options to display in the dropdown
                        onSelect={onSelect} // Function will trigger on select event
                        selectionLimit={3}
                        displayValue="name" // Property name to display in the dropdown options
                        style={
                            {
                                multiselectContainer: {
                                    width: '100%'
                                }
                            }
                        }
                    />
                    <div className='save-container-modal'>
                        <button className='save-button'>Save</button>
                    </div>
                </div>
            </div>
        </form>

    </div >

}