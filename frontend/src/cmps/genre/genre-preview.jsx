import { useNavigate } from "react-router-dom"


export function GenrePreview({ genre }) {

    const navigate = useNavigate()

    const onGoToGenre = () => {
        navigate(`/music/genre/${genre.name.toLowerCase()}`)
    }
    
    return (
        <a className="genre-preview-container">
        <div onClick={onGoToGenre} style={{ backgroundColor: genre.color }} className="genre-card" >
            <h3>{genre.name}</h3>
            <img src={genre.imgUrl} alt="genre" />
        </div>
        </a>
    )
}




