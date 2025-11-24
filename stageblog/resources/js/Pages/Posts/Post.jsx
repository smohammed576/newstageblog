import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navigation from "@/Layouts/Navigation";
import { usePage } from "@inertiajs/react";

function PostScreen(){
    const user = usePage().props.auth;
    const post = usePage().props.post;
    
    return (
        <>
            <Navigation/>
            <main className="main__post">
                section
            </main>
        </>
    );

}

export default PostScreen;