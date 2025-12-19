import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import Poster from "@/Components/Poster";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

function MoviesScreen(){
    const user = usePage().props.auth.user;
    const profile = usePage().props.profile;
    const movies = usePage().props.movies;
    const url = import.meta.env.VITE_APP_URL;
    console.log(movies);
    return(
        <AuthenticatedLayout>
            <Head title={`${profile.name}'s movies`}/>
            <section className="movies">
                <Heading text="MOVIES"/>
                <div className="movies__wrapper">
                    {
                        movies.data.map((item, index) => 
                            <div key={index} className="movies__item">
                                <Poster url={`${url}${item.poster}`} alt={item.title} route={route('movies.show', item.tmdb)} />
                                <span className="movies__item--rating">
                                    {
                                        item.rating != null && item.rating != 0 ? 
                                        <>
                                        <span className={`movies__item--rating-stars rating__small--${item.rating}`}></span>
                                        {
                                            item.liked == 1 && <span className="movies__item--rating-like"></span>
                                        }
                                        </>
                                        : null
                                    }
                                </span>
                            </div>
                        )
                    }
                </div>
                {
                    movies.last_page != 1 ? 
                        <Pagination data={movies}/>
                    : null
                }
            </section>
        </AuthenticatedLayout>
    );
}

export default MoviesScreen;