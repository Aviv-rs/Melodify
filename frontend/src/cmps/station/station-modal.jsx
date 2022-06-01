import { useState } from 'react'
import { BtnExit, StationDetailsPencil, StationDefaultIcon } from '../../services/img.import.service'
import { Select, FormControl, InputLabel, MenuItem, OutlinedInput, MenuProps } from '@mui/material'
import { tags as allTags } from '../../data/station'


export const StationModal = ({ setIsModalOpen, handleImgUpload, station, setTitle, setDescription, onSubmit, title, description, tags, setTags }) => {
    //TODO: add close modal option by pressing outside the modal
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    const handleChange = ({ target: { value } }) => {
        setTags(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }


    return <div className="station-modal">
        <div className='station-modal-content'>
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
                    <input onChange={({ target }) => setTitle(target.value)} value={title} className='title-input' type="text" placeholder='Add a name' />
                    <textarea onChange={({ target }) => setDescription(target.value)} value={description} className='album-image-description' placeholder='Add an optional description' name="" id="" cols="30" rows="10"></textarea>
                    {/* <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            // multiple
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Add Tag"
                            onChange={({ target }) => setTag([target])}
                        >
                            <MenuItem value={'Love'}>Love</MenuItem>
                            <MenuItem value={'Pop'}>Pop</MenuItem>
                            <MenuItem value={'House'}>House</MenuItem>
                            <MenuItem value={'Classic'}>Classic</MenuItem>
                            <MenuItem value={'Hip Hop'}>Hip Hop</MenuItem>
                            <MenuItem value={'Chill'}>Chill</MenuItem>
                            <MenuItem value={'Middle East'}>Middle East</MenuItem>
                        </Select>
                    </FormControl> */}


                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label" style={{color: '#fff'}}>Name</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={tags}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            MenuProps={MenuProps}
                        >
                            {allTags.map((tag) => (
                                <MenuItem
                                    key={tag}
                                    value={tag}
                                // style={getStyles(tag, personName, theme)}
                                >
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <button className='save-button' onClick={() => {
                    onSubmit()
                    setIsModalOpen(false)
                }}>Save</button>
            </div>
        </div>

    </div>

}