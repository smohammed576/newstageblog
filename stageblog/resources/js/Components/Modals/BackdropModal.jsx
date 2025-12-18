import DataContext from "@/hooks/context/DataContext";
import { useForm, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";
import GreenButton from "../GreenButton";

function BackdropModal({onClose, selected}){
    const user = usePage().props.auth.user;
    const {searchQuery, findFilm} = useContext(DataContext);
    const [value, setValue] = useState('');
    const [films, setFilms] = useState([]);
    const [images, setImages] = useState([]);
    const [backdrop, setBackdrop] = useState(user.backdrop ?? '');
    const url = import.meta.env.VITE_APP_URL;

    const sendRequest = async (event) => {
        event.preventDefault();
        const response = await searchQuery(value, 'movie');
        setFilms(response.results);
    }

    const selectFilm = async (id) => {
        const response = await findFilm(id);
        setImages(response.images.backdrops);
    }
//onSubmit={(event) => sendQuery(event)} onClick={(event) => submit(event, item)}
    return(
        <>
         <div className="overlay"></div>
        <dialog closedby="any" open={false} className="film__modal">
            <form onSubmit={(event) => images.length == 0 ? sendRequest(event) : event.preventDefault() } className="film__modal--form">
                <span className="film__modal--header">
                    <h3 className="film__modal--header-text">Select your custom backdrop</h3>
                    <button type="button" className="film__modal--header-close" onClick={onClose}>
                        <i className="fa-solid fa-close film__modal--header-icon"/>
                    </button>
                </span>
                <div className="film__modal--body">
                    {
                        images.length == 0 ? 
                        <div className="favorite__modal--search">
                            <label htmlFor="" className="favorite__modal--search-label">Name of Film</label>
                            <input type="text" value={value} onChange={(event) => setValue(event.target.value)} className="favorite__modal--search-input" />
                            {
                                films.length != 0 ? 
                                    <ul className="favorite__modal--dropdown">
                                        {
                                            films.map((item, index) => 
                                                <li onClick={() => selectFilm(item.id)} className="favorite__modal--dropdown-item" key={index}>
                                                    <p className="favorite__modal--dropdown-title">{item.title ?? item.name} ({item.release_date != null && item.release_date !== "" ? item.release_date.substring(0, 4) : item.first_air_date != null && item.first_air_date != "" && item.first_air_date.substring(0, 4)})</p>
                                                </li>
                                            )
                                        }
                                    </ul>
                                : null
                            }
                        </div>
                        :
                        <div className="film__modal--wrapper">
                        {
                            images.map((item, index) => 
                                <span onClick={() => setBackdrop(item.file_path)} className="film__modal--backdrops" key={index}>
                                    <img src={`${url}${item.file_path}`} alt="" className="film__modal--backdrops-image" />
                                </span>
                            )
                        }
                    </div>
                    }
                    <aside className="film__modal--aside">
                        <img src={`${url}${backdrop}`} alt="" className={`film__modal--backdrop`} />
                    </aside>
                </div>
                <span className="film__modal--footer">
                    <GreenButton text="SAVE CHANGES" type="button" onClick={() => {selected(backdrop)}}/>
                </span>
            </form>
        </dialog>
        </>
    );
}

export default BackdropModal;