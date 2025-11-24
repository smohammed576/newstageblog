import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

function PostsScreen(){
    const user = usePage().props.auth;
    const posts = usePage().props.posts;
    console.log(posts);
    return (
        <AuthenticatedLayout>
            <section className="posts">
                <span className="posts__header">
                    <p className="posts__header--amount">{posts.data.length} {posts.data.length == 1 ? 'POST' : 'POSTS'}</p>
                </span>
                <div className="posts__list">

                </div>
            </section>
        </AuthenticatedLayout>
    );
}

export default PostsScreen;