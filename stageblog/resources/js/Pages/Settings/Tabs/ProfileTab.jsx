import FavoriteModal from "@/Components/Modals/FavoriteModal";
import DataContext from "@/hooks/context/DataContext";
import { useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function SettingsProfileTab(){
    const user = usePage().props.auth.user;
    const favorites = usePage().props.favorites;
    const shows = usePage().props.shows;
    const {data, setData, processing, patch} = useForm({
        name: user.name ?? '',
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
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
        console.log('bae bae');
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
    }, []);


    const getFilm = async (id) => {
        const response = await findFilm(id);
        setFilms(prev => {
            const copy = [...prev];
            copy[selected] = response;
            return copy; 
        });
        setOpenModal(false);
    }

    const submit = (event) => {
        event.preventDefault();
        patch(route('profile.update'));
        if(status != null){
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        }
    }

    return (
        <>
        <form onSubmit={submit} className="settings__form">
            <h3 className="settings__form--text">Profile</h3>
            <span className="settings__form--wrapper">
                <div className="settings__details">
                    <div className="settings__details--item">
                        <label htmlFor="" className="settings__details--item-label">Username</label>
                        <input type="text" value={data.name} name="name" onChange={(event) => setData('name', event.target.value)} className="settings__details--item-input" />
                    </div>
                    <span className="settings__details--wrapper">
                        <div className="settings__details--item">
                        <label htmlFor="" className="settings__details--item-label">Given name</label>
                        <input type="text" value={data.first_name} name="first_name" onChange={(event) => setData('first_name', event.target.value)} className="settings__details--item-input" />
                    </div>
                    <div className="settings__details--item">
                        <label htmlFor="" className="settings__details--item-label">Family name</label>
                        <input type="text" value={data.last_name} name="last_name" onChange={(event) => setData('last_name', event.target.value)} className="settings__details--item-input" />
                    </div>
                    </span>
                    <div className="settings__details--item">
                        <label htmlFor="" className="settings__details--item-label">Email address</label>
                        <input type="text" value={data.email} name="email" onChange={(event) => setData('email', event.target.value)} className="settings__details--item-input" />
                    </div>
                    <span className="settings__details--wrapper">
                        <div className="settings__details--item">
                            <label htmlFor="" className="settings__details--item-label">Location</label>
                            <input type="text" value={data.location} name="location" onChange={(event) => setData('location', event.target.value)} className="settings__details--item-input" />
                        </div>
                        <div className="settings__details--item">
                            <label htmlFor="" className="settings__details--item-label">Website</label>
                            <input type="text" value={data.website} name="website" onChange={(event) => setData('website', event.target.value)} className="settings__details--item-input" />
                        </div>
                    </span>
                    <div className="settings__details--item">
                        <label htmlFor="" className="settings__details--item-label">Bio</label>
                        <textarea name="bio" id="" value={data.bio} onChange={(event) => setData('bio', event.target.value)} className="settings__details--item-input settings__details--item-textarea"></textarea>
                    </div>
                    <button disabled={processing} className="newpost__form--footer-button">SAVE CHANGES</button>
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
                                            item == null ? '+' : <img src={`${url}${item.poster}`} alt={item.title} className="settings__favorites--item-poster" />
                                        }
                                    </button>
                                        {
                                            item == null ? null : <button type="button" onClick={(event) => {
                                                event.preventDefault();
                                                return setFilms(prev => {
                                                    const copy = [...prev];
                                                    copy[selected] = null;
                                                    return copy;
                                                });
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
                                            item == null ? null : <button type="button" onClick={(event) => {
                                                event.preventDefault();
                                                return setSeries(prev => {
                                                    const copy = [...prev];
                                                    copy[selected] = null;
                                                    return copy;
                                                });
                                            }} className="settings__favorites--item-remove">
                                                <i className="fa-solid fa-close settings__favorites--item-icon"/>
                                            </button>
                                        }
                                </span>
                            )
                        }
                    </span>
                </aside>
            </span>
        </form>
            {
                openModal ? <FavoriteModal position={selected} onClick={(id) => getFilm(id)} type={type} onClose={() => setOpenModal(false)}/> : null
            }
            {
                showPopup && <div className="settings__popup">
                    <span className="settings__popup--message">
                        {status} View your <a href={route('profile.show', user.id)} className="settings__popup--message-link">profile</a>
                    </span>
                </div>
            }
        </>
    );
}

export default SettingsProfileTab;