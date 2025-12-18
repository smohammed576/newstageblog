import DataContext from "@/hooks/context/DataContext";
import Navigation from "@/Layouts/Navigation";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import MovieCastTab from "./Tabs/CastTab";
import Footer from "@/Layouts/Footer";
import CustomModal from "@/Components/Modals/CustomModal";

function MovieScreen(){
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
    console.log(movie);
    let tabs = ['CAST', 'CREW', 'DETAILS', 'GENRES', 'RELEASES'];
    const { data, setData, processing, reset, post, patch, delete: destroy } = useForm({
        title: '',
        poster: movie != null ? movie.poster : '',
        backdrop: movie != null ? movie.backdrop : '',
        release: '',
        tmdb: id,
        liked: 0,
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
        console.log(event.nativeEvent.submitter);
        if(event.nativeEvent.submitter.id == 'watchlist'){
            if(watchlist == null){
                post(route('watchlist.store'));
            }
            else{
                console.log('this');
                destroy(route('watchlist.destroy', watchlist.id));
            }
        }
        else if(event.nativeEvent.submitter.id == 'like'){
            console.log('atleuvhfoilfn');
            if(movie == null){
                setData('liked', 1);
                setIsReady(true);
            }
            else{
                if(movie.liked == 1){
                    console.log("here righttt");
                    patch(route('movies.update', movie.id));
                }
                else{
                    console.log("main thing");
                    setData('liked', 1);
                    setIsReady(true);
                }
            }
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
                console.log("here yk an dnow");
                post(route('movies.store'));
            }
            setIsReady(false);
        }
    }, [isReady]);

    // const starsWidth = () => {
    //     let number = 7.2;
    //     let space = 1.8;
    //     if(data.rating == 0){
    //         return number * data.rating;
    //     }
    //     else if(data.rating == 1){
    //         return number * data.rating;
    //     }
    //     else if(data.rating == 2){
    //         return number * data.rating;
    //     }
    //     else if(data.rating == 3){
    //         return (number * data.rating) + space;
    //     }
    //     else if(data.rating == 4){
    //         return (number * data.rating) + space;
    //     }
    //     else if(data.rating == 5){
    //         return (number * data.rating) + (space * 2);
    //     }
    //     else if(data.rating == 6){
    //         return (number * data.rating) + (space * 2);
    //     }
    //     else if(data.rating == 7){
    //         return (number * data.rating) + (space * 3);
    //     }
    //     else if(data.rating == 8){
    //         return (number * data.rating) + (space * 3);
    //     }
    //     else if(data.rating == 9){
    //         return (number * data.rating) + (space * 4);
    //     }
    //     else if(data.rating == 10){
    //         return (number * data.rating) + (space * 4);
    //     }
    // }
    
    return film ? (
        <>
            <Head title={film.title}/>
            <Navigation props={true}/>
            <figure className="film__backdrop">
                {/* <div className="film__backdrop--image" style={{backgroundImage: `url(${url}/4PZuqUVwvxPCEMV8LYSAJLuxvcq.jpg)`}}></div> */}
                <div className="film__backdrop--image" style={{backgroundImage: `url(${url}${movie != null ? movie.backdrop : film.backdrop_path})`}}></div>
            </figure>
            <section className="film">
                <aside className="film__aside">
                    <figure className="film__aside--figure">
                        <img src={`${url}${movie != null ? movie.poster : film.poster_path}`} alt={film.title} className="film__aside--figure-poster" />
                    </figure>
                    <span className="film__aside--stats">

                    </span>
                </aside>
                <div className="film__body">
                    <span className="film__heading">
                        <h1 className="film__heading--title">{film.title}</h1>
                        <span className="film__heading--wrapper">
                            <p className="film__heading--year">{film.release_date.substring(0, 4)}</p>
                            <p className="film__heading--credits">
                                <p className="film__heading--directed">Directed by </p>
                                <p className="film__heading--directed-name">{director.name}</p>
                            </p>
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
                                    <form action="" className="film__rating--form">
                                        <label htmlFor="" className="film__rating--label">{diaries.length != 0 && diaries[diaries.length - 1].rating != null ? 'Rated' : 'Rate'}</label>
                                        <div className="film__rating--wrapper">
                                            <input type="range" className="film__rating--range" min={0} step={1} max={10} value={data.rating} onChange={(event) => setData('rating', event.target.value)} />
                                            <div className="film__rating--slider" role="slider" aria-valuemin={0} aria-valuemax={10} aria-valuenow={data.rating}>
                                                <span className="film__rating--empty"></span>
                                                <span style={{ width: `${(data.rating) * 18}px`, height: 40 + 'px' }} className="film__rating--hover"></span>
                                            </div>
                                            {/* <input type="range" className="film__rating--range" min={0} step={1} max={10} value={data.rating} onMouseEnter={(event) => console.log(event.target)} onChange={(event) => setData('rating', event.target.valueAsNumber)} />
                                            <img src="/images/stars_grey.svg" alt="" className="film__rating--empty" />
                                            <img src="/images/stars_blue.svg" alt="" className="film__rating--hover-stars" />
                                            <span style={{width: starsWidth() + '%'}} className="film__rating--hover">
                                            </span> */}
                                        </div>
                                        {/* style={{width: data.rating * 10 + '%'}} */}

                                    </form>
                                </div>
                                }
                                <ul className="film__panel--list">
                                    <li className="film__panel--item">
                                        <button onClick={() => {setType('posters'); setIsOpen(true)}} className="film__panel--item-button">Change poster</button>
                                    </li>
                                    <li className="film__panel--item">
                                        <button onClick={() => {setType('backdrops'); setIsOpen(true)}} className="film__panel--item-button">Change backdrop</button>
                                    </li>
                                </ul>
                                {/* <button onClick={() => {setType('posters'); setIsOpen(true)}}>custom poster</button>
                                <button onClick={() => {setType('backdrops'); setIsOpen(true)}}>custom backdrop</button> */}
                                
                            </div>
                        </aside>
                    </span>
                </div>
            </section>
            {
                isOpen && <CustomModal images={film.images} type={type} onClose={() => isOpen(false)}/>
            }
            <Footer/>
        </>
    ) : null;
}

export default MovieScreen;