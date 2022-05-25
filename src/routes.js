import { HomePage } from "./pages/home-page"
import { StationDetails } from "./pages/station-details"
import { SearchPage } from "./pages/search-page"

export const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/station/:stationId?", element: <StationDetails /> },
    { path: "/search", element: <SearchPage /> },

]