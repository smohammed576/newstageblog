const InputWithShadow = ({label, placeholder, whiteInput, type, value, onChange}) => {
    return (
        <div className="shadowinput">
            <label className="shadowinput__label">{label}</label>
            <input placeholder={placeholder} type={type != null ? type : 'text'} value={value} onChange={onChange} className={`shadowinput__input ${whiteInput && 'shadowinput__input--white'}`} />
        </div>
    );
}

export default InputWithShadow;