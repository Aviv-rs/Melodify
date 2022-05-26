
export const GenrePreview = () => {

    const { genre } = this.props;
    return (
        <main className="GenrePreview" onClick={() => this.props.history.push(`/genre/${genre.name}`)}>
            <div style={{ backgroundColor: genre.color }} className="genre-card" >
                <h3>{genre.name}</h3>
                <img src={genre.imgUrl} alt="genre" />
            </div>
        </main>
    )
}

