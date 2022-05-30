import { GenrePreview } from "./genre-preview"
import {Loader} from "./loader"

export function GenreList({  }) {
    const genres = null
    if (true) return <div><Loader/></div> //TODO LOADER
    return (
        <section className="genre-container ">
            <h2 className="genre-title">Browse all</h2>
            <div className="genre-list grid">
                {genres.map(genre =>
                    <GenrePreview key={genre.name} genre={genre} />
                )}
            </div>
        </section>
    )
}