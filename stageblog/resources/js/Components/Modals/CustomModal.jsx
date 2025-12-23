import { useForm, usePage } from "@inertiajs/react";
import GreenButton from "../GreenButton";

function CustomModal({images, type, onClose}){
    console.log(usePage().props);
    const movie = usePage().props.movie;
    const id = usePage().props.id;
    console.log(images);
    const url = import.meta.env.VITE_APP_URL;
    const { data, setData, processing, reset, patch } = useForm({
        title: movie != null ? movie.title : '',
        backdrop: movie != null ? movie.backdrop : images.backdrops[0]?.file_path,
        poster: movie != null ? movie.poster : images.posters[0]?.file_path,
        tmdb: id
    });
    
    const submit = (event) => {
        event.preventDefault();
        patch(route('movies.update', movie.id));
        onClose();
    }

    return (
        <>
            <div className="overlay"></div>
            <dialog closedby="closerequest" open className="film__modal">
                <form onSubmit={submit} className="film__modal--form">
                    <span className="film__modal--header">
                        <h3 className="film__modal--header-text">Select your preferred {type.slice(0, -1)}</h3>
                        <button formMethod="dialog" type="button" className="film__modal--header-close" onClick={onClose}>
                            <i className="fa-solid fa-close film__modal--header-icon"/>
                        </button>
                    </span>
                    <div className="film__modal--body">
                        <div className="film__modal--wrapper">
                            {
                                type == 'posters' ?
                                images.posters.map((item, index) => 
                                    <span onClick={() => setData('poster', item.file_path)} className="film__modal--posters" key={index}>
                                        <img src={`${url}${item.file_path}`} alt="" className="film__modal--posters-image" />
                                    </span>
                                ) : 
                                images.backdrops.map((item, index) => 
                                    <span onClick={() => setData('backdrop', item.file_path)} className="film__modal--backdrops" key={index}>
                                        <img src={`${url}${item.file_path}`} alt="" className="film__modal--backdrops-image" />
                                    </span>
                                )
                            }
                        </div>
                        <aside className="film__modal--aside">
                            <img src={`${url}${type == 'posters' ? data.poster : data.backdrop}`} alt="" className={`film__modal--${type.slice(0, -1)}`} />
                        </aside>
                    </div>
                    <span className="film__modal--footer">
                        {
                            movie == null && <p className="film__modal--footer-text">You can't watched this movie yet</p>
                        }
                        <GreenButton processing={movie != null ? processing : true} text="SAVE CHANGES"/>
                    </span>
                </form>
            </dialog>
        </>
    );
}

export default CustomModal;