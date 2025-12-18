import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function AboutScreen(){
    return (
        <AuthenticatedLayout>
            <Head title="About"/>
            <section className="about">
                <h2 className="about__title">About</h2>
                <p className="about__text">
                    I am a student software developer at Mediacollege Amsterdam. I have experience in ReactJS, React Native, Laravel, SCSS, PHP. I'm currently doing an internship and I first worked with Dotnet here and I built my own API. I can work well independently and I will always try to improve myself.
                    I am a student software developer at Mediacollege Amsterdam. I have experience in ReactJS, React Native, Laravel, SCSS, PHP. I'm currently doing an internship and I first worked with Dotnet here and I built my own API. I can work well independently and I will always try to improve myself.
                    I am a student software developer at Mediacollege Amsterdam. I have experience in ReactJS, React Native, Laravel, SCSS, PHP. I'm currently doing an internship and I first worked with Dotnet here and I built my own API. I can work well independently and I will always try to improve myself.
                    I am a student software developer at Mediacollege Amsterdam. I have experience in ReactJS, React Native, Laravel, SCSS, PHP. I'm currently doing an internship and I first worked with Dotnet here and I built my own API. I can work well independently and I will always try to improve myself.
                </p>
            </section>
        </AuthenticatedLayout>
    );
}

export default AboutScreen;