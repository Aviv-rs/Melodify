import { GenrePreview } from "./genre-preview"

export function GenreList({ genres }) {

    if (!genres) return <div>Loading Genres...</div> //TODO LOADER
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