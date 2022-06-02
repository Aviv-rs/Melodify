import { SongPreview } from './song-preview'
import { Droppable } from 'react-beautiful-dnd'
import { useEffect } from 'react'
export const SongList = ({ onRemoveSong, songs, station = null }) => {

    return <Droppable droppableId={station._id}>
        {(provided) => (
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
        )}
    </Droppable>
}

