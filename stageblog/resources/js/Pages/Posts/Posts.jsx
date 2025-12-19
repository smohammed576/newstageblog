import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import Tag from "@/Components/Tag";
import Type from "@/Components/Type";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";

function PostsScreen(){
    const posts = usePage().props.posts.data;
    const links = usePage().props.posts;
    console.log(usePage().props);
    const status = usePage().props.status;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {day: "numeric", month: "short", year: "numeric"});
    }
    
    return (
        <AuthenticatedLayout>
            <Head title="Posts"/>
            <section className="posts">
                <Heading text={`${links.total} ${links.total == 1 ? 'POST' : 'POSTS'}`} link={status != null && route('posts.index')} linkText={status != null && 'RESET'} />
                <div className="posts__list">
                    {
                        posts != null && posts.length != 0 ? 
                            posts.map((item, index) => 
                                <a href={route("posts.show", item)} key={index} className="posts__item">
                                    <figure className="posts__item--figure">
                                        <ReactMarkdown>
                                            {item.image}
                                        </ReactMarkdown>
                                        {
                                            item.type == 'Reflectie' && <Type type={item.type}/>
                                        }
                                    </figure>
                                    <article className="posts__item--wrapper">
                                        <span className="posts__item--details">
                                            <p className="posts__item--details-stage">Stage {item.stage}</p>
                                            <p className="posts__item--details-date">· {formatDate(item.created_at)}</p>
                                        </span>
                                        <span className="posts__item--text">
                                            <h3 className="posts__item--text-title">{item.title}</h3>
                                            <h3 className="posts__item--text-intro">{item.intro}</h3>
                                        </span>
                                        <span className="posts__item--user">
                                            <img src={item.user.image} alt={item.user.name} className="posts__item--user-avatar" />
                                            <p className="posts__item--user-name">{item.user.name}</p>
                                        </span>
                                        <ul className="posts__item--tags">
                                            {
                                                item.tags != null && item.tags.length != 0 ? 
                                                    item.tags.map((item, index) => 
                                                        <Tag tag={item} key={index}/>
                                                    )
                                                : null
                                            }
                                        </ul>
                                    </article>
                                </a>
                            )
                        : null
                    }
                </div>
                {
                    links.last_page != 1 ? 
                        <Pagination data={links}/>
                    : null
                }
            </section>
        </AuthenticatedLayout>
    );
}

export default PostsScreen;