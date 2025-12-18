const GreenButton = ({text, onClick, processing, type}) => {
    return(
        <button disabled={processing} type={type} onClick={onClick} className="greenbutton">{text}</button>
    );
}

export default GreenButton;