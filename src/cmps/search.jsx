import { youtubeService } from '../services/youtube.service'

export const Search = () => {
    // getVideos('beyonce')
    async function getVideos(value) {
        try {
            const videos = youtubeService.serachIput(value)
            console.log("🚀 ~ file: search.jsx ~ line 8 ~ getVideos ~ videos", videos)
            return videos
        }
        catch (error) {
            console.log('Can not get videos', error);
        }

    }



    return (
        <div>search</div>
    )

}