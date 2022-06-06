import { HomePage } from "./pages/home-page"
import { StationDetails } from "./pages/station-details"
import { SearchPage } from "./pages/search-page"
import { Library } from "./pages/library"
import {LikedSongsDetails} from './pages/liked-songs-details'
import { GenrePage } from "./pages/genre-page"

export const routes = [
    { path: "/", element: <HomePage /> },
    { path: "station/:stationId", element: <StationDetails /> },
    { path: "station", element: <StationDetails /> },
    { path: "search", element: <SearchPage /> },
    { path: "library", element: <Library /> },
    { path: "liked", element: <LikedSongsDetails /> },
    { path: "genre/:tag", element: <GenrePage /> },
]