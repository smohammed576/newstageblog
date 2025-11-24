import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

function Home(){
    const user = usePage().props.auth.user;
    const hours = usePage().props.hours;
    const remaining = usePage().props.remaininghours;
    console.log(hours);
    return(
        <AuthenticatedLayout>
            <section className="hours">
                <span className="hours__progress">
                    <progress className="hours__progress--bar" value={hours} max={800}></progress>
                </span>
            </section>
            {/* <section className="homeactivity">
                <span className="homeactivity__heading">
                    <p className="homeactivity__heading--text">RECENTLY WATCHED</p>
                </span>
                
            </section>
            <section className="hours">
                <span className="hours__heading">
                    <h3 className="hours__heading--text">LOG HOURS</h3>
                    <button className="hours__heading--button">ADD</button>
                </span>
            </section>
            <section className="homeposts">
                <span className="homeposts__heading">
                    <p className="homeposts__heading--text">RECENT POSTS</p>
                    <a href="" className="homeposts__heading--link">MORE</a>
                </span>
                <span className="homeposts__list">
                    
                </span>
            </section> */}
        </AuthenticatedLayout>
    );
}

export default Home;