import FavoriteModal from "@/Components/Modals/FavoriteModal";
import DataContext from "@/hooks/context/DataContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";
import SettingsProfileTab from "./Tabs/ProfileTab";
import SettingsAuthTab from "./Tabs/AuthTab";
import SettingsAvatarTab from "./Tabs/AvatarTab";

function SettingsScreen(){
    const user = usePage().props.auth.user;
    // const {data, setData, processing} = useForm({
    //     'name': user.name ?? '',
    //     'first_name': user.first_name ?? '',
    //     'last_name': user.last_name ?? '',
    //     'email': user.email ?? '',
    //     'location': user.location ?? '',
    //     'website': user.website ?? '',
    //     'bio': user.bio ?? ''
    // });
    // const {findFilm} = useContext(DataContext);
    // const [openModal, setOpenModal] = useState(false);
    // const [selected, setSelected] = useState();
    // const [films, setFilms] = useState([null, null, null, null]);
    // const url = import.meta.env.VITE_APP_URL;
    const [tab, setTab] = useState(0);
    let tabs = ['PROFILE', 'AUTH', 'AVATAR', 'CONNECTIONS', 'NOTIFICATIONS', 'STORES & STREAMING', 'DATA'];

    // const getFilm = async (id) => {
    //     const response = await findFilm(id);
    //     console.log(response);
    //     setFilms(prev => {
    //         const copy = [...prev];
    //         copy[selected] = response;
    //         return copy; 
    //     });
    //     setOpenModal(false);
    // }

    return (
        <AuthenticatedLayout>
            <section className="settings">
                <span className="settings__heading">
                    <h2 className="settings__heading--text">Account Settings</h2>
                </span>
                <span className="settings__tabs">
                    {
                        tabs.map((item, index) => <button key={index} onClick={() => setTab(index)} className={`settings__tabs--item ${tab == index && 'settings__tabs--item-active'}`}>{item}</button> )
                    }
                </span>
                {
                    tab == 0 && 
                    <SettingsProfileTab />
                    || tab == 1 &&
                    <SettingsAuthTab />
                    || tab == 2 &&
                    <SettingsAvatarTab />
                }
                
            </section>
        </AuthenticatedLayout>
    );
}

export default SettingsScreen;