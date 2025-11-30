import DataContext from "@/hooks/context/DataContext";
import Navigation from "@/Layouts/Navigation";
import { usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import MovieCastTab from "./Tabs/CastTab";

function MovieScreen(){
    const id = usePage().props.id;
    const {findFilm} = useContext(DataContext);
    const [film, setFilm] = useState();
    const url = import.meta.env.VITE_APP_URL;
    const [director, setDirector] = useState();
    const [tab, setTab] = useState(0);
    let tabs = ['CAST', 'CREW', 'DETAILS', 'GENRES', 'RELEASES'];
    useEffect(() => {
        if(film == null){
            (async () => {
                const response = await findFilm(id);
                setFilm(response);
                setDirector(response.credits.crew.find((item) => item.job === 'Director'));
                console.log(response);
            })();

        }
    }, []);
    
    return film ? (
        <>
            <Navigation props={true}/>
            <figure className="film__backdrop">
                {/* <div className="film__backdrop--image" style={{backgroundImage: `url(${url}/4PZuqUVwvxPCEMV8LYSAJLuxvcq.jpg)`}}></div> */}
                <div className="film__backdrop--image" style={{backgroundImage: `url(${url}${film.backdrop_path})`}}></div>
            </figure>
            <section className="film">
                <div className="film__aside">
                    <figure className="film__aside--figure">
                        <img src={`${url}${film.poster_path}`} alt="" className="film__aside--figure-poster" />
                    </figure>
                    <span className="film__aside--stats">

                    </span>
                </div>
                <div className="film__body">
                    <span className="film__heading">
                        <h1 className="film__heading--title">{film.title}</h1>
                        <h3 className="film__heading--year">{film.release_date.substring(0, 4)}</h3>
                        <span className="film__heading--wrapper">
                            <h3 className="film__heading--directed">Directed by </h3>
                            <h3 className="film__heading--directed-name">{director.name}</h3>
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
                                        tabs.map((item, index) => 
                                            <button onClick={() => setTab(index)} key={index} className={`film__tabs--tab ${tab == index && 'film__tabs--tab-active'}`}>{item}</button>
                                        )
                                    }
                                </span>
                                {
                                    tab == 0 && <MovieCastTab data={film.credits.cast}/>
                                }
                            </div>
                        </div>
                        <div className="film__actions">
                            j
                        </div>
                    </span>
                </div>
            </section>

        </>
    ) : null;
}

export default MovieScreen;