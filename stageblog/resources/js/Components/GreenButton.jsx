const GreenButton = ({text, onClick, processing, type, isGray}) => {
    return(
        <button disabled={processing} type={type} onClick={onClick} className={`greenbutton ${isGray && 'greenbutton__isGrey'}`}>{text}</button>
    );
}

export default GreenButton;