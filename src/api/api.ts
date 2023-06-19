import axios from "axios";
import { dataTypes } from "../types/type";
export const getApi = async(url:string)=>{
    const response = await axios.get(url);
    return response.data
}

export const create = async(url:string, data:object)=>{
    const response = await axios.post(url, data);
    return response.data
}

export const edit = async(url:string, data:object)=>{
    const response = await axios.put(url, data);
    return response.data
}

export const remove = async(url:string, data:string)=>{
    const response = await axios.delete(`${url}?id=${data}`);
    return response.data
}