import MovieModal from "@/Components/Modals/MovieModal";
import DataContext from "@/hooks/context/DataContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function MovieForm(){
    const [films, setFilms] = useState([]);
    const {searchQuery, findFilm} = useContext(DataContext);
    const [value, setValue] = useState('');
    const [film, setFilm] = useState(null);
    const url = import.meta.env.VITE_APP_URL;

    const sendQuery = async (event) => {
        event.preventDefault();
        const response = await searchQuery(value, 'movie');
        setFilms(response.results);
    }

    const selectFilm = async (id) => {
        const response = await findFilm(id);
        setFilm(response);
    }

    useEffect(() => {
        if(film != null){
            document.querySelector('body').style.overflow = "hidden";
            
        }
        else{
            document.querySelector('body').style.overflow = "auto";
        }
    }, [film]);

    return(
        <AuthenticatedLayout>
            <Head title="Log Film"/>
            <section className="movie">
                <div className="movie__wrapper">
                    <form action="" className="movie__search" onSubmit={(event) => sendQuery(event)}>
                        <input onChange={(event) => setValue(event.target.value)} value={value} type="text" className="movie__search--input" />
                    </form>
                </div>
                {
                    films.length == 0 ? null : <div className="movie__results">
                        {
                            films.map((item, index) => 
                                <button className="movie__result" key={index} onClick={() => selectFilm(item.id)}>
                                    {
                                        item.poster_path !== "" && item.poster_path !== null ? 
                                            <img src={`${url}${item.poster_path}`} alt={item.title} className="movie__result--image" />
                                        :
                                            <article className="movie__result--empty">
                                                <p className="movie__result--empty-title">{item.title}</p>
                                            </article>
                                    }
                                </button>
                            )
                        }
                    </div>
                }
            </section>
        {
            film !== null ? 
                <MovieModal film={film} onClose={() => setFilm(null)}/>
                : null
        }
        </AuthenticatedLayout>
    );
}

export default MovieForm;