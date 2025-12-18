const Checkbox = ({value, onChange, label}) => {
    return (
        <label htmlFor="" className="checkbox">
            <input type="checkbox" className="checkbox__input" value={value} onChange={onChange}/>
            <span className="checkbox__mark"></span>
            {label}
        </label>
    );
}

export default Checkbox;