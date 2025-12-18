const Tag = ({tag, onClick}) => {
    return (
        <article className="tag">
            {tag}
            {
                onClick != null && <button onClick={onClick} className="tag__button">
                    <i className="fa-solid fa-close tag__button--icon"/>
                </button>
            }
        </article>
    );
}

export default Tag;