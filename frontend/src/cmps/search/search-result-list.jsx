import { SearchResultPreview } from './search-result-preview'
export const SearchResultList = ({ searchResults, onAddSong }) => {

    return <section className='song-list'>
        {searchResults.map((result, idx) =>
            <SearchResultPreview
                key={idx}
                result={result}
                onAddSong={onAddSong}
            />
        )
        }
    </section>
}


