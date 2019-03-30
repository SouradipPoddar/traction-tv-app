import axios from "axios";

const axiosTmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

const axiosImage = axios.create({
  baseURL: "https://image.tmdb.org/t/p/w780/"
});

export { axiosTmdb, axiosImage };
