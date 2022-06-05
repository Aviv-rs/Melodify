import { SongPreview } from './song-preview'
import { Droppable } from 'react-beautiful-dnd'
import { Clock } from '../../services/img.import.service'

export const SongList = ({ onRemoveSong, songs, station = null }) => {

    return <Droppable droppableId={station._id}>
        
                
            
        {(provided) => (
            <div className="song-table-spacing">
                    <div className='table-header'>
                        <div className="song-index-container">
                            <span className='song-index'>#</span>
                        </div>
                        <div className="song-title-container">
                            <span>TITLE</span>
                        </div>
                        <div className="date-added-container">
                            <span>DATE ADDED</span>
                        </div>
                        <div className="duration-container">

                            <Clock />
                        </div>
                    </div>
                <section className='song-list'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >

                    {songs.map((song, idx) => {
                        return <SongPreview
                            key={idx}
                            song={song}
                            station={station}
                            songIdx={idx}
                            onRemoveSong={onRemoveSong}
                        />
                    }
                    )
                    }
                    {provided.placeholder}
                </section>
            </div>
        )}
    </Droppable>
}

