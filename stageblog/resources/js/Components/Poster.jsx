const Poster = ({url, alt, route, width}) => {
    return (
         <div style={{width: width}} className="poster">
            <img src={url} alt={alt} className="poster__image" />
            <a href={route} className="poster__overlay"></a>
        </div>
    );
}

export default Poster;