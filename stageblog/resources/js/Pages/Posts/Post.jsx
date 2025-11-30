import Markdown, { ImageMarkdown, PostMarkdown } from "@/Components/Markdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navigation from "@/Layouts/Navigation";
import { useForm, usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";

function PostScreen(){
    const user = usePage().props.auth.user;
    const stagepost = usePage().props.post;
    const comments = usePage().props.post.comments;
    const { data, setData, post, processing, reset } = useForm({
        comment: ''
    });
    console.log(stagepost);
    console.log(comments);
    console.log(usePage().props);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"});
    }

    const submit = (event) => {
        event.preventDefault();
        post(route('comments.store', stagepost), {
            onFinish: () => reset('comment')
        });
    }
    
    return (
        <>
            <Navigation/>
            <main className="main__post">
                    <div className="post__heading">
                        <p className="post__heading--details">
                            {stagepost.type} · Stage {stagepost.stage == 1 ? 'one' : 'two'}
                        </p>
                        <h1 className="post__heading--title">
                            {stagepost.title.slice(0, -1)}: {stagepost.intro}
                        </h1>
                        <span className="post__heading--wrapper">
                            <img src={stagepost.user.image} alt="" className="post__heading--image" />
                            <a href={route('profile.show', stagepost.user_id)} className="post__heading--user">{stagepost.user.name}</a>
                            <p className="post__heading--dot">·</p>
                            <p className="post__heading--date">{formatDate(stagepost.created_at)}</p>
                        </span>
                    </div>
                <section className="post">
                    <figure className="post__wrapper">
                        <ReactMarkdown components={ImageMarkdown}>
                            {stagepost.image}
                        </ReactMarkdown>
                        {/* <img src={stagepost.image} alt="" className="post__image" /> */}
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
                            <input type="text" value=   {data.comment} onChange={(event) => setData('comment', event.target.value)} className="post__comments--input" />
                            <button disabled={processing} className="post__comments--submit">
                                <i className="fa-solid fa-paper-plane post__comments--submit-icon"></i>
                            </button>
                        </form>
                        {
                            comments != null && comments.length != 0 ? 
                                <ul className="post__comments--list">
                                    {
                                        comments.map((item, index) => 
                                            <li key={index} className="post__comments--item">
                                                <img src={item.user.image} alt={item.user.name} className="post__comments--item-image" />
                                                <div className="post__comments--item-wrapper">
                                                    <a href={route('profile.show', item.user_id)} className="post__comments--item-user">{item.user.name}</a>
                                                    <p className="post__comments--item-comment">{item.comment}</p>
                                                    <span className="post__comments--item-actions">
                                                        <article className="post__comments--item-action">
                                                            <i className="fa-regular fa-thumbs-up post__comments--item-icon"></i>
                                                            <p className="post__comments--item-amount">{item.likes}</p>
                                                        </article>
                                                        <article className="post__comments--item-action">
                                                            <i className="fa-regular fa-thumbs-down post__comments--item-icon"></i>
                                                            <p className="post__comments--item-amount">{item.dislikes}</p>
                                                        </article>
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul> 
                            : <span className="post__comments--empty">There are no comments yet</span>
                        }
                    </div>
                </section>
            </main>
        </>
    );

}

export default PostScreen;