import Heading from "@/Components/Heading";
import Type from "@/Components/Type";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function Home(){
    const user = usePage().props.auth.user;
    const hours = usePage().props.hours;
    const remaining = usePage().props.remaininghours;
    const movies = usePage().props.movies;
    const posts = usePage().props.posts;
    const url = import.meta.env.VITE_APP_URL;
    const { data, setData, processing, reset, post } = useForm({
        'hours': 0,
        'stage': 2
    });
    const [openForm, setOpenForm] = useState(false);

    const submit = (event) => {
        event.preventDefault();
        post(route('hours.store'), {
            onFinish: () => reset('hours')
        });
    }
    return(
        <AuthenticatedLayout>
            <section className="homeactivity">
                <Heading text="RECENTLY WATCHED"/>
                <ul className="homeactivity__list">
                    {
                        movies.length != 0 ? 
                            movies.map((item, index) => 
                                <li key={index} className="homeactivity__item">
                                    <img src={`${url}${item.poster}`} alt={item.title} className="homeactivity__item--poster" />
                                    <a href={route('movies.show', item.tmdb)} className="homeactivity__item--overlay">
                                        {/* <p className="homeactivity__item--title">{item.title}</p> */}
                                    </a>
                                    <span className="homeactivity__item--rating">
                                        {
                                            item.rating != null && item.rating != 0 ? 
                                            <>
                                            <span className="homeactivity__item--rating-stars">
                                                {
                                                    Array.from({length: item.rating / 2}, (_, i) => <i key={i} className="fa-solid fa-star homeactivity__item--rating-star"/> )
                                                }
                                                {
                                                    Number.isInteger(item.rating / 2) ? null : <i className="fa-solid fa-star-half homeactivity__item--rating-star"/>
                                                }
                                            </span>
                                                {
                                                    item.rewatched == 1 && <i className="fa-solid fa-rotate homeactivity__item--rating-star"/>
                                                }
                                                {
                                                    item.liked == 1 && <i className="fa-solid fa-heart homeactivity__item--rating-star"/>
                                                }
                                            </>
                                            : null
                                        }
                                    </span>
                                </li>
                            )
                        : null
                    }
                </ul>
            </section>
            <section className="hours">
                <span className="hours__heading">
                    <h2 className="hours__heading--text">REMAINING HOURS</h2>
                    {
                        openForm ? 
                            <form onSubmit={submit} className="hours__heading--form">
                                <input type="number" min={0} step={0.5} value={data.hours} onChange={(event) => setData('hours', event.target.value)} className="hours__heading--form-input" />
                                <button type="submit" className="hours__heading--form-submit">ADD</button>
                            </form>
                        : 
                            <button onClick={() => setOpenForm(true)} className="hours__heading--button">+ ADD HOURS</button>
                    }
                </span>
                <span className="hours__progress">
                    <progress className="hours__progress--bar" title={`${hours} / 800`} value={hours} max={800}></progress>
                </span>
            </section>
            <section className="homeposts">
                <Heading text="RECENT POSTS" link={route('posts.index')} linkText="MORE"/>
                <span className="homeposts__list">
                    {
                        posts.map((item, index) => 
                            <a key={index} href={route('posts.show', item.id)} className="homeposts__item">
                                <figure className="homeposts__item--figure">
                                    {/* <img src={item.image} alt={item.title} className="homeposts__item--figure-image" /> */}
                                    <ReactMarkdown>
                                        {item.image}
                                    </ReactMarkdown>
                                    {
                                        item.type == 'Reflectie' && <Type type={item.type}/>
                                    }
                                </figure>
                                <article className="homeposts__item--wrapper">
                                    <h3 className="homeposts__item--title">{item.title}</h3>
                                    <p className="homeposts__item--intro">{item.intro}</p>
                                </article>
                            </a>
                        )
                    }
                </span>
            </section>
        </AuthenticatedLayout>
    );
}

export default Home;