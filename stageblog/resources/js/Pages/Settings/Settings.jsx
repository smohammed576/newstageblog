import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";
import SettingsProfileTab from "./Tabs/ProfileTab";
import SettingsAuthTab from "./Tabs/AuthTab";
import SettingsAvatarTab from "./Tabs/AvatarTab";
import ConstructionBanner from "@/Components/Construction";

function SettingsScreen(){
    const [tab, setTab] = useState(0);
    let tabs = ['PROFILE', 'AUTH', 'AVATAR'];

    return (
        <AuthenticatedLayout>
            <Head title="Account Settings"/>
            <ConstructionBanner/>
            <section style={{marginTop: '2rem'}} className="settings">
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


//delete settings shit
//change favs
//stageblog last week
//just do iit whatevergreougroiheogr