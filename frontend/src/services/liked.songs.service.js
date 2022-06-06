import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'liked_songs'

export const likedSongsService = {
    query,
    getById,
    save,
    remove,
}

window.lsc = likedSongsService;

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(songId) {
    return storageService.get(STORAGE_KEY, songId)
}

async function remove(songId) {
    await storageService.remove(STORAGE_KEY, songId)
}

async function save(song) {
    const savedSong = await storageService.post(STORAGE_KEY, song)
    return savedSong
}








