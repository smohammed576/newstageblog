import { useForm, usePage } from "@inertiajs/react";

function Navigation(props){
    const user = usePage().props.auth.user;
    const {post, processing} = useForm();

    const submit = (event) => {
        event.preventDefault();
        post(route('logout'));
    }

    return(
        <header className={props.props ? 'header header__movie' : 'header'}>
            <a href="/" className="header__link">
                <h2 className="header__link--title">Stageblog</h2>
            </a>
            <nav className="header__navigation">
                <div className="header__navigation--wrapper">
                    <a href={route("posts.index")} className="header__navigation--item">POSTS</a>
                    <div className="header__navigation--dropdown">
                        <a href={route('posts.stage', 1)} className="header__navigation--dropdown-item">Stage 1</a>
                        <a href={route('posts.stage', 2)} className="header__navigation--dropdown-item">Stage 2</a>
                    </div>
                </div>
                <a href={route("about.index")} className="header__navigation--item">ABOUT</a>
                <a href="https://saramohammed.com/" target="_blank" className="header__navigation--item">PORTFOLIO</a>
                <div className="header__navigation--wrapper">
                    <img src={user.image} alt={user.name} className="header__navigation--avatar" />
                    <div className="header__navigation--dropdown">
                        <a href={route('profile.show', user.id)} className="header__navigation--dropdown-item">Account</a>
                        <a href={route('profile.settings')} className="header__navigation--dropdown-item">Settings</a>
                        <a href={route('posts.create')} className="header__navigation--dropdown-item">New post</a>
                        <a href={route('movies.upload')} className="header__navigation--dropdown-item">Log film</a>
                        {/* <button className="header__navigation--dropdown-signout">Log out</button> */}
                        {/* <a href={route("logout")} className="header__navigation--dropdown-signout">Log out</a> */}
                        <form onSubmit={submit} className="header__navigation--dropdown-form">
                            <button className="header__navigation--dropdown-signout">Log out</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;