import ConstructionBanner from "@/Components/Construction";
import Heading from "@/Components/Heading";
import Poster from "@/Components/Poster";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

function ActivityScreen(){
    const user = usePage().props.auth.user;
    const tmdb = usePage().props.tmdb;
    const profile = usePage().props.profile;
    const activities = usePage().props.activities;
    const url = import.meta.env.VITE_APP_URL;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {weekday: "long", day: "numeric", month: "short", year: "numeric"});
    }
    return(
        <AuthenticatedLayout>
            <Head title="Activity"/>
            <ConstructionBanner/>
            <section style={{marginTop: '2rem'}} className="activity">
                <div className="activity__body">
                    <div className="activity__header">
                        <p className="activity__header--text">{user.id == profile.id ? 'YOUR' : `${profile.name}'s`} ACTIVITY FOR</p>
                        <span className="activity__header--wrapper">
                            <a href={route('movies.show', tmdb)} className="activity__header--link">
                                {activities[0].model.title}
                            </a>
                            <p className="activity__header--release">{activities[0].model.release.substring(0, 4)}</p>
                        </span>
                    </div>
                    <div className="activity__body--wrapper">
                        <Heading text="ACTIVITY"/>
                        <div className="activities__list">
                            {
                                activities.map((item, index) => 
                                    <div className="activities__item" key={index}>
                                        <span className="activities__item--wrapper">
                                            {
                                                user.id != profile.id ? 
                                                <a href={route('profile.show', profile)} className="activities__item--user">{profile.name}</a> : 'You'
                                            }
                                            {item.type == 'added_film' ? ' marked ' : item.type == 'watched_film' || item.type == 'rewatched_film' ? ` ${item.type.split('_')[0]}${item.model.liked && item.model.rating != 0 ? ', liked and rated ' : item.model.liked ? ' and liked ' : item.model.rating ? ' and rated ' : ''} `: ` ${item.type.split('_')[0]} `}
                                            <a href={route('movies.show', item.model?.tmdb ?? 1)} className="activities__item--link">{item.model?.title}</a>
                                            {item.type == 'added_film' && ' as watched'}
                                            {item.type == 'rated_film' && <span className={`activities__item--rating rating__tiny rating__${item.meta.rated}--tiny`}></span>}
                                            {item.type == 'watched_film' || item.type == 'rewatched_film' ? item.model.rating != 0 ? <span className={`activities__item--rating rating__tiny rating__${item.model.rating}--tiny`}></span> : null : null}
                                            {item.type == 'watched_film' || item.type == 'rewatched_film' && ` on ${formatDate(item.created_at).replace(",", "")}`}
                                            {item.type == 'added_watchlist' && ` to `}{item.type == 'added_watchlist' && <a href={route('watchlist.show', profile)} className="activities__item--watchlist">{user.id == profile.id ? 'your ' : ' their '} watchlist</a> }
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <aside className="activity__aside">
                    <Poster url={`${url}${activities[0].model.poster ?? activities[0].model.movie.poster}`} alt={activities[0].model.title} route={route('movies.show', tmdb)}/>
                </aside>
            </section>
        </AuthenticatedLayout>
    );
}

export default ActivityScreen;