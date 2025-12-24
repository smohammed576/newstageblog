import DataContext from "@/hooks/context/DataContext";
import Navigation from "@/Layouts/Navigation";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import MovieCastTab from "./Tabs/CastTab";
import Footer from "@/Layouts/Footer";
import CustomModal from "@/Components/Modals/CustomModal";
import Backdrop from "@/Components/Backdrop";

function MovieScreen(){
    const user = usePage().props.auth.user;
    const id = usePage().props.id;
    const role = usePage().props.auth.role[0];
    const {findFilm} = useContext(DataContext);
    const [film, setFilm] = useState();
    const url = import.meta.env.VITE_APP_URL;
    const [director, setDirector] = useState();
    const [tab, setTab] = useState(0);
    const diaries = usePage().props.diaries;
    const watchlist = usePage().props.watchlist;
    const [isReady, setIsReady] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const movie = usePage().props.movie;
    let tabs = ['CAST', 'CREW', 'DETAILS', 'GENRES', 'RELEASES'];
    const { data, setData, processing, reset, post, patch, delete: destroy } = useForm({
        title: '',
        poster: movie != null ? movie.poster : '',
        backdrop: movie != null ? movie.backdrop : '',
        release: '',
        tmdb: id,
        liked: movie != null ? movie.liked : 0,
        type: 'movie',
        rating: movie != null ? movie.rating ?? 0 : 0
    });
    useEffect(() => {
        if(film == null){
            (async () => {
                const response = await findFilm(id);
                setFilm(response);
                setDirector(response.credits.crew.find((item) => item.job === 'Director'));
                setData('title', response.title);
                setData('poster', movie != null ? movie.poster : response.poster_path ?? '');
                setData('backdrop', movie != null ? movie.backdrop : response.backdrop_path ?? '');
                setData('release', response.release_date ?? '');
            })();

        }
    }, []);

    const submit = (event) => {
        event.preventDefault();
        if(event.nativeEvent.submitter != null && event.nativeEvent.submitter != undefined){
            if(event.nativeEvent.submitter.id == 'watchlist'){
                if(watchlist == null){
                    post(route('watchlist.store'));
                }
                else{
                    destroy(route('watchlist.destroy', watchlist.id));
                }
            }
            else if(event.nativeEvent.submitter.id == 'like'){
                if(movie == null){
                    setData('liked', 1);
                    setIsReady(true);
                }
                else{
                    if(movie.liked == 1){
                        // patch(route('movies.update', movie.id));
                        setData('liked', 0);
                        setIsReady(true);
                    }
                    else{
                        setData('liked', 1);
                        setIsReady(true);
                    }
                }
            }
            else if(event.nativeEvent.submitter.id == 'watch'){
                if(movie == null){
                    post(route('movies.store'));
                }
                else{
                    if(diaries.length == 0){
                        destroy(route('movies.destroy', movie.id));
                    }
                }
            }
        }
        else if(event.target.id == 'rating'){
            patch(route('movies.update', movie.id));
        }
    }

    useEffect(() => {
        if(isReady){
            if(movie != null){
                patch(route('movies.update', movie.id), {
                    onFinish: () => reset('liked')
                });
            }
            else{
                post(route('movies.store'), {
                    onFinish: () => reset('liked')
                });
            }
            setIsReady(false);
        }
    }, [isReady]);


    useEffect(() => {
        if(isOpen){
            document.querySelector('body').style.overflow = "hidden";
            
        }
        else{
            document.querySelector('body').style.overflow = "auto";
        }
    }, [isOpen]);
    
    return film ? (
        <>
            <Head title={film.title}/>
            <Navigation props={true}/>
            {
                film.backdrop_path != null && <Backdrop url={`${url}${movie != null ? movie.backdrop : film.backdrop_path}`}/>
            }
            <section className="film">
                <aside className="film__aside">
                    {
                        film.poster_path != null &&
                        <figure className="film__aside--figure">
                            <img src={`${url}${movie != null ? movie.poster : film.poster_path}`} alt={film.title} className="film__aside--figure-poster" />
                        </figure>
                    }
                    <span className="film__aside--stats">
                    </span>
                </aside>
                <div className="film__body">
                    <span className="film__heading">
                        <h1 className="film__heading--title">{film.title}</h1>
                        <span className="film__heading--wrapper">
                            <p className="film__heading--year">{film.release_date.substring(0, 4)}</p>
                            {
                                director != null && <span className="film__heading--credits">
                                    <p className="film__heading--directed">Directed by </p>
                                    <p className="film__heading--directed-name">{director.name}</p>
                                </span>
                            }
                        </span>
                    </span>
                    <span className="film__wrapper">
                        <div className="film__details">
                            <article className="film__details--wrapper">
                                <p className="film__details--tagline">{film.tagline}</p>
                                <p className="film__details--overview">{film.overview}</p>
                            </article>
                            <div className="film__tabs">
                                <span className="film__tabs--list">
                                    {
                                        //working on
                                        role.name == 'admin' ?
                                        tabs.map((item, index) => 
                                            <button onClick={() => setTab(index)} key={index} className={`film__tabs--tab ${tab == index && 'film__tabs--tab-active'}`}>{item}</button>
                                        )
                                        :
                                        <button onClick={() => setTab(0)} className={`film__tabs--tab film__tabs--tab-active`}>CAST</button>
                                    }
                                </span>
                                {
                                    tab == 0 && <MovieCastTab data={film.credits.cast}/>
                                }
                            </div>
                        </div>
                        <aside className="film__sidebar">
                            <div className="film__panel">
                                <div className="film__actions">
                                    <form onSubmit={submit} className="film__actions--form">
                                        <article className="film__actions--item">
                                            <button disabled={processing} type="submit" id="watch" className="film__actions--item-button">
                                                <img src={`/images/eye_${movie != null ? 'green' : 'empty'}.svg`} alt="eye icon" className="film__actions--item-icon" />
                                                <label htmlFor="" className="film__actions--item-label">{movie != null ? diaries.length != 0 ? 'Logged' : 'Watched' : 'Watch'}</label>
                                            </button>
                                        </article>
                                        <article className="film__actions--item">
                                            <button disabled={processing} type="submit" id="like" className="film__actions--item-button">
                                                <img src={`/images/heart_${movie != null && movie.liked ? 'orange' : 'empty'}.svg`} alt="heart icon" className="film__actions--item-icon" />
                                                <label htmlFor="" className="film__actions--item-label">{movie != null && movie.liked ? 'Liked' : 'Like'}</label>
                                            </button>
                                        </article>
                                        <article className="film__actions--item">
                                            <button disabled={processing} type="submit" id="watchlist" className="film__actions--item-button">
                                                <img src={`/images/watchlist_${watchlist != null ? 'blue' : 'empty'}.svg`} alt="watchlist icon" className="film__actions--item-icon"/>
                                                <label htmlFor="" className="film__actions--item-label">Watchlist</label>
                                            </button>
                                        </article>
                                    </form>
                                </div>
                                {
                                    //working on
                                    role.name == 'admin' && <div className="film__rating">
                                    <form onSubmit={submit} className="film__rating--form">
                                        {/* <label htmlFor="" className="film__rating--label">{diaries.length != 0 && diaries[diaries.length - 1].rating != null ? movie != null && movie.rating != null ? 'Rated' : 'Rate' : 'Rate'}</label> */}
                                        <label htmlFor="" className="film__rating--label">{movie != null && movie.rating != null && movie.rating != 0 ? 'Rated' : 'Rate'}</label>
                                        <div className="film__rating--stars">
                                            <div style={{width: data.rating * 18 + 'px'}} className="film__rating--stars-selected"></div>
                                            <input id="rating" type="range" min={0} max={10} step={1} value={data.rating} onClick={submit} onChange={(event) => setData('rating', event.target.value)} className="film__rating--stars-input" />
                                        </div>
                                    </form>
                                </div>
                                }
                                <ul className="film__panel--list">
                                    {
                                        film.images.posters.length > 0 &&
                                        <li className="film__panel--item">
                                            <button onClick={() => {setType('posters'); setIsOpen(true)}} className="film__panel--item-button">Change poster</button>
                                        </li>
                                    }
                                    {
                                        film.images.backdrops.length > 0 &&
                                        <li className="film__panel--item">
                                            <button onClick={() => {setType('backdrops'); setIsOpen(true)}} className="film__panel--item-button">Change backdrop</button>
                                        </li>
                                    }
                                    {
                                        movie != null || diaries.length != 0 || watchlist != null ?
                                        <li className="film__panel--item">
                                            <a href={route('activities.show', [user, film.id])} className="film__panel--item-link">Show your activity</a>
                                        </li> : null
                                    }
                                </ul>
                                
                            </div>
                        </aside>
                    </span>
                </div>
            </section>
            {
                isOpen && <CustomModal images={film.images} type={type} onClose={() => setIsOpen(false)}/>
            }
            <Footer/>
        </>
    ) : null;
}

export default MovieScreen;