import Markdown, { ImageMarkdown, PostMarkdown } from "@/Components/Markdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navigation from "@/Layouts/Navigation";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function PostScreen(){
    const user = usePage().props.auth.user;
    const stagepost = usePage().props.post;
    const comments = usePage().props.post.comments;
    const next = usePage().props.next;
    const prev = usePage().props.prev;
    const { data, setData, post, processing, reset } = useForm({
        comment: '',
        like: null
    });
    const [comment, setComment] = useState();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"});
    }

    useEffect(() => {
        if(data.like != null){
            post(route('actions.store', comment), {
                onFinish: () => reset('like')
            });
        }
    }, [comment]);

    const submit = (event) => {
        event.preventDefault();
        post(route('comments.store', stagepost), {
            onFinish: () => reset('comment')
        });
    }

    const action = (event, comment, value) => {
        event.preventDefault();
        setData('like', value);
        setComment(comment);
    }
    
    return (
        <>
            <Head title={stagepost.title.slice(0, -1)}/>
            <Navigation/>
            <main className="main__post">
                    <div className="post__heading">
                        <p className="post__heading--details">
                            {stagepost.type} · Stage {stagepost.stage == 1 ? 'one' : 'two'} {user.id == stagepost.user_id && ` · ${stagepost.views} ${stagepost.views == 1 ? 'view' : 'views'}`}
                        </p>
                        <h1 className="post__heading--title">
                            {stagepost.title.slice(0, -1)}: {stagepost.intro}
                        </h1>
                        <span className="post__heading--wrapper">
                            <img src={stagepost.user.image} alt="" className="post__heading--image" />
                            <a href={route('profile.show', stagepost.user)} className="post__heading--user">{stagepost.user.name}</a>
                            <p className="post__heading--dot">·</p>
                            <p className="post__heading--date">{formatDate(stagepost.created_at)}</p>
                            {
                                user.id == stagepost.user_id && <a href={route('posts.edit', stagepost)} className="post__heading--edit"><i className="fa-solid fa-pen post__heading--edit-icon"/></a>
                            }
                        </span>
                    </div>
                <section className="post">
                    <figure className="post__wrapper">
                        <ReactMarkdown components={ImageMarkdown}>
                            {stagepost.image}
                        </ReactMarkdown>
                    </figure>
                    <article className="post__markdown">
                        <ReactMarkdown components={PostMarkdown}>
                            {stagepost.content}
                        </ReactMarkdown>
                    </article>
                    <div className="post__tags">
                        <p className="post__tags--text">TAGS</p>
                        {
                            stagepost.tags != null && stagepost.tags.length != 0 ? 
                                stagepost.tags.map((item, index) => <a href={route('posts.filter', item)} key={index} className="post__tags--item">{item}</a> )
                            : null
                        }
                    </div>
                    <div className="post__comments">
                        <h3 className="post__comments--amount">{comments.length} {comments.length == 1 ? 'Comment' : 'Comments'}</h3>
                        <form onSubmit={submit} className="post__comments--wrapper">
                            <img src={user.image} alt="" className="post__comments--avatar" />
                            <input type="text" value={data.comment} onChange={(event) => setData('comment', event.target.value)} className="post__comments--input" />
                            <button disabled={processing} className="post__comments--submit">
                                <i className="fa-solid fa-paper-plane post__comments--submit-icon"></i>
                            </button>
                        </form>
                        {
                            comments != null && comments.length != 0 ? 
                                <ul className="post__comments--list">
                                    {
                                        comments.map((item, index) => 
                                            {
                                                return <li key={index} className="post__comments--item">
                                                    <img src={item.user.image} alt={item.user.name} className="post__comments--item-image" />
                                                    <div className="post__comments--item-wrapper">
                                                        <a href={route('profile.show', item.user)} className="post__comments--item-user">{item.user.name}</a>
                                                        <p className="post__comments--item-comment">{item.comment}</p>
                                                        <form className="post__comments--item-actions">
                                                            <article className="post__comments--item-action">
                                                                <button onClick={(event) => action(event, item, 1)} className="post__comments--item-button">
                                                                    <i className={`fa-${item.actions.find((like) => like.user_id == user.id && like.like == 1) ? 'solid' : 'regular'} fa-thumbs-up post__comments--item-icon`} />
                                                                </button>
                                                                <p className="post__comments--item-amount">{item.actions.length != 0 ? item.actions.filter((like) => like.like == 1).length : 0}</p>
                                                            </article>
                                                            <article className="post__comments--item-action">
                                                                <button onClick={(event) => action(event, item, 0)} className="post__comments--item-button">
                                                                    <i className={`fa-${item.actions.find((like) => like.user_id == user.id && like.like == 0) ? 'solid' : 'regular'} fa-thumbs-down post__comments--item-icon`} />
                                                                </button>
                                                                <p className="post__comments--item-amount">{item.actions.length != 0 ? item.actions.filter((like) => like.like == 0).length : 0}</p>
                                                            </article>
                                                        </form>
                                                    </div>
                                                </li>;
                                            }
                                        )
                                    }
                                </ul> 
                            : <span className="post__comments--empty">There are no comments yet</span>
                        }
                    </div>
                    <span className="post__links">
                            <a href={next != null && route('posts.show', next)} className={`post__links--item ${next == null && 'post__links--item-disabled'}`}> <i className="fa-solid fa-arrow-left post__links--item-icon"/> {next != null && next.title.slice(0, -1)}</a>
                            <a href={prev != null && route('posts.show', prev)} className={`post__links--item ${prev == null && 'post__links--item-disabled'}`}>{prev != null && prev.title.slice(0, -1)} <i className="fa-solid fa-arrow-right post__links--item-icon"/> </a>
                    </span>
                </section>
            </main>
        </>
    );

}

export default PostScreen;