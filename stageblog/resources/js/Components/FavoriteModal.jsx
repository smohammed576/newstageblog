import DataContext from "@/hooks/context/DataContext";
import { useContext, useState } from "react";

function FavoriteModal({ onClick, onClose }){
    const {searchFilm} = useContext(DataContext);
    const [films, setFilms] = useState([]);
    const [value, setValue] = useState('');

    const sendQuery = async (event) => {
        event.preventDefault();
        const response = await searchFilm(value);
        setFilms(response.results);
    }
    return (
        <>
            <div className="favorite__overlay"></div>
            <dialog onClose={onClose} open className="favorite__modal">
                <form method="dialog" onSubmit={(event) => sendQuery(event)} className="favorite__modal--form">
                    <span className="favorite__modal--header">
                        <h3 className="favorite__modal--header-text">PICK A FAVORITE FILM</h3>
                        <button type="submit" className="favorite__modal--header-button">
                            <i className="fa-solid fa-close favorite__modal--header-icon"/>
                        </button>
                    </span>
                    <div className="favorite__modal--search">
                        <label htmlFor="" className="favorite__modal--search-label">Name of Film</label>
                        <input type="text" value={value} onChange={(event) => setValue(event.target.value)} onSubmit={sendQuery} className="favorite__modal--search-input" />
                        {
                            films.length != 0 ? 
                                <ul className="favorite__modal--dropdown">
                                    {
                                        films.map((item, index) => 
                                            <li onClick={() => onClick(item.id)} className="favorite__modal--dropdown-item" key={index}>
                                                <p className="favorite__modal--dropdown-title">{item.title} ({item.release_date != null && item.release_date !== "" ? item.release_date.substring(0, 4) : null})</p>
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