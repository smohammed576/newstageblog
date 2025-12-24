import DataContext from "@/hooks/context/DataContext";
import Navigation from "@/Layouts/Navigation";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import CustomModal from "@/Components/Modals/CustomModal";
import MovieCastTab from "../Movies/Tabs/CastTab";
import Backdrop from "@/Components/Backdrop";

function ShowScreen(){
    const role = usePage().props.auth.role;
    const id = usePage().props.id;
    const {findShow} = useContext(DataContext);
    const [show, setShow] = useState(null);
    const url = import.meta.env.VITE_APP_URL;
    const [tab, setTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    let tabs = ['CAST', 'CREW', 'SEASONS', 'MEDIA', 'SIMILAR SHOWS'];
    
    useEffect(() => {
        if(show == null){
            (async () => {
                const result = await findShow(id);
                setShow(result);
            })();
        }
    }, []);

    return show != null && (
        <>
        <Head title={show.name}/>
         <Navigation props={true}/>
         {
            show.backdrop_path != null && <Backdrop url={`${url}${show.backdrop_path}`}/>
         }
            <section className="film">
                <aside className="film__aside">
                    <figure className="film__aside--figure">
                        <img src={`${url}${show.poster_path}`} alt={show.name} className="film__aside--figure-poster" />
                    </figure>
                </aside>
                <span className="film__body">
                    <span className="film__heading">
                        <h1 className="film__heading--title">{show.name}</h1>
                        <span className="film__heading--wrapper">
                            <p className="film__heading--year">{show.first_air_date.substring(0, 4)}</p>
                            <p className="film__heading--credits">
                                <p className="film__heading--directed">Created by </p>
                                {
                                    show.created_by.map((item, index) => 
                                        <p key={index} className="film__heading--directed-name">{item.name}{index != show.created_by.length - 1 ? ', ' : ''}</p>
                                    )
                                }
                            </p>
                        </span>
                    </span>
                    <span className="film__wrapper">
                        <div className="film__details">
                            <article className="film__details--wrapper">
                                <p className="film__details--tagline">{show.tagline}</p>
                                <p className="film__details--overview">{show.overview}</p>
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
                                        <button className={`film__tabs--tab film__tabs--tab-active`}>{tabs[0]}</button>
                                    }
                                </span>
                                {
                                    // tab == 0 && <ShowSeasonsTab/>
                                    tab == 0 && <MovieCastTab data={show.credits.cast} />
                                }
                            </div>
                        </div>
                        <aside className="film__sidebar">
                            <div className="film__panel">
                                <div className="film__actions">

                                </div>
                                <ul className="film__panel--list">
                                    <li className="film__panel--item">
                                        <button onClick={() => {setType('posters'); setIsOpen(true)}} className="film__panel--item-button">Change poster</button>
                                    </li>
                                    <li className="film__panel--item">
                                        <button onClick={() => {setType('backdrops'); setIsOpen(true)}} className="film__panel--item-button">Change backdrop</button>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                        {/* <button onClick={() => {setType('posters'); setIsOpen(true)}}>custom poster</button>
                        <button onClick={() => {setType('backdrops'); setIsOpen(true)}}>custom backdrop</button>
                        <div className="film__actions">b</div> */}
                    </span>
                </span>
            {/* <Navigation props={true}/>
            <figure className="film__backdrop">
                <div className="film__backdrop--image" style={{backgroundImage: `url(${url}${show.backdrop_path})`}}></div>
            </figure>
            <section className="show">
                <aside className="show__aside">
                    <img src={`${url}${show.poster_path}`} alt="" className="show__poster" />
                </aside>
                <span className="show__body">
                    <span className="show__heading">
                        <h1 className="show__heading--name">{show.name}</h1>
                        <h3 className="show__heading--year">{show.first_air_date.substring(0, 4)}</h3>
                        <span className="show__heading--wrapper">
                            <h3 className="show__heading--created">Created by </h3>
                            {
                                show.created_by.map((item, index) => 
                                    <h3 key={index} className="show__heading--created-name">{item.name}{index != show.created_by.length - 1 ? ', ' : ''}</h3>
                                )
                            }
                        </span>
                    </span>
                </span> */}
                {/* <div className="show__body">
                    <span className="show__heading">
                        <article className="show__heading--wrapper">
                            <h1 className="show__heading--name">{show.name}</h1>
                            <span className="show__heading--info">
                                {show.first_air_date.substring(0, 4)} · {show.number_of_seasons} {show.number_of_seasons == 1 ? 'season' : 'seasons'} · {show.genres.map((item, index) => `${item.name}${index != show.genres.length - 1 ? ', ' : ''}`)} · {show.content_ratings != null && show.content_ratings.results.length != 0 ? show.content_ratings.results.find((item) => item.iso_3166_1 == 'NL' ?? item.iso_3166_1 == 'US').rating : ''}
                            </span>
                        </article>
                    </span>
                <span className="show__wrapper">
                    <div className="show__details">
                        <p className="show__heading--tagline">{show.tagline}</p>
                        <p className="show__heading--overview">{show.overview}</p>
                        <div className="film__tabs">
                            <span className="film__tabs--list">
                                {
                                    tabs.map((item, index) => 
                                        <button onClick={() => setTab(index)} key={index} className={`film__tabs--tab ${tab == index && 'film__tabs--tab-active'}`}>{item}</button>
                                    )
                                }
                            </span>
                        </div>
                    </div>
                    <aside className="show__aside">
                            <span className="show__aside--details">
                                <p className="show__aside--details-amount">{show.number_of_seasons}</p>
                                <p className="show__aside--details-text">{show.number_of_seasons == 1 ? 'season' : 'seasons'}, </p>
                                <p className="show__aside--details-amount">{show.number_of_episodes}</p>
                                <p className="show__aside--details-text">{show.number_of_episodes == 1 ? 'episode' : 'episodes'}</p>
                            </span>
                            <div className="show__info">
                                <article className="show__info--item">
                                    <p className="show__info--item-label">Episode run time</p>
                                    <p className="show__info--item-text">{show.episode_runtime ?? 'N/A'}</p>
                                </article>
                                <article className="show__info--item">
                                    <p className="show__info--item-label">Next episode</p>
                                    <p className="show__info--item-text">{show.next_episode_to_air?.air_date ?? 'N/A'}</p>
                                </article>
                                <article className="show__info--item">
                                    <p className="show__info--item-label">Premiere</p>
                                    <p className="show__info--item-text">{show.first_air_date ?? 'N/A'}</p>
                                </article>
                                <article className="show__info--item">
                                    <p className="show__info--item-label">Last aired</p>
                                    <p className="show__info--item-text">{show.last_air_date ?? 'N/A'}</p>
                                </article>
                                <article className="show__info--item">
                                    <p className="show__info--item-label">Status</p>
                                    <p className="show__info--item-text">{show.status ?? 'N/A'}</p>
                                </article>
                            </div>
                            <div className="show__genres">
                                <p className="show__genres--text">Genres</p>
                                <span className="show__genres--wrapper">
                                    {
                                        show.genres != null && show.genres.length != 0 ? 
                                        show.genres.map((item, index) => 
                                            <button className="show__genres--item" key={index}>{item.name}</button>
                                    )
                                    : null
                                }
                                </span>
                            </div>
                        </aside>
                    </span>
                </div> */}
            </section>
            {
                isOpen && <CustomModal images={show.images} type={type} onClose={() => isOpen(false)}/>
            }
        </>
    );
}

export default ShowScreen;