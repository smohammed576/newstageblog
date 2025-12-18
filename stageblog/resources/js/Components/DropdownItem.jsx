const DropdownItem = ({text, icon, onClick}) => {
    return (
        <button onClick={onClick} className="dropdown__item">
            {
                icon != null && <i className={`${icon} dropdown__item--icon`}/>
            }
            <p className="dropdown__item--text">{text}</p>
        </button>
    );
}

export default DropdownItem;