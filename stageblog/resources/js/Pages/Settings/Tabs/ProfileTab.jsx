import GreenButton from "@/Components/GreenButton";
import InputWithShadow from "@/Components/Input";
import BackdropModal from "@/Components/Modals/BackdropModal";
import FavoriteModal from "@/Components/Modals/FavoriteModal";
import DataContext from "@/hooks/context/DataContext";
import { useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function SettingsProfileTab(){
    const user = usePage().props.auth.user;
    const favorites = usePage().props.favorites;
    const shows = usePage().props.shows;
    const {data, setData, processing, patch, delete: destroy} = useForm({
        id: 0,
        name: user.name ?? '',
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        backdrop: user.backdrop ?? '',
        email: user.email ?? '',
        location: user.location ?? '',
        website: user.website ?? '',
        bio: user.bio ?? ''
    });
    const status = usePage().props.status;
    const {findFilm} = useContext(DataContext);
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState();
    const [films, setFilms] = useState([null, null, null, null]);
    const [series, setSeries] = useState([null, null, null, null]);
    const url = import.meta.env.VITE_APP_URL;
    const [showPopup, setShowPopup] = useState(false);
    const [type, setType] = useState('');

    useEffect(() => {
        let list = [null, null, null, null];
        favorites.forEach(item => {
            list[item.position] = item;
        });
        setFilms(list);
        let seriesList = [null, null, null, null];
        shows.forEach(item => {
            seriesList[item.position] = item;
        });
        setSeries(seriesList);
    }, [favorites]);


    const getFilm = async (id) => {
        const response = await findFilm(id);
        setFilms(prev => {
            const copy = [...prev];
            copy[selected] = response;
            return copy; 
        });
        setOpenModal(false);
    }

    const submit = (event, id) => {
        event.preventDefault();
        if(id != null){
            if(event.target.id == 'film'){
                destroy(route('favorites.destroy', {id: id}));
            }
            else{
                destroy(route('shows.destroy', {id: id}));
            }
        }
        else{
            patch(route('profile.update'));
        }
        if(status != null){
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        }
    }

    useEffect(() => {
        if(openModal){
            document.querySelector('body').style.overflow = "hidden";
            
        }
        else{
            document.querySelector('body').style.overflow = "auto";
        }
    }, [openModal]);

    return (
        <>
        <form onSubmit={submit} className="settings__form">
            <h3 className="settings__form--text">Profile</h3>
            <span className="settings__form--wrapper">
                <div className="settings__details">
                    <InputWithShadow label="Username" value={data.name} onChange={(event) => setData('name', event.target.value)}/>
                    <span className="settings__details--wrapper">
                        <InputWithShadow label="Given name" value={data.first_name} onChange={(event) => setData('first_name', event.target.value)}/>
                        <InputWithShadow label="Family name" value={data.last_name} onChange={(event) => setData('last_name', event.target.value)}/>
                    </span>
                    <InputWithShadow label="Email address" value={data.email} onChange={(event) => setData('email', event.target.value)}/>
                    <span className="settings__details--wrapper">
                        <InputWithShadow label="Location" value={data.location} onChange={(event) => setData('location', event.target.value)}/>
                        <InputWithShadow label="Website" value={data.website} onChange={(event) => setData('website', event.target.value)}/>
                    </span>
                        <InputWithShadow label="Bio" value={data.bio} onChange={(event) => setData('bio', event.target.value)}/>
                    <GreenButton processing={processing} text="SAVE CHANGES"/>
                </div>
                <aside className="settings__favorites">
                    <span className="settings__favorites--heading">
                        <button type="button" className="settings__favorites--heading-button">FAVORITE FILMS</button>
                    </span>
                    <span className="settings__favorites--wrapper">
                        {
                            films.map((item, index) => 
                                <span key={index} className={`settings__favorites--item ${item == null && 'settings__favorites--item-empty'}`}>
                                    <button key={index} type="button" onClick={() => {
                                        setSelected(index);
                                        setType('movie');
                                        setOpenModal(true);
                                    }} className={`settings__favorites--item-button ${item == null && 'settings__favorites--item-empty'}`}>
                                        {
                                            item == null ? '+' : <img src={`${url}${item.movie.poster}`} alt={item.title} className="settings__favorites--item-poster" />
                                        }
                                    </button>
                                        {
                                            item == null ? null : <button type="submit" id="film" onClick={(event) => {
                                                event.preventDefault();
                                                submit(event, item.id);
                                                
                                                // return setFilms(prev => {
                                                //     const copy = [...prev];
                                                //     copy[selected] = null;
                                                //     return copy;
                                                // });
                                            }} className="settings__favorites--item-remove">
                                                <i className="fa-solid fa-close settings__favorites--item-icon"/>
                                            </button>
                                        }
                                </span>
                            )
                        }
                    </span>
                    <br />
                     <span className="settings__favorites--heading">
                        <button type="button" className="settings__favorites--heading-button">FAVORITE SHOWS</button>
                    </span>
                    <span className="settings__favorites--wrapper">
                        {
                            series.map((item, index) => 
                                <span key={index} className={`settings__favorites--item ${item == null && 'settings__favorites--item-empty'}`}>
                                    <button key={index} type="button" onClick={() => {
                                        setSelected(index);
                                        setType('tv');
                                        setOpenModal(true);
                                    }} className={`settings__favorites--item-button ${item == null && 'settings__favorites--item-empty'}`}>
                                        {
                                            item == null ? '+' : <img src={`${url}${item.poster}`} alt={item.title} className="settings__favorites--item-poster" />
                                        }
                                    </button>
                                        {
                                            item == null ? null : <button type="submit" id="tv" onClick={(event) => {
                                                event.preventDefault();
                                                submit(event, item.id);
                                                // return setSeries(prev => {
                                                //     const copy = [...prev];
                                                //     copy[selected] = null;
                                                //     return copy;
                                                // });
                                            }} className="settings__favorites--item-remove">
                                                <i className="fa-solid fa-close settings__favorites--item-icon"/>
                                            </button>
                                        }
                                </span>
                            )
                        }
                    </span>
                    <br />
                    <span className="settings__favorites--heading">
                        <button type="button" className="settings__favorites--heading-button">CUSTOM BACKDROP</button>
                    </span>
                    <span className="settings__favorites--backdrop">
                        <span onClick={() => {setType('backdrop'); setOpenModal(true);}} className="settings__favorites--backdrop-empty">
                        {
                            user.backdrop != null ? 
                            <img src={`${url}${user.backdrop}`} alt="" className="settings__favorites--backdrop-image" />
                            :
                            '+'
                        }
                        </span>
                    </span>
                </aside>
            </span>
        </form>
            {
                openModal ? type == 'backdrop' ? <BackdropModal selected={(path) => setData('backdrop', path)} onClose={() => setOpenModal(false)}/> : <FavoriteModal position={selected} onClick={(id) => getFilm(id)} type={type} onClose={() => setOpenModal(false)}/> : null
            }
            {
                showPopup && <div className="settings__popup">
                    <span className="settings__popup--message">
                        {status} View your <a href={route('profile.show', user)} className="settings__popup--message-link">profile</a>
                    </span>
                </div>
            }
        </>
    );
}

export default SettingsProfileTab;