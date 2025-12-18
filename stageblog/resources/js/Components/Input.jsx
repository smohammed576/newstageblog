const InputWithShadow = ({label, value, onChange}) => {
    return (
        <div className="shadowinput">
            <label htmlFor="" className="shadowinput__label">{label}</label>
            <input type="text" value={value} onChange={(event) => onChange(event)} className="shadowinput__input" />
        </div>
    );
}

export default InputWithShadow;