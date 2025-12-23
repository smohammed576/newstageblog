import Heading from "@/Components/Heading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

function ActivitiesScreen(){
    const user = usePage().props.auth.user;
    const profile = usePage().props.profile;
    const activities = usePage().props.activities;
    console.log(activities);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {weekday: "long", day: "numeric", month: "short", year: "numeric"});
    }

    return(
        <AuthenticatedLayout>
            <Head title={`${profile.name}'s activity`}/>
            <section className="activities">
                <Heading text={user.id == profile.id ? 'YOUR ACTIVITY' : `${profile.name.toUpperCase()}'S ACTIVITY`} />
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
            </section>
        </AuthenticatedLayout>
    );
}

export default ActivitiesScreen;