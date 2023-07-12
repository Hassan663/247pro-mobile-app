import axios from 'axios';

const createPost = async (url: string, postData: object) => { return await axios.post(url, postData) };
const getPosts = async (url: any) => { return await axios.get(url) };
const deletePost = async (url: string) => { return await axios.delete(url) };
const updatePost = async (url: string, postData: object) => { return await axios.put(url, postData) };


export { createPost, getPosts, deletePost, updatePost };
