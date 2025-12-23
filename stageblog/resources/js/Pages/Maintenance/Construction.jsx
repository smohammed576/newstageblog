import Backdrop from "@/Components/Backdrop";
import DataContext from "@/hooks/context/DataContext";
import Footer from "@/Layouts/Footer";
import Navigation from "@/Layouts/Navigation";
import { Head } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";

function ConstructionScreen(){
    const url = import.meta.env.VITE_APP_URL;
    const {findFilm} = useContext(DataContext);
    const [film, setFilm] = useState(null);

    useEffect(() => {
        if(film == null){
            (async () => {
                const result = await findFilm(44214);
                setFilm(result);
            })();
        }
    }, []);
    return film != null && (
        <>
            <Head title="Under construction"/>
            <Navigation props={true} />
            <Backdrop url={`${url}${film.images.backdrops[17].file_path}`}/>
            <main className="main">
                <section className="construction">
                    <article className="construction__wrapper">
                        <h1 className="construction__quote">“I just want to be perfect.”</h1>
                        <h3 className="construction__text">This page is still being worked on.</h3>
                    </article>
                    <a href={route('movies.show', film.id)} className="construction__link">Still from {film.title} ({film.release_date.substring(0, 4)}).</a>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default ConstructionScreen;