import { useState } from "react";
import tags from "../../data/tags.json";

function TagsModal({onClose}){
    const [isOpen, setIsOpen] = useState();
    return (
        <dialog onClose={onClose} closedby="closerequest" className="tags">
            <form method="dialog">
                <span className="tags__header">
                    <h3 className="tags__header--text">Tags</h3>
                    <button formMethod="dialog" onClick={onClose} className="tags__header--close">
                        <i className="fa-solid fa-close tags__header--close-icon"/>
                    </button>
                </span> 
                <div className="tags__body">
                    {
                        tags.map((item, index) => 
                            <article key={index} className="tags__item">
                                <span className="tags__item--wrapper">
                                    <h3 className="tags__item--name">{item.name}:</h3>
                                    <p className="tags__item--description">{item.description}</p>
                                    <button className="tags__item--button" onClick={() => setIsOpen(isOpen == index ? null : index)}>
                                        <i className={`fa-solid fa-chevron-${isOpen !== null && isOpen == index ? 'up' : 'down'} tags__item--button-icon`}></i>
                                    </button>
                                </span>
                                {
                                    isOpen !== null && isOpen == index ? 
                                        <div className="tags__item--info" key={index}>
                                            <ul className="tags__item--info-list">
                                                {
                                                    item.points.map((point, i) => 
                                                        <li className="tags__item--info-item" key={i}>{point}</li>
                                                    )
                                                }
                                            </ul>
                                            <p className="tags__item--info-goal">{item.goal}</p>
                                        </div>
                                    : null
                                }
                            </article>
                        )
                    }
                </div>
            </form>
        </dialog>
    );
}

export default TagsModal;