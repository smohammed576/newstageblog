import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import Poster from "@/Components/Poster";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

function DiaryScreen(){
    const user = usePage().props.auth.user;
    const profile = usePage().props.profile;
    const diaries = usePage().props.diaries;
    const url = import.meta.env.VITE_APP_URL;
    const links = usePage().props.links;
    let headers = ['MONTH', 'DAY', 'FILM', 'RELEASED', 'RATING', 'LIKE', 'REWATCH', 'EDIT'];
    const { data, setData, processing, delete: destroy } = useForm({
        id: 0
    });

    const submit = (event, id) => {
        event.preventDefault();
        destroy(route('diaries.destroy', id));
    }

    return (
        <AuthenticatedLayout>
            <Head title={`${profile.name}'s diary`}/>
            <section className="diary">
                <Heading text="DIARY"/>
                <table className="diary__table">
                    <thead className="diary__header">
                        <tr className="diary__header--wrapper">
                            {
                                headers.map((item, index) =>
                                    <th className={`diary__header--item ${item == 'FILM' && 'diary__header--item-film'}`} key={index}>{item == 'EDIT' ? user.id == profile.id ? item : 'YOU' : item}</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody className="diary__body">
                        {
                            Object.entries(diaries).map(([month, entries]) => {
                                return entries.map((item, index) =>
                                    <tr className="diary__row" key={index}>
                                        <td className="diary__row--month">
                                            {
                                                index == 0 && <article className="diary__row--month-wrapper">
                                                    <h3 className="diary__row--month-text">{new Date(item.watched_at).toLocaleString('en-US', {month: 'short'})}</h3>
                                                    <p className="diary__row--month-year">{new Date(item.watched_at).toLocaleString('nl', {year: 'numeric'})}</p>
                                                </article>
                                            }
                                        </td>
                                        <td className="diary__row--day">
                                            <h3 className="diary__row--day-number">
                                                {new Date(item.watched_at).toLocaleString('nl', {day: 'numeric'})}
                                            </h3>
                                        </td>
                                        <td className="diary__row--film">
                                            <span className="diary__row--film-wrapper">
                                                <Poster url={`${url}${item.movie.poster}`} alt={item.title} width={'4rem'} route={route('movies.show', item.tmdb)}/>
                                            </span>
                                            {/* <img src={`${url}${item.poster}`} alt={item.title} className="diary__row--film-poster" /> */}
                                            <a href={route('movies.show', item.tmdb)} className="diary__row--film-title">{item.title}</a>
                                            {/* <h3 className="diary__row--film-title">{item.title}</h3> */}
                                        </td>
                                        <td className="diary__row--release">{item.release.substring(0, 4)}</td>
                                        <td className="diary__row--rating">
                                            <span className="diary__row--rating-wrapper">
                                                {/* {
                                                    Array.from({length: 5}, (_, i) => <i className="fa-solid fa-star diary__row--rating-star" key={i}/> )
                                                } */}
                                                {/* <img src="/images/stars_empty.png" alt="" className="diary__row--rating-stars" /> */}
                                                <span className="diary__row--rating-empty"></span>
                                                <span className="diary__row--rating-stars" style={{width: item.rating != 10 ? (item.rating * 10) - 4 + '%' : item.rating * 10 + '%'}}></span>
                                                {/* <img src="/images/stars_green.png" alt="" style={{width: '2rem'}} className="diary__row--rating-stars" /> */}
                                            </span>
                                        </td>
                                        <td className="diary__row--like">
                                            <i className={`fa-solid fa-heart diary__row--like ${!item.liked && 'diary__row--like-empty'}`}/>
                                        </td>
                                        <td className="diary__row--rewatch">
                                            {
                                                item.rewatched ? <i className="fa-solid fa-rotate diary__row--rewatch-icon"/> : null
                                            }
                                        </td>
                                        {
                                            user.id == profile.id ? <td className="diary__row--edit">
                                                <form onSubmit={(event) => submit(event, item.id)} className="diary__row--edit-form">
                                                    <span className="diary__row--edit-pen"></span>
                                                    <button className="diary__row--edit-trash"></button>
                                                </form>
                                            </td> : <td className="diary__row--you">
                                                <span className={`diary__row--you-${'eye'}`}></span>
                                                <span className={`diary__row--you-${'heart'}`}></span>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    links != null && <Pagination data={links}/>
                }
            </section>
        </AuthenticatedLayout>
    );
}

export default DiaryScreen;