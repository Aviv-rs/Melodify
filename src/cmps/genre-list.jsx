import { GenrePreview } from "./genre-preview"

export function GenreList({ genres }) {
    
    if (!genres) return <div>Loading Genres...</div> //TODO LOADER
    return (
        <section className="genre-list">
            {genres.map(genre =>
                <GenrePreview key={genre.name} genre={genre} />
            )}
        </section>
    )
}