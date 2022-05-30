import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { currSongReducer } from "./reducers/current-song.reducer";
import { stationReducer } from "./reducers/station.reducer";
import { playerReducer } from './reducers/player.reducer'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const rootReducer = combineReducers({
    currSongModule: currSongReducer,
    playerModule: playerReducer,
    stationModule: stationReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.myStore = store