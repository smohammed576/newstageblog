import { usePage } from "@inertiajs/react";
import Navigation from "./Navigation";
import Footer from "./Footer";

function AuthenticatedLayout({header, children}){
    const user = usePage().props.auth.user;
    return(
        <>
            <Navigation props={header ?? false}/>
            <main className="main">{children}</main>
            <Footer/>
        </>
    );
}

export default AuthenticatedLayout;