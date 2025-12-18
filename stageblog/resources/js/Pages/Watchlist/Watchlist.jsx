import Heading from "@/Components/Heading";
import DataContext from "@/hooks/context/DataContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function Watchlist(){
    const user = usePage().props.auth.user;
    const profile = usePage().props.user;
    const watchlist = usePage().props.watchlist;
    const {searchQuery} = useContext(DataContext);
    const [value, setValue] = useState('');
    const [films, setFilms] = useState([]);
    const url = import.meta.env.VITE_APP_URL;
    const { data, setData, processing, post, reset } = useForm({
        title: '',
        poster: '',
        release: '',
        tmdb: 0
    });

    const sendQuery = async (event) => {
        event.preventDefault();
        const response = await searchQuery(value, 'movie');
        console.log(response);
        setFilms(response.results);
    }
    
    console.log(usePage().props);

    console.log(watchlist);

    const randomFilm = () => {
        const random = Math.floor(Math.random() * watchlist.length);
        console.log(watchlist[random]);
        window.location.href = route('movies.show', watchlist[random].tmdb);
    }

    useEffect(() => {
        if(data.tmdb != 0){
            post(route('watchlist.store'), {
                onFinish: () => {
                    reset('title', 'poster', 'release', 'tmdb');
                    setValue('');
                    setFilms([]);
                }
            });
        }
    }, [data]);

    const submit = (event, film) => {
        event.preventDefault();
        setData('title', film.title);
        setData('poster', film.poster_path);
        setData('release', film.release_date);
        setData('tmdb', film.id);
    }

    return (
        <AuthenticatedLayout>
            <Head title={`${profile.name}'s watchlist`}/>
            <section className="watchlist">
                <div className={`watchlist__body ${user.id != profile.id && 'watchlist__body--full'}`}>
                    <Heading text={`${user.id == profile.id ? 'YOU WANT ' : `${profile.name.toUpperCase()} WANTS `} TO SEE ${watchlist.length} ${watchlist.length == 1 ? 'FILM' : 'FILMS'}`}/>
                    <div className="person__credits">
                        {
                            watchlist.map((item, index) => 
                                <a href={route('movies.show', item.tmdb)} className="person__credit" key={index}>
                                    <img src={`${url}${item.poster}`} title={item.title} alt={item.name} className="person__credit--poster" />
                                </a>
                            )
                        }
                    </div>
                </div>
                {
                    user.id == profile.id &&
                    <aside className="watchlist__aside">
                        <div className="watchlist__aside--wrapper">
                            <button onClick={randomFilm} className="watchlist__random">Random film</button>
                        </div>
                        <div className="watchlist__aside--wrapper">
                            <Heading text="ADD A FILM"/>
                            <form onSubmit={(event) => sendQuery(event)} className="favorite__modal--form">
                                <div className="favorite__modal--search">
                                    <input type="text" placeholder="Search films..." value={value} onChange={(event) => setValue(event.target.value)} className="settings__details--item-input" />
                                    {
                                        films.length != 0 ? 
                                            <ul className="favorite__modal--dropdown">
                                                {
                                                    films.map((item, index) => 
                                                        <li onClick={(event) => submit(event, item)} className="favorite__modal--dropdown-item" key={index}>
                                                            <p className="favorite__modal--dropdown-title">{item.title} ({item.release_date != null && item.release_date !== "" ? item.release_date.substring(0, 4) : ''})</p>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        : null
                                    }
                                </div>
                            </form>
                        </div>
                    </aside>
                }
            </section>
        </AuthenticatedLayout>
    );
}

export default Watchlist;