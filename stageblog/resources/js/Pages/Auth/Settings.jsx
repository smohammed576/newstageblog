import FavoriteModal from "@/Components/FavoriteModal";
import DataContext from "@/hooks/context/DataContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useContext, useState } from "react";

function SettingsScreen(){
    const user = usePage().props.auth.user;
    const [username, setUsername] = useState(user.name);
    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [bio, setBio] = useState('');
    const {findFilm} = useContext(DataContext);
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState();
    const [films, setFilms] = useState([null, null, null, null]);
    const url = import.meta.env.VITE_APP_URL;

    const getFilm = async (id) => {
        const response = await findFilm(id);
        console.log(response);
        setFilms(prev => {
            const copy = [...prev];
            copy[selected] = response;
            return copy; 
        });
        setOpenModal(false);
    }

    return (
        <AuthenticatedLayout>
            <section className="settings">
                <span className="settings__heading">
                    <h2 className="settings__heading--text">Account Settings</h2>
                </span>
                <span className="settings__tabs">
                    <button className="settings__tabs--item settings__tabs--item-active">PROFILE</button>
                    <button className="settings__tabs--item">AUTH</button>
                    <button className="settings__tabs--item">AVATAR</button>
                    <button className="settings__tabs--item">CONNECTIONS</button>
                    <button className="settings__tabs--item">NOTIFICATIONS</button>
                    <button className="settings__tabs--item">STORES & STREAMING</button>
                    <button className="settings__tabs--item">DATA</button>
                </span>
                <form action="" className="settings__form">
                    <h3 className="settings__form--text">Profile</h3>
                    <span className="settings__form--wrapper">
                        <div className="settings__details">
                            <div className="settings__details--item">
                                <label htmlFor="" className="settings__details--item-label">Username</label>
                                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} className="settings__details--item-input" />
                            </div>
                            <span className="settings__details--wrapper">
                                <div className="settings__details--item">
                                <label htmlFor="" className="settings__details--item-label">Given name</label>
                                <input type="text" value={name} onChange={(event) => setName(event.target.value)} className="settings__details--item-input" />
                            </div>
                            <div className="settings__details--item">
                                <label htmlFor="" className="settings__details--item-label">Family name</label>
                                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className="settings__details--item-input" />
                            </div>
                            </span>
                            <div className="settings__details--item">
                                <label htmlFor="" className="settings__details--item-label">Email address</label>
                                <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} className="settings__details--item-input" />
                            </div>
                            <span className="settings__details--wrapper">
                                <div className="settings__details--item">
                                    <label htmlFor="" className="settings__details--item-label">Location</label>
                                    <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} className="settings__details--item-input" />
                                </div>
                                <div className="settings__details--item">
                                    <label htmlFor="" className="settings__details--item-label">Website</label>
                                    <input type="text" value={website} onChange={(event) => setWebsite(event.target.value)} className="settings__details--item-input" />
                                </div>
                            </span>
                            <div className="settings__details--item">
                                <label htmlFor="" className="settings__details--item-label">Bio</label>
                                <textarea name="" id="" value={bio} onChange={(event) => setBio(event.target.value)} className="settings__details--item-input settings__details--item-textarea"></textarea>
                            </div>
                            <button className="newpost__form--footer-button">SAVE CHANGES</button>
                        </div>
                        <aside className="settings__favorites">
                            <span className="settings__favorites--heading">
                                <button type="button" className="settings__favorites--heading-button">FAVORITE FILMS</button>
                            </span>
                            <span className="settings__favorites--wrapper">
                                {
                                    films.map((item, index) => 
                                        <span className={`settings__favorites--item ${item == null && 'settings__favorites--item-empty'}`}>
                                            <button key={index} type="button" onClick={() => {
                                                setSelected(index);
                                                setOpenModal(true);
                                            }} className={`settings__favorites--item-button ${item == null && 'settings__favorites--item-empty'}`}>
                                                {
                                                    item == null ? '+' : <img src={`${url}${item.poster_path}`} alt={item.title} className="settings__favorites--item-poster" />
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
                        </aside>
                    </span>
                </form>
            </section>
            {
                openModal ? <FavoriteModal onClick={(id) => getFilm(id)} onClose={() => setOpenModal(false)}/> : null
            }
        </AuthenticatedLayout>
    );
}

export default SettingsScreen;