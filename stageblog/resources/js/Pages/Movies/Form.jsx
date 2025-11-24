import DataContext from "@/hooks/context/DataContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function MovieForm(){
    const user = usePage().props.auth;
    const csrf = document.querySelector("meta[name=csrf-token]").getAttribute("content");
    const [films, setFilms] = useState([]);
    const {searchFilm, findFilm} = useContext(DataContext);
    const [value, setValue] = useState('');
    const [film, setFilm] = useState(null);
    const url = import.meta.env.VITE_APP_URL;
    const [rating, setRating] = useState(0);
    const [liked, setLiked] = useState(false);
    const [rewatched, setRewatched] = useState(false);
    const [watched, setWatched] = useState(2);

    const sendQuery = async (event) => {
        event.preventDefault();
        const response = await searchFilm(value);
        setFilms(response.results);
    }

    const selectFilm = async (id) => {
        const response = await findFilm(id);
        setFilm(response);
    }

    useEffect(() => {
        if(film != null){
            document.querySelector('body').style.overflow = "hidden";
            setRating(0);
            setLiked(false);
            
        }
        else{
            document.querySelector('body').style.overflow = "auto";
        }
    }, [film]);

    const changeRating = (index) => {
        if(index == 0){
            setRating(rating == 1 ? 2 : 1);
        }
        else if(index == 1){
            setRating(rating == 3 ? 4 : 3);
        }
        else if(index == 2){
            setRating(rating == 5 ? 6 : 5);
        }
        else if(index == 3){
            setRating(rating == 7 ? 8 : 7);
        }
        else if(index == 4){
            setRating(rating == 9 ? 10 : 9);
        }
    }
    
    return(
        <AuthenticatedLayout>
            <section className="movie">
                <div className="movie__wrapper">
                    <form action="" className="movie__search" onSubmit={(event) => sendQuery(event)}>
                        <input onChange={(event) => setValue(event.target.value)} value={value} type="text" className="movie__search--input" />
                    </form>
                </div>
                {
                    films.length == 0 ? null : <div className="movie__results">
                        {
                            films.map((item, index) => 
                                <button className="movie__result" key={index} onClick={() => selectFilm(item.id)}>
                                    {
                                        item.poster_path !== "" && item.poster_path !== null ? 
                                            <img src={`${url}${item.poster_path}`} alt={item.title} className="movie__result--image" />
                                        :
                                            <article className="movie__result--empty">
                                                <p className="movie__result--empty-title">{item.title}</p>
                                            </article>
                                    }
                                </button>
                            )
                        }
                    </div>
                }
            </section>
        {
            film !== null ? 
                <>
                    <div className="movie__overlay"></div>
                    <dialog closedby="closerequest" onClose={() => setFilm(null)} open className="movie__modal">
                        <form action={route("movie.store")} method="post" className="movie__modal--form">
                            <input type="hidden" name="_token" value={csrf} />
                            <input type="hidden" value={user.user.id} name="user_id"/>
                            <input type="hidden" value={film.id} name="tmdb"/>
                            <input type="hidden" value={film.poster_path} name="poster"/>
                            <input type="hidden" value={rating} name="rating" />
                            <span className="movie__modal--header">
                                <h3 className="movie__modal--header-text">I watched...</h3>
                                <button formMethod="dialog" className="movie__modal--header-close">
                                    <i className="fa-solid fa-close"/>
                                </button>
                            </span>
                            <span className="movie__modal--body">
                                <a href={route("movie.show", film.id)} className="movie__modal--link">
                                    <figure className="movie__modal--poster">
                                        <img src={`${url}${film.poster_path}`} alt={film.title} className="movie__modal--poster-image" />
                                    </figure>
                                </a>
                                <div className="movie__modal--body-wrapper">
                                    <article className="movie__modal--text">
                                        <input type="hidden" value={film.title} name="title"/>
                                        <h2 className="movie__modal--text-title">{film.title}</h2>
                                        <h3 className="movie__modal--text-year">{film.release_date !== "" && film.release_date !== null ? film.release_date.substring(0, 4) : null}</h3>
                                    </article>
                                    <span className="movie__modal--wrapper">
                                        <span className="movie__modal--check">
                                            <input type="checkbox" className="movie__modal--check-input" value={rewatched ? 1 : 0} onClick={() => setRewatched(!rewatched)} name="rewatched" />
                                            <label className="movie__modal--check-label" htmlFor="">I've watched this before</label>
                                        </span>
                                        {
                                            rewatched ? <span className="movie__modal--watched">
                                                <button className="movie__modal--watched-button" type="button" onClick={() => watched == 2 ? null : setWatched(watched - 1)}>
                                                    <i className="fa-solid fa-minus movie__modal--watched-icon"></i>
                                                </button>
                                                <input className="movie__modal--watched-input" type="number" name="watched" value={watched} />
                                                <button className="movie__modal--watched-button" type="button" onClick={() => setWatched(watched + 1)}>
                                                    <i className="fa-solid fa-plus movie__modal--watched-icon"/>
                                                </button>
                                            </span> : <input type="hidden" name="watched" value={1} />
                                        }
                                    </span>
                                    <span className="movie__modal--rating">
                                        <div className="movie__modal--rating-wrapper">
                                            <span className="movie__modal--rating-header">
                                                <label htmlFor="" className="movie__modal--rating-label">Rating</label>
                                                <p className="movie__modal--rating-rate">{rating / 2} out of 5</p>
                                            </span>
                                            <span className="movie__modal--rating-stars">
                                                {
                                                    Array.from({length: 5}, (_, index) => <button onClick={() => changeRating(index)} type="button" key={index} className="movie__modal--rating-button">
                                                        <i className={`fa-solid fa-star movie__modal--rating-${rating == 0 ? 'empty' : (rating / 2) >= index + 1 && Number.isInteger(rating / 2) ? 'star' : 'empty'}`}></i>
                                                    </button>  )
                                                }
                                            </span>
                                        </div>
                                        <label htmlFor="" className="movie__modal--rating-liked">
                                            <label htmlFor="" className="movie__modal--rating-label">Like</label>
                                            <i className={`fa-solid fa-heart movie__modal--rating-${liked ? 'heart' : 'icon'}`}/>
                                            <input className="movie__modal--rating-checkbox" type="checkbox" name="liked" onClick={() => setLiked(!liked)} value={liked ? 1 : 0} />
                                        </label>
                                    </span>
                                </div>
                            </span>
                            <span className="movie__modal--footer">
                                <button type="submit" className="movie__modal--submit">
                                    SAVE
                                </button>
                            </span>
                        </form>
                    </dialog>
                </>
                : null
        }
        </AuthenticatedLayout>
    );
}

export default MovieForm;