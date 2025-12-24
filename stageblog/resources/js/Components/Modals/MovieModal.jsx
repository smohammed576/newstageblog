import { useForm, usePage } from "@inertiajs/react";
import GreenButton from "../GreenButton";
import Checkbox from "../Checkbox";
import { useEffect, useState } from "react";
import Poster from "../Poster";

function MovieModal({ film, onClose }){
    const user = usePage().props.auth.user;
    const movies = usePage().props.movies;
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
        type: 'movie',
        watched_at: new Date()
    });
    const [diary, setDiary] = useState(true);
    const diaries = usePage().props.diaries;

    useEffect(() => {
        if(movies.length != 0){
            movies.find((item) => {
                if(item.tmdb == film.id){
                    setData('poster', item.poster);
                    setData('rating', item.rating ?? 0);
                    setData('liked', item.liked);
                    if(diaries.length != 0){
                        if(diaries.find((diary) => diary.tmdb == film.id)){
                            setData('rewatched', true);
                        }
                    }
                }
            });
        }
    }, []);

    const submit = (event) => {
        event.preventDefault();
        if(diary){
            post(route('diaries.store'));
        }
        else{
            post(route('movies.store'));
        }
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-UK', {day: "2-digit", month: "short", year: "numeric"});
    }

    return (
        <>
            <div className="movie__overlay"></div>
            <dialog closedby="closerequest" onClose={onClose} open className="movie__modal">
                <form onSubmit={submit} className="movie__modal--form">
                    <span className="movie__modal--header">
                        <h3 className="movie__modal--header-text">I watched...</h3>
                        <button onClick={onClose} type="button" formMethod="dialog" className="movie__modal--header-close">
                            <i className="fa-solid fa-close"/>
                        </button>
                    </span>
                    <span className="movie__modal--body">
                        <div className="movie__modal--link">
                            <Poster url={film.poster_path != null ? `${url}${film.poster_path}` : null} alt={film.title} route={route("movies.show", film.id)}/>
                        </div>
                        <div className="movie__modal--body-wrapper">
                            <article className="movie__modal--text">
                                <h2 className="movie__modal--text-title">{film.title}</h2>
                                <h3 className="movie__modal--text-year">{film.release_date !== "" && film.release_date !== null ? film.release_date.substring(0, 4) : null}</h3>
                            </article>
                            {
                                diary ? 
                                <span className="movie__modal--wrapper">
                                    <span className="movie__modal--date">
                                        <Checkbox value={diary} onChange={(event) => setDiary(event.target.checked)} label="Watched on"/>
                                        <label className="movie__modal--date-label">
                                            <button type="button" className="movie__modal--date-button">{formatDate(data.watched_at)}</button>
                                            <input type="date" max={new Date().toISOString().split('T')[0]} onChange={(event) => setData('watched_at', event.target.valueAsDate)} onClick={(event) => event.currentTarget.showPicker()} className="movie__modal--date-input"/>
                                        </label>
                                        
                                    </span>
                                    <Checkbox value={data.rewatched ? 1 : 0} onChange={(event) => setData('rewatched', event.target.checked)} label="I've watched this before"/>
                                </span>
                                : 
                                <span className="movie__modal--wrapper">
                                    <Checkbox value={diary} onChange={(event) => setDiary(event.target.checked)} label="Add to your diary?"/>
                                </span>
                            }
                            <span className="movie__modal--rating">
                                <div className="movie__modal--rating-wrapper">
                                    <span className="movie__modal--rating-header">
                                        <label htmlFor="" className="movie__modal--rating-label">Rating</label>
                                        <p className="movie__modal--rating-rate">{data.rating / 2} out of 5</p>
                                    </span>
                                    <span className="movie__modal--rating-stars">
                                        <div className="movie__modal--rating-selected" style={{width: data.rating * 13 + 'px'}}></div>
                                        <input type="range" value={data.rating} min={0} max={10} step={1} onChange={(event) => setData('rating', event.target.value)} className="movie__modal--rating-input" />
                                    </span>
                                </div>
                                <label htmlFor="" className="movie__modal--rating-liked">
                                    <label htmlFor="" className="movie__modal--rating-label">Like</label>
                                    <span className={data.liked ? 'movie__modal--rating-active' : 'movie__modal--rating-heart'}></span>
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