import Heading from "@/Components/Heading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

function ProfileScreen(){
    const user = usePage().props.auth.user;
    const posts = usePage().props.profile.posts;
    const favorites = usePage().props.profile.favorites;
    const movies = usePage().props.movies.data;
    const shows = usePage().props.profile.shows;
    const [films, setFilms] = useState([null, null, null, null]);
    const url = import.meta.env.VITE_APP_URL;
    const [displayFilms, setDisplayFilms] = useState(true);
    console.log(usePage().props);

    useEffect(() => {
      let list = [null, null, null, null];
      favorites.forEach(item => {
        list[item.position] = item;
      });
      console.log(list);
      setFilms(list);
    }, []);

    console.log(films.every(item => item == null));
    console.log(movies);

    return (
      <AuthenticatedLayout>
        <section className="profile">
            <span className="profile__heading">
              <div className="profile__heading--info">
                <img src={user.image} alt={user.name} className="profile__heading--info-avatar" />
                <div className="profile__heading--info-wrapper">
                  <div className="profile__heading--info-heading">
                    <h2 className="profile__heading--info-name">{user.name}</h2>
                    <span className="profile__heading--info-buttons">
                      <a href={route('profile.settings')} className="profile__heading--info-button">EDIT PROFILE</a>
                      <button className="profile__heading--info-more">
                        <i className="fa-solid fa-ellipsis profile__heading--info-icon"/>
                      </button>
                    </span>
                  </div>
                    <p className="profile__heading--info-bio">{user.bio ?? ''}</p>
                    <article className="profile__heading--info-location">
                      <i className="fa-solid fa-map-pin profile__heading--info-pin"/>
                      <p className="profile__heading--info-text">{user.location ?? ''}</p>
                    </article>
                </div>
              </div>
              <span className="profile__heading--details">
                <article className="profile__heading--details-item">
                  <h3 className="profile__heading--details-amount">{posts.length}</h3>
                  <p className="profile__heading--details-text">POSTS</p>
                </article>
                <article className="profile__heading--details-item">
                  <h3 className="profile__heading--details-amount">{posts.length}</h3>
                  <p className="profile__heading--details-text">POSTS</p>
                </article>
                <article className="profile__heading--details-item">
                  <h3 className="profile__heading--details-amount">{posts.length}</h3>
                  <p className="profile__heading--details-text">POSTS</p>
                </article>
              </span>
            </span>
            <span className="profile__tabs"></span>
            <span className="profile__wrapper">
              <div className="profile__body">
                <div className="profile__favorites">
                  <Heading text={`FAVORITE ${displayFilms ? 'FILMS' : 'SHOWS'}`} button={() => setDisplayFilms(!displayFilms)} buttonText={displayFilms ? 'SHOWS' : 'FILMS'}/>
                  <ul className="profile__favorites--list">
                    {
                      displayFilms ? 
                      films.every(item => item == null) ? null :
                      films.map((item, index) => 
                        <li className="profile__favorites--item" key={index}>
                          <img src={`${url}${item.poster}`} alt={item.title} className="profile__favorites--item-image" />
                          <a href={route('movies.show', item.tmdb)} className="profile__favorites--item-overlay"></a>
                        </li>
                      )
                      :
                      shows.every(item => item == null) ? null :
                      shows.map((item, index) => 
                        <li className="profile__favorites--item" key={index}>
                          <img src={`${url}${item.poster}`} alt={item.name} className="profile__favorites--item-image" />
                          <a href={route('shows.show', item.tmdb)} className="profile__favorites--item-overlay"></a>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className="profile__favorites">
                  <Heading text="RECENT ACTIVITY"/>
                  <ul className="profile__favorites--list">
                    {
                      movies.slice(0, 4).map((item, index) => 
                        <li className="profile__favorites--item" key={index}>
                          <img src={`${url}${item.poster}`} alt={item.title} className="profile__favorites--item-image" />
                          <a href={route('movies.show', item.tmdb)} className="profile__favorites--item-overlay"></a>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className="profile__posts">
                  
                </div>
              </div>
              <aside className="profile__aside"></aside>
            </span>
        </section>
      </AuthenticatedLayout>
    );
}

export default ProfileScreen;