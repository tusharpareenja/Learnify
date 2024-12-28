const { default: axios } = require("axios");

const youtube_url = 'https://www.googleapis.com/youtube/v3/search';

const getVideos = async (query) => {
    try {
        const params = {
            part: 'snippet',
            q: query,
            maxResults: 1, // Fixed typo
            type: 'video',
            key: process.env?.YOUTUBE_API_KEY || 'AIzaSyBHIwZkKx1zDOvpvHuctQ3sX6151RVjjSg', // Fallback key
           
        };

        const res = await axios.get(youtube_url, { params });
        console.log('API Key:', process.env?.YOUTUBE_API_KEY || 'Fallback key used');
        return res.data.items;
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        return [];
    }
};

export default {
    getVideos,
};
