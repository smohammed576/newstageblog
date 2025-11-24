import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

function ProfileScreen(){
    const user = usePage().props.auth.user;

    return (
      <AuthenticatedLayout>
        <section className="profile">
            span.profile__heading
        </section>
      </AuthenticatedLayout>
    );
}

export default ProfileScreen;