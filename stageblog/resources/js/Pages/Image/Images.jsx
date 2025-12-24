import GreenButton from "@/Components/GreenButton";
import Heading from "@/Components/Heading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

function ImagesScreen(){
    const images = usePage().props.files;

    return(
        <AuthenticatedLayout>
            <Head title="Images"/>
            <section className="images">
                <Heading text="IMAGES"/>
                <div className="images__wrapper">
                    {
                        images.map((item, index) => 
                            <figure className="images__item" key={index}>
                                <img src={`/storage/${item}`} alt="" className="images__item--image" />
                                <span className="images__item--overlay">
                                    <GreenButton text="COPY PATH" onClick={() => navigator.clipboard.writeText(`/storage/${item}`)}/>
                                </span>
                            </figure>
                        )
                    }
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

export default ImagesScreen;