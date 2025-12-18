function ImageModal({url}){
    
    return (
        <>
            <div className="profile__overlay"></div>
            <dialog className="profile__modal">
                <span className="profile__modal--header">
                    <button className="profile__modal--header-button">
                        <i className="fa-solid fa-close profile__modal--header-icon"/>
                    </button>
                </span>
                <figure className="profile__modal--figure">
                    <img src={url} alt="" className="profile__modal--figure-image" />
                </figure>
            </dialog>
        </>
    );
}

export default ImageModal;