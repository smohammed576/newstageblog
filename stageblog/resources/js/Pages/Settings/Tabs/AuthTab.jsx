import GreenButton from "@/Components/GreenButton";
import InputWithShadow from "@/Components/Input";
import { useForm, usePage } from "@inertiajs/react";

function SettingsAuthTab(){
    const {data, setData, processing, put, reset} = useForm({
        'current_password': '',
        'password': '',
        'password_confirmation': ''
    });

    const submit = (event) => {
        event.preventDefault();
        put(route("password.update"), {
            onFinish: () => reset('current_password', 'password', 'password_confirmation')
        });
    };

    return (
        <form onSubmit={submit} className="settings__form">
            <h3 className="settings__form--text">Change password</h3>
            <div className="settings__details">
                <InputWithShadow label="Current password" value={data.current_password} onChange={(event) => setData('current_password', event.target.value)}/>
                <InputWithShadow label="New password" value={data.password} onChange={(event) => setData('password', event.target.value)}/>
                <InputWithShadow label="Confirm new password" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)}/>
                <GreenButton processing={processing} text="CHANGE"/>
            </div>
        </form>
    );
}

export default SettingsAuthTab;