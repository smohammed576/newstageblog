import { useForm, usePage } from "@inertiajs/react";

function SettingsAuthTab(){
    const user = usePage().props.auth.user;
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
                <div className="settings__details--item">
                    <label htmlFor="" className="settings__details--item-label">Current password</label>
                    <input type="password" name="current_password" value={data.current_password} onChange={(event) => setData('current_password', event.target.value)} className="settings__details--item-input" />
                </div>
                <div className="settings__details--item">
                    <label htmlFor="" className="settings__details--item-label">New password</label>
                    <input type="password" name="password" value={data.password} onChange={(event) => setData('password', event.target.value)} className="settings__details--item-input" />
                </div>
                <div className="settings__details--item">
                    <label htmlFor="" className="settings__details--item-label">Confirm new password</label>
                    <input type="password" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} className="settings__details--item-input" />
                </div>
                <button disabled={processing} className="newpost__form--footer-button">CHANGE</button>
            </div>
        </form>
    );
}

export default SettingsAuthTab;