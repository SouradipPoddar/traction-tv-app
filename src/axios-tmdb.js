import axios from "axios";

const axiosTmdb = axios.create({
  baseURL: "http://54.243.244.135/3/"
});

const axiosImage = axios.create({
  baseURL: "http://54.243.244.135/t/p/w780/"
});

export { axiosTmdb, axiosImage };
