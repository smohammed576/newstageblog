import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import tags from "../../../data/tags.json";
import TagsModal from "@/Components/Modals/TagsModal";
import ReactMarkdown from "react-markdown";
import Markdown from "@/Components/Markdown";
import GreyInput from "@/Components/GreyInput";
import GreenButton from "@/Components/GreenButton";
import Checkbox from "@/Components/Checkbox";
import Heading from "@/Components/Heading";

function PostForm(){
    const stagepost = usePage().props.post;
    const [openModal, setOpenModal] = useState(false);
    const [tagsList, setTagsList] = useState([]);
    const { data, setData, post, patch, processing, error } = useForm({
         title: stagepost != null ? stagepost.title : '',
         intro: stagepost != null ? stagepost.intro :  '',
         content: stagepost != null ? stagepost.content :  '',
         image: stagepost != null ? stagepost.image :  '',
         type: stagepost != null ? stagepost.type :  'Reflectie',
         views: stagepost != null ? stagepost.views :  0,
         tags: stagepost != null ? stagepost.tags : [],
         stage: stagepost != null ? stagepost.stage :  1,
         published: stagepost != null ? stagepost.published :  true
    });
    const [formatted, setFormatted] = useState(false);


    useEffect(() => {
        if(openModal){
            document.querySelector('body').style.overflow = "hidden";
            
        }
        else{
            document.querySelector('body').style.overflow = "auto";
        }
    }, [openModal]);

    const selectTag = (value) => {
        if(!tagsList.includes(value)){
            setTagsList([...tagsList, value]);
        }
    }

    const submit = (event) => {
        event.preventDefault();
        if(stagepost != null){
            patch(route('posts.update', stagepost.id));
        }
        else{
            post(route('posts.store'));
        }
    }
    
    return (
        <AuthenticatedLayout>
            <Head title={stagepost != null ? `Edit ${stagepost.title}` : 'Create a new post'}/>
            <section className="newpost">
                <Heading text={stagepost != null ? 'EDIT POST' : 'NEW POST'}/>
                <form onSubmit={submit} className="newpost__form">
                    <span className="newpost__form--wrapper">
                        <div className="newpost__form--list">
                            <GreyInput label="Title" value={data.title} onChange={(event) => setData('title', event.target.value)}/>
                            <GreyInput label="Intro" value={data.intro} onChange={(event) => setData('intro', event.target.value)}/>
                            <GreyInput label="Image" value={data.image} onChange={(event) => setData('image', event.target.value)} format={true}/>
                            <div className="newpost__form--item">
                                <label htmlFor="" className="newpost__form--item-label">Post type</label>
                                <select name="type" value={data.type} onChange={(event) => setData('type', event.target.value)} id="" className="newpost__form--dropdown">
                                    <option value="Reflectie" className="newpost__form--dropdown-item">Reflectie</option>
                                    <option value="Other" className="newpost__form--dropdown-item">Andere</option>
                                </select>
                            </div>
                            <div className="newpost__form--item">
                                <label htmlFor="" className="newpost__form--item-label">Tags <button className="newpost__form--item-info" type="button" onClick={() => setOpenModal(!openModal)}><i className="fa-solid fa-info"></i> </button> </label>
                                <select value="" 
                                    onChange={(event) => {
                                        let item = event.target.value;
                                        if(item !== "—" && !data.tags.includes(item)){
                                            setData("tags", [...data.tags, item]);
                                        }
                                    }} className="newpost__form--dropdown">
                                    <option value="—" className="newpost__form--dropdown-item">—</option>
                                    {
                                        tags.map((item, index) => 
                                            <option key={index} value={item.name} className="newpost__form--dropdown-item">{item.name}</option>
                                        )
                                    }
                                </select>
                                {
                                    data.tags != null && data.tags.length != 0 ? 
                                        <ul className="newpost__form--item-tags">
                                            {
                                                data.tags.map((item, index) => 
                                                    <li key={index} className="newpost__form--item-tag">
                                                        {item}
                                                        <button onClick={() => setData('tags', data.tags.filter((tag) => tag !== item))} type="button" className="newpost__form--item-remove">
                                                            <i className="fa-solid fa-close newpost__form--item-icon"/>
                                                        </button>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="newpost__form--list">
                            <div className="newpost__form--item newpost__form--description">
                                <label htmlFor="" className="newpost__form--item-label">Description <button type="button" onClick={() => setFormatted(!formatted)} className="newpost__form--item-button">Format</button></label>
                                {
                                    formatted ?
                                    <article className="markdown">
                                        <ReactMarkdown components={Markdown}>
                                            {data.content}
                                        </ReactMarkdown>
                                    </article>
                                    :
                                    <textarea rows={20} name="content" id="" value={data.content} onChange={(event) => setData('content', event.target.value)} className="newpost__form--item-textarea"></textarea>

                                }
                            </div>
                        </div>
                    </span>
                    <span className="newpost__form--footer">
                        <span className="newpost__form--footer-wrapper">
                            <Checkbox value={data.stage} onChange={(event) => setData('stage', event.target.checked ? 2 : 1)} label={`STAGE ${data.stage}`}/>
                        </span>
                        <span className="newpost__form--footer-buttons">
                            <GreenButton processing={processing} text="CANCEL" isGray={true}/>
                            <GreenButton processing={processing} text="SAVE"/>
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