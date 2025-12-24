const Poster = ({url, alt, route, width, onClick}) => {
    return (
         <div onClick={onClick} style={{width: width}} className="poster">
            {
                url != null ?
                <img src={url} alt={alt} className="poster__image" />
                :
                <span className="poster__empty">{alt}</span>

            }
            <a href={route} className="poster__overlay"></a>
        </div>
    );
}

export default Poster;