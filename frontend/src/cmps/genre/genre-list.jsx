import { GenrePreview } from "./genre-preview"
import { Loader } from "../util/loader"

export function GenreList({ genres }) {
    if (!genres) return <div><Loader /></div> //TODO LOADER
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