import React from 'react'
import { NavLink } from 'react-router-dom'


export const StationList = () => {
    return (
        <section className="station-list">
            <div className="stations grid">
                <div className="station-tags">
                    <NavLink to={`/tags/$`}><h1>Fresh New Releases</h1></NavLink>
                    <NavLink to={`/tags/$`}><p>See all</p></NavLink>
                </div>
            </div>
        </section>
    )
}