import { useForm, usePage } from "@inertiajs/react";
import GreenButton from "../GreenButton";
import Checkbox from "../Checkbox";

function MovieModal({ film, onClose }){
    const user = usePage().props.auth.user;
    const url = import.meta.env.VITE_APP_URL;
    const {data, setData, post, processing} = useForm({
        title: film.title ?? '',
        poster: film.poster_path ?? '',
        backdrop: film.backdrop_path ?? '',
        tmdb: film.id ?? 0,
        user_id: user.id,
        rating: 0,
        liked: false,
        rewatched: false,
        release: film.release_date ?? '',
        type: 'movie'
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('diaries.store'));
    }

     const changeRating = (index) => {
        if(index == 0){
            setData('rating', data.rating == 1 ? 2 : 1);
        }
        else if(index == 1){
            setData('rating', data.rating == 3 ? 4 : 3);
        }
        else if(index == 2){
            setData('rating', data.rating == 5 ? 6 : 5);
        }
        else if(index == 3){
            setData('rating', data.rating == 7 ? 8 : 7);
        }
        else if(index == 4){
            setData('rating', data.rating == 9 ? 10 : 9);
        }
    }

    return (
        <>
            <div className="movie__overlay"></div>
            <dialog closedby="closerequest" onClose={onClose} open className="movie__modal">
                <form onSubmit={submit} className="movie__modal--form">
                    <span className="movie__modal--header">
                        <h3 className="movie__modal--header-text">I watched...</h3>
                        <button type="button" formMethod="dialog" className="movie__modal--header-close">
                            <i className="fa-solid fa-close"/>
                        </button>
                    </span>
                    <span className="movie__modal--body">
                        <a href={route("movies.show", film.id)} className="movie__modal--link">
                            <figure className="movie__modal--poster">
                                <img src={`${url}${film.poster_path}`} alt={film.title} className="movie__modal--poster-image" />
                            </figure>
                        </a>
                        <div className="movie__modal--body-wrapper">
                            <article className="movie__modal--text">
                                <h2 className="movie__modal--text-title">{film.title}</h2>
                                <h3 className="movie__modal--text-year">{film.release_date !== "" && film.release_date !== null ? film.release_date.substring(0, 4) : null}</h3>
                            </article>
                            <span className="movie__modal--wrapper">
                                <Checkbox value={data.rewatched ? 1 : 0} onChange={(event) => setData('rewatched', event.target.checked)} label="I've watched this before"/>
                                {/* {
                                    data.rewatched ? <span className="movie__modal--watched">
                                        <button className="movie__modal--watched-button" type="button" onChange={(event) => data.watched == 2 ? null : setData('watched', data.watched - 1)}>
                                            <i className="fa-solid fa-minus movie__modal--watched-icon"></i>
                                        </button>
                                        <input className="movie__modal--watched-input" type="number" name="watched" value={data.watched} onChange={(event) => setData('watched', event.target.valueAsNumber)}/>
                                        <button className="movie__modal--watched-button" type="button" onChange={() => setData('watched', data.watched + 1)}>
                                            <i className="fa-solid fa-plus movie__modal--watched-icon"/>
                                        </button>
                                    </span> : <input type="hidden" name="watched" value={data.watched} />
                                } */}
                            </span>
                            <span className="movie__modal--rating">
                                <div className="movie__modal--rating-wrapper">
                                    <span className="movie__modal--rating-header">
                                        <label htmlFor="" className="movie__modal--rating-label">Rating</label>
                                        <p className="movie__modal--rating-rate">{data.rating / 2} out of 5</p>
                                    </span>
                                    <span className="movie__modal--rating-stars">
                                        {
                                            Array.from({length: 5}, (_, index) => <button onClick={() => changeRating(index)} type="button" key={index} className="movie__modal--rating-button">
                                                <i className={`fa-solid fa-star movie__modal--rating-${data.rating == 0 ? 'empty' : (data.rating / 2) >= index + 1 && Number.isInteger(data.rating / 2) ? 'star' : 'empty'}`}></i>
                                            </button>  )
                                        }
                                    </span>
                                </div>
                                <label htmlFor="" className="movie__modal--rating-liked">
                                    <label htmlFor="" className="movie__modal--rating-label">Like</label>
                                    <i className={`fa-solid fa-heart movie__modal--rating-${data.liked ? 'heart' : 'icon'}`}/>
                                    <input className="movie__modal--rating-checkbox" type="checkbox" name="liked" onChange={(event) => setData('liked', event.target.checked)} value={data.liked ? 1 : 0} />
                                </label>
                            </span>
                        </div>
                    </span>
                    <span className="movie__modal--footer">
                        <GreenButton processing={processing} text="SAVE"/>
                    </span>
                </form>
            </dialog>
        </>
    );
}

export default MovieModal;