import axios from "axios";

const API = process.env.REACT_APP_API;

const instance = axios.create({ baseURL: API });

export default instance;
