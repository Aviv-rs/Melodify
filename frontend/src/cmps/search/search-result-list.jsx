import { SearchResultPreview } from './search-result-preview'
export const SearchResultList = ({ searchResults, onAddSong }) => {

    return <div className="song-table-spacing">

        <section className='search-result-list'>
            {searchResults.map((result, idx) =>
                <SearchResultPreview
                    key={idx}
                    result={result}
                    onAddSong={onAddSong}
                />
            )
            }
        </section>
    </div>
}


