const Heading = (props) => {
    return (
        <>
            <h2 className="heading">{props.text}</h2>
            {
                props.link != null && <a href={props.link} className="heading__link">{props.linkText}</a>
            }
            {
                props.button != null && <button type="button" onClick={props.button} className="heading__button">{props.buttonText}</button>
            }
        </>
    );
}

export default Heading;