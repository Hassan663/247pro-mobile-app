import axios from 'axios';

const postAi = async (url: string, postData: object) => { return await axios.post(url, postData) };
const getApi = async (url: any) => { return await axios.get(url) };
const deleteAp = async (url: string) => { return await axios.delete(url) };
const updateApi = async (url: string, postData: object) => { return await axios.put(url, postData) };


export { postAi, getApi, deleteAp, updateApi };
