import DataContext from "@/hooks/context/DataContext";
import { useForm } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function FavoriteModal({ position, onClick, onClose, type }){
    const {searchQuery} = useContext(DataContext);
    const [films, setFilms] = useState([]);
    const [value, setValue] = useState('');
    const {data, setData, post, processing, reset} = useForm({
        title: '',
        name: '',
        poster: '',
        backdrop: '',
        tmdb: 0,
        release: '',
        position: position
    });

    const sendQuery = async (event) => {
        event.preventDefault();
        const response = await searchQuery(value, type);
        setFilms(response.results);
    }

    useEffect(() => {
        if(data.poster != '' && data.tmdb != 0){
            if(type == 'tv'){
                post(route('shows.store'), {
                    onFinish: () => reset('name', 'poster', 'tmdb')
                });
            }
            else{
                post(route('favorites.store'), {
                    onFinish: () => reset('title', 'poster', 'backdrop', 'tmdb', 'release')
                });
            }
            onClose();
        }
    }, [data]);
    
    const submit = (event, result) => {
        event.preventDefault();
        if(type == 'tv'){
            setData('name', result.name)
        }
        else{
            setData('title', result.title);
            setData('release', result.release_date);
            setData('backdrop', result.backdrop_path);
        }
        setData('poster', result.poster_path);
        setData('tmdb', result.id);
    }
    
    return (
        <>
            <div className="favorite__overlay"></div>
            <dialog className="favorite__modal">
                <form onSubmit={(event) => sendQuery(event)} className="favorite__modal--form">
                    <span className="favorite__modal--header">
                        <h3 className="favorite__modal--header-text">PICK A FAVORITE FILM</h3>
                        <button type="button" onClick={onClose}  className="favorite__modal--header-button">
                            <i className="fa-solid fa-close favorite__modal--header-icon"/>
                        </button>
                    </span>
                    <div className="favorite__modal--search">
                        <label htmlFor="" className="favorite__modal--search-label">Name of {type == 'tv' ? 'Show' : 'Film'}</label>
                        <input type="text" value={value} onChange={(event) => setValue(event.target.value)} onSubmit={(event) => sendQuery(event)} className="favorite__modal--search-input" />
                        {
                            films.length != 0 ? 
                                <ul className="favorite__modal--dropdown">
                                    {
                                        films.map((item, index) => 
                                            <li onClick={(event) => submit(event, item)} className="favorite__modal--dropdown-item" key={index}>
                                                <p className="favorite__modal--dropdown-title">{item.title ?? item.name} ({item.release_date != null && item.release_date !== "" ? item.release_date.substring(0, 4) : item.first_air_date != null && item.first_air_date != "" && item.first_air_date.substring(0, 4)})</p>
                                            </li>
                                        )
                                    }
                                </ul>
                            : null
                        }
                    </div>
                </form>
            </dialog>
        </>
    );
}

export default FavoriteModal;