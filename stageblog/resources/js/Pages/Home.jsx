import Heading from "@/Components/Heading";
import Type from "@/Components/Type";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function Home(){
    const role = usePage().props.auth.role[0];
    const hours = usePage().props.hours;
    const remaining = usePage().props.remaininghours;
    const diaries = usePage().props.diaries;
    const posts = usePage().props.posts;
    const url = import.meta.env.VITE_APP_URL;
    const { data, setData, processing, reset, post } = useForm({
        'hours': 0,
        'stage': 2
    });
    console.log(diaries);
    const [openForm, setOpenForm] = useState(false);

    const submit = (event) => {
        event.preventDefault();
        post(route('hours.store'), {
            onFinish: () => reset('hours')
        });
    }
    return(
        <AuthenticatedLayout>
            <Head title="Home"/>
            <section className="homeactivity">
                <Heading text="RECENTLY WATCHED"/>
                <ul className="homeactivity__list">
                    {
                        diaries.length != 0 ? 
                            diaries.map((item, index) => 
                                <li key={index} className="homeactivity__item">
                                    <img src={`${url}${item.movie.poster}`} alt={item.title} className="homeactivity__item--poster" />
                                    <a href={route('movies.show', item.tmdb)} className="homeactivity__item--overlay">
                                        <article className="homeactivity__item--overlay-wrapper">
                                            <p className="homeactivity__item--overlay-text">Watched by</p>
                                            <a href={route('profile.show', item.user)} className="homeactivity__item--overlay-name">{item.user.name}</a>
                                        </article>
                                    </a>
                                    <span className="homeactivity__item--rating">
                                        {
                                            item.rating != null && item.rating != 0 ? 
                                            <>
                                            <span className={`homeactivity__item--rating-stars rating__${item.rating}`}></span>
                                                {
                                                    item.rewatched == 1 && <span className={`homeactivity__item--rating-rewatch`}></span>
                                                }
                                                {
                                                    item.liked == 1 && <span className={`homeactivity__item--rating-like`}></span>
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
                            role.name == 'admin' && <button onClick={() => setOpenForm(true)} className="hours__heading--button">+ ADD HOURS</button>
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
                            <a key={index} href={route('posts.show', item)} className="homeposts__item">
                                <figure className="homeposts__item--figure">
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