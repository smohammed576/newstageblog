import FavoriteModal from "@/Components/Modals/FavoriteModal";
import DataContext from "@/hooks/context/DataContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";
import SettingsProfileTab from "./Tabs/ProfileTab";
import SettingsAuthTab from "./Tabs/AuthTab";
import SettingsAvatarTab from "./Tabs/AvatarTab";

function SettingsScreen(){
    const user = usePage().props.auth.user;
    const [tab, setTab] = useState(0);
    let tabs = ['PROFILE', 'AUTH', 'AVATAR'];

    return (
        <AuthenticatedLayout>
            <Head title="Account Settings"/>
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