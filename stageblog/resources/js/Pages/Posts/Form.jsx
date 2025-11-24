import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import tags from "../../../data/tags.json";
import TagsModal from "@/Components/TagsModal";

function PostForm(){
    const user = usePage().props.auth.user;
    const csrf = document.querySelector("meta[name=csrf-token]").getAttribute("content");
    const [stage, setStage] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [tagsList, setTagsList] = useState([]);

    useEffect(() => {
        if(openModal){
            document.querySelector('body').style.overflow = "hidden";
            
        }
        else{
            document.querySelector('body').style.overflow = "auto";
        }
    }, [openModal]);

    const selectTag = (value) => {
        console.log(value);
        if(!tagsList.includes(value)){
            console.log("this again");
            setTagsList([...tagsList, value]);
        }
    }
    
    return (
        <AuthenticatedLayout>
            <section className="newpost">
                <span className="newpost__header">
                    <p className="newpost__header--text">NEW POST</p>
                </span>
                <form action={route('posts.store')} method="post" className="newpost__form">
                    <input type="hidden" name="_token" value={csrf} />
                    <input type="hidden" name="user_id" value={user.id} />
                    <input type="hidden" name="published" value={1} />
                    <input type="hidden" name="views" value={0} />
                    <span className="newpost__form--wrapper">
                        <div className="newpost__form--list">
                            <div className="newpost__form--item">
                                <label htmlFor="" className="newpost__form--item-label">Title</label>
                                <input type="text" name="title" className="newpost__form--item-input" />
                            </div>
                            <div className="newpost__form--item">
                                <label htmlFor="" className="newpost__form--item-label">Intro</label>
                                <input type="text" name="tagline" className="newpost__form--item-input" />
                            </div>
                            <div className="newpost__form--item">
                                <label htmlFor="" className="newpost__form--item-label">Image</label>
                                <input type="text" name="image" className="newpost__form--item-input" />
                            </div>
                            <div className="newpost__form--item">
                                <label htmlFor="" className="newpost__form--item-label">Post type</label>
                                <select name="type" id="" className="newpost__form--dropdown">
                                    <option value="Reflectie" className="newpost__form--dropdown-item">Reflectie</option>
                                    <option value="Andere" className="newpost__form--dropdown-item">Andere</option>
                                </select>
                            </div>
                            <div className="newpost__form--item">
                                <label htmlFor="" className="newpost__form--item-label">Tags <button className="newpost__form--item-info" type="button" onClick={() => setOpenModal(!openModal)}><i className="fa-solid fa-info"></i> </button> </label>
                                <select value={tagsList.length == 0 ? 0 : null} onChange={(event) => selectTag(event.target.value)} name="tags" id="" className="newpost__form--dropdown">
                                    <option value="—" className="newpost__form--dropdown-item">—</option>
                                    {
                                        tags.map((item, index) => 
                                            <option key={index} value={item.name} className="newpost__form--dropdown-item">{item.name}</option>
                                        )
                                    }
                                </select>
                                {
                                    tagsList.length != 0 ? 
                                        <ul className="newpost__form--item-tags">
                                            {
                                                tagsList.map((item, index) => 
                                                    <li key={index} className="newpost__form--item-tag">
                                                        {item}
                                                        <button onClick={() => setTagsList(tagsList.filter((tag) => tag !== item))} type="button" className="newpost__form--item-remove">
                                                            <i className="fa-solid fa-close newpost__form--item-icon"/>
                                                        </button>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    : null
                                }
                                <input type="hidden" value={tagsList.join()} name="tags"/>
                            </div>
                        </div>
                        <div className="newpost__form--list">
                            <div className="newpost__form--item newpost__form--description">
                                <label htmlFor="" className="newpost__form--item-label">Description</label>
                                <textarea name="content" id="" className="newpost__form--item-textarea"></textarea>
                            </div>
                        </div>
                    </span>
                    <span className="newpost__form--footer">
                        <span className="newpost__form--footer-wrapper">
                            <input type="checkbox" name="stage" value={stage ? 1 : 0} onClick={() => setStage(!stage)} className="newpost__form--footer-checkbox" />
                            <label htmlFor="" className="newpost__form--footer-label">STAGE</label>
                        </span>
                        <span className="newpost__form--footer-buttons">
                            <button className="newpost__form--footer-button newpost__form--footer-cancel">CANCEL</button>
                            <button className="newpost__form--footer-button">SAVE</button>
                        </span>
                    </span>
                </form>
            </section>
            {
                openModal ? 
                    <>
                        <div className="movie__overlay"></div>
                        <TagsModal onClose={() => setOpenModal(false)}/>
                    </>
                : null
            }
        </AuthenticatedLayout>
    );
}

export default PostForm;