import { SongPreview } from './song-preview'
import { Droppable } from 'react-beautiful-dnd'
import { useEffect } from 'react'
export const SongList = ({ songs, station = null }) => {

    // useEffect(() => {
    //     console.log(songs)
    // }, [songs])

    return <Droppable droppableId={station._id}>
        {(provided) =>
            <section className='song-list'
                ref={provided.innerRef}
                {...provided.droppableProps}
            >

                {songs.map((song, idx) => {
                    // console.log(idx, song.id, song.title)
                    return <SongPreview
                        key={idx}
                        song={song}
                        station={station}
                        songIdx={idx}
                    />
                }
                )
                }
                {provided.placeholder}
            </section>
        }
    </Droppable>
}

