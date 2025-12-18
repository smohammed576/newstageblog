import { createContext, useState } from "react";
import tags from "../../../data/tags.json";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const key = import.meta.env.VITE_APP_KEY;

    const searchQuery = async (query, type) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${query}&api_key=${key}`);
        const results = await response.json();
        console.log(results);
        return results;
    }

    const findFilm = async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=credits,images`);
        const result = await response.json();
        return result;
    }

    const findShow = async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=credits,content_ratings,images`);
        const result = await response.json();
        return result;
    }

    const findPerson = async (id) => {
        const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${key}&append_to_response=credits`);
        const result = await response.json();
        return result;
    }

    return(
        <DataContext.Provider value={{data, searchQuery, findFilm, findShow, findPerson}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
export {DataProvider};