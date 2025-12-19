import { useState } from "react";
import Markdown from "react-markdown";
import ReactMarkdown from "react-markdown";

const GreyInput = ({label, value, onChange, format}) => {
    const [formatImage, setFormatImage] = useState(false);
    return (
        <div className="greyinput">
            <label htmlFor="" className="greyinput__label">{label} {format && <button type="button" onClick={() => setFormatImage(!formatImage)} className="greyinput__label--button">Format</button>}</label>
            {
                formatImage ? 
                <article className="markdown">
                    <ReactMarkdown components={Markdown}>
                        {value}
                    </ReactMarkdown>
                </article>
                :
                <input type="text" value={value} onChange={onChange} className="greyinput__input" />

            }
        </div>
    );
}

export default GreyInput;