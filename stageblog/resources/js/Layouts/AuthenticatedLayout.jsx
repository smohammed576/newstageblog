import { usePage } from "@inertiajs/react";
import Navigation from "./Navigation";

function AuthenticatedLayout({header, children}){
    const user = usePage().props.auth.user;
    return(
        <>
            <Navigation props={false}/>
            <main className="main">{children}</main>
        </>
    );
}

export default AuthenticatedLayout;