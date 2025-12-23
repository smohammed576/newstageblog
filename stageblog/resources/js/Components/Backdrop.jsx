const Backdrop = ({url}) => {
    return (
        <figure className="backdrop">
            {/* <div className="backdrop__image" style={{backgroundImage: `url(${url}/4PZuqUVwvxPCEMV8LYSAJLuxvcq.jpg)`}}></div> */}
            <div className="backdrop__image" style={{backgroundImage: `url(${url})`}}></div>
        </figure>
    );
}

export default Backdrop;