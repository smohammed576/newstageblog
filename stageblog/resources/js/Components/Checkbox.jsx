const Checkbox = ({value, onChange, label}) => {
    return (
        <label className="checkbox">
            <input type="checkbox" className="checkbox__input" checked={value} value={value} onChange={onChange}/>
            <span className="checkbox__mark"></span>
            {label}
        </label>
    );
}

export default Checkbox;