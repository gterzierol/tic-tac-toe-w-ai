import { URL } from './config' 
const axios = require('axios');

export const sendMove =  async (move) => {
    try {
        const response = await axios.post(URL, {
            "action":move
        });
        return response.data     
    } catch (error) {
        return error
    }
}