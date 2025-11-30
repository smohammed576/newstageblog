import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

function SettingsAvatarTab(){
    const user = usePage().props.auth.user;
    const path = usePage().props.status;
    console.log(usePage());
    const { data, setData, processing, reset, post, patch } = useForm({
        image: path != null ? `storage/${path}` : '',
        name: user.name,
        email: user.email
    });
    const [disable, setDisable] = useState(false);

    const submit = (event) => {
        event.preventDefault();
        if(path != null && disable){
            patch(route('profile.update'));
        }
        else{
            post(route('images.store'), {
                forceFormData: true
            });
        }
    }

    useEffect(() => {
        if(path != null){
            setData('image', `storage/${path}`);
            setDisable(true);
        }
    }, [path]);

    console.log(data);

    return (
        <form onSubmit={submit} encType={path != null ? "" : "multipart/form-data"} className="settings__form">
            <h3 className="settings__form--text">Avatar</h3>
            <div className="settings__avatar">
                <figure className="settings__avatar--wrapper">
                    <img src={path != null ? `storage/${path}` : user.image} alt={user.name} className="settings__avatar--image" />
                    <label className="settings__avatar--hover">
                        <p className="settings__avatar--hover-text">Drag and drop image</p>
                        <input onChange={(event) => setData('image', event.target.files[0])} type="file" />
                    </label>
                </figure>
                <span className="settings__avatar--footer">
                    <div className="settings__avatar--footer-empty"></div>
                    <button type="submit" className="newpost__form--footer-button">SELECT NEW AVATAR</button>
                    <button className="settings__avatar--footer-remove">Remove</button>
                </span>
            </div>
        </form>
    );
}

export default SettingsAvatarTab;