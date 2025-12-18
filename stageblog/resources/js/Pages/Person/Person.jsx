import DataContext from "@/hooks/context/DataContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function Person(){
    const id = usePage().props.id;
    const {findPerson} = useContext(DataContext);
    const [person, setPerson] = useState(null);
    const url = import.meta.env.VITE_APP_URL;

    useEffect(() => {
        if(person == null){
            (async () => {
                const response = await findPerson(id);
                setPerson(response);
            })();
        }
    }, []);

    return person != null && (
        <AuthenticatedLayout>
            <Head title={person.name}/>
            <section className="person">
                <div className="person__body">
                    <article className="person__heading">
                        <p className="person__heading--text">FILMS STARRING</p>
                        <h2 className="person__heading--name">{person.name}</h2>
                    </article>
                    <div className="person__credits">
                        {
                            person.credits.cast.map((item, index) => 
                                <a href={route('movies.show', item.id)} className="person__credit" key={index}>
                                    <img src={`${url}${item.poster_path}`} title={item.title} alt={item.name} className="person__credit--poster" />
                                </a>
                            )
                        }
                    </div>
                </div>
                <aside className="person__aside">
                    <div className="person__aside--wrapper">
                        <figure className="person__figure">
                            <img src={`${url}${person.profile_path}`} alt={person.name} className="person__figure--image" />
                        </figure>
                        <article className="person__biography">
                            {person.biography}
                        </article>
                    </div>
                    <p className="person__more">
                        More details at <a href={`https://www.themoviedb.org/person/${person.id}`} target="_blank" className="person__more--link">TMDB</a>
                    </p>
                </aside>
            </section>
        </AuthenticatedLayout>
    );
}

export default Person;