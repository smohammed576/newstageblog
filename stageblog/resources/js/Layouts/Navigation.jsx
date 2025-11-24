import { usePage } from "@inertiajs/react";

function Navigation(props){
    const user = usePage().props.auth.user;
    return(
        <header className={props.props ? 'header header__movie' : 'header'}>
            <a href="/" className="header__link">
                <h2 className="header__link--title">Stageblog</h2>
            </a>
            <nav className="header__navigation">
                <a href={route("posts.index")} className="header__navigation--item">POSTS</a>
                <a href="" className="header__navigation--item">ABOUT</a>
                <a href="" className="header__navigation--item">PORTFOLIO</a>
                <div className="header__navigation--wrapper">
                    <img src={user.image} alt="" className="header__navigation--avatar" />
                    <div className="header__navigation--dropdown">
                        <a href="" className="header__navigation--dropdown-item">Account</a>
                        <a href={route('profile.settings')} className="header__navigation--dropdown-item">Settings</a>
                        <a href="" className="header__navigation--dropdown-item">New post</a>
                        <a href="" className="header__navigation--dropdown-item">Log film</a>
                        <button className="header__navigation--dropdown-signout">Log out</button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;