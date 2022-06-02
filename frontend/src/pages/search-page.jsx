import { useEffect, useState } from 'react'

import { SearchResultList } from '../cmps/search/search-result-list'
import { GenreList } from '../cmps/genre/genre-list'
import { genres } from '../data/genres'
import { useSelector } from 'react-redux'

export const SearchPage = () => {

    const { songResults } = useSelector(storeState => storeState.headerModule)

    return <section className="search-page">


        <div>{songResults &&
            <SearchResultList searchResults={songResults} onAddSong={null} />
        }</div>
        <div>
            <GenreList genres={genres} />
        </div>
    </section>
}