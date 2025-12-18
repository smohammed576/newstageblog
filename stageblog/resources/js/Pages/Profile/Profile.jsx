import ApplicationLogo from "@/Components/default/ApplicationLogo";
import DropdownItem from "@/Components/DropdownItem";
import Heading from "@/Components/Heading";
import Poster from "@/Components/Poster";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Navigation from "@/Layouts/Navigation";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";

function ProfileScreen(){
    const user = usePage().props.auth.user;
    const profile = usePage().props.profile;
    const posts = usePage().props.profile.posts;
    const favorites = usePage().props.profile.favorites;
    const diaries = usePage().props.diaries.data;
    const shows = usePage().props.profile.shows;
    const watchlist = usePage().props.watchlist;
    const movies = usePage().props.movies;
    const [films, setFilms] = useState([null, null, null, null]);
    const url = import.meta.env.VITE_APP_URL;
    const [displayFilms, setDisplayFilms] = useState(true);
    let watchlistItems = [...watchlist.data].reverse();
    const diary = usePage().props.diary;
    const ref = useRef(null);
    console.log(profile);
    useEffect(() => {
      let list = [null, null, null, null];
      favorites.forEach(item => {
        list[item.position] = item;
      });
      setFilms(list);
    }, []);

    const copyLink = () => {
      navigator.clipboard.writeText(`localhost/profile/${profile.slug}`);
      if(ref.current){
        ref.current.blur();
      }
    }

    return (
      <>
        {/* <AuthenticatedLayout header={profile.backdrop != null && true}> */}
        <Navigation props={profile.backdrop != null ? true : false}/>
      {
        profile.backdrop != null &&
        <figure className="film__backdrop">
            {/* <div className="film__backdrop--image" style={{backgroundImage: `url(${url}/4PZuqUVwvxPCEMV8LYSAJLuxvcq.jpg)`}}></div> */}
            <div className="film__backdrop--image" style={{backgroundImage: `url(${url}${profile.backdrop})`}}></div>
        </figure>
      }
      <main className="main">

        <Head title={`${profile.name}'s profile`}/>
        <section className={`profile ${profile.backdrop != null && 'profile__hasBackdrop'}`}>
            <span className="profile__heading">
              <div className="profile__heading--info">
                <img src={profile.image} alt={profile.name} className="profile__heading--info-avatar" />
                <div className="profile__heading--info-wrapper">
                  <div className="profile__heading--info-heading">
                    <h2 className="profile__heading--info-name">{profile.name}</h2>
                    <span className="profile__heading--info-buttons">
                      {
                        user.id == profile.id && <a href={route('profile.settings')} className="profile__heading--info-button">EDIT PROFILE</a>
                      }
                      <div tabIndex={0} className="profile__heading--info-dropdown">
                        <button className="profile__heading--info-more" ref={ref}>
                          <i className="fa-solid fa-ellipsis profile__heading--info-icon"/>
                        </button>
                         <div className="dropdown dropdown__profile"><DropdownItem text="Copy profile link" icon="fa-solid fa-link" onClick={copyLink}/></div>
                      </div>
                    </span>
                  </div>
                    <p className="profile__heading--info-bio">{profile.bio ?? ''}</p>
                    <span className="profile__heading--info-details">
                      <article className="profile__heading--info-location">
                        <img src="/images/pin.svg" alt="" className="profile__heading--info-image" />
                        <p className="profile__heading--info-text">{profile.location ?? ''}</p>
                      </article>
                      {
                        profile.website && <a href={profile.website} target="_blank" className="profile__heading--info-link">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07599 6.8L10.77 4.002L0 0L3.85001 11.2L6.539 8.4L11.539 13.6L13.077 12L8.07599 6.8Z" fill="currentColor"/>
                          </svg>
                          
                          <p className="profile__heading--info-website">{new URL(profile.website).hostname.replace('www.', '')}</p>
                        </a>
                      }
                      
                    </span>
                </div>
              </div>
              <span className="profile__heading--details">
                <article className="profile__heading--details-item">
                  <h3 className="profile__heading--details-amount">{posts.length}</h3>
                  <p className="profile__heading--details-text">POSTS</p>
                </article>
                <article className="profile__heading--details-item">
                  <h3 className="profile__heading--details-amount">{movies.length}</h3>
                  <p className="profile__heading--details-text">MOVIES</p>
                </article>
                <article className="profile__heading--details-item">
                  <h3 className="profile__heading--details-amount">{diaries.length}</h3>
                  <p className="profile__heading--details-text">THIS YEAR</p>
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
                      films.every(item => item == null) ? null
                      // films.map((_, index) =>
                      //   <li className="profile__favorites--item profile__favorites--item-empty" key={index}></li>
                      // )
                      :
                      films.map((item, index) => 
                        item == null ? null :
                        <li className="profile__favorites--item" key={index}>
                          <Poster url={`${url}${item.movie.poster}`} alt={item.title} route={route('movies.show', item.tmdb)}/>
                        </li>
                      )
                      :
                      shows.every(item => item == null) ? 
                      shows.map((_, index) =>
                        <li className="profile__favorites--item profile__favorites--item-empty" key={index}></li>
                      )
                      :
                      shows.map((item, index) => 
                        item == null ? 
                        <li className="profile__favorites--item profile__favorites--item-empty" key={index}></li> :
                        <li className="profile__favorites--item" key={index}>
                          <Poster url={`${url}${item.poster}`} alt={item.name} route={route('shows.show', item.tmdb)}/>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className="profile__favorites">
                  <Heading text="RECENT ACTIVITY"/>
                  <ul className="profile__favorites--list">
                    {
                      diaries.slice(0, 4).map((item, index) => 
                        <li className="profile__favorites--item" key={index}>
                          <img src={`${url}${item.movie.poster}`} alt={item.title} className="profile__favorites--item-image" />
                          <a href={route('movies.show', item.tmdb)} className="profile__favorites--item-overlay"></a>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className="profile__posts">
                  
                </div>
              </div>
              <aside className="profile__aside">
                <div className="profile__aside--wrapper">
                  <Heading text="WATCHLIST" link={route('watchlist.show', profile)} linkText={watchlist.total} />
                  <a href={route('watchlist.show', profile)} className="profile__watchlist">
                    <ul className="profile__watchlist--wrapper">
                      {
                        Array.from({length: 5}, (_, index) => {
                          let item = watchlistItems[index] ?? null;
                          return <li className={`profile__watchlist--item ${item == null && 'profile__watchlist--item-empty'}`} key={index}>
                            {
                              item != null && <img src={`${url}${item.poster}`} alt={item.title} className="profile__watchlist--item-poster" />
                            }
                            <figure className="profile__watchlist--item-overlay"></figure>
                          </li>
                        })
                      }
                    </ul>
                  </a>
                </div>
                <div className="profile__aside--wrapper">
                  <Heading text="DIARY" link={route('diaries.index', profile)} linkText={usePage().props.diaries.total}/>
                  <div className="profile__diary">
                    <ul className="profile__diary--list">
                      {
                        Object.entries(diary).map(([month, entries], index) => 
                          <li className="profile__diary--item" key={index}>
                            <h3 className="profile__diary--item-month">{new Date(month).toLocaleDateString('en-US', {month: 'short'}).toUpperCase()}</h3>
                            <dl className="profile__diary--entries">
                              {
                                entries.flat().map((item, i) => 
                                  <React.Fragment key={i}>
                                    <dt className="profile__diary--entries-day">{new Date(item.created_at).toLocaleDateString('nl', {day: 'numeric'})}</dt>
                                    <dd className="profile__diary--entries-title">
                                      <a href={route('movies.show', item.tmdb)} className="profile__diary--entries-link">{item.title}</a>
                                    </dd>
                                  </React.Fragment>
                                )
                              }
                            </dl>
                          </li>
                        )
                      }
                    </ul>
                  </div>
                </div>
              </aside>
            </span>
        </section>
      </main>
      {/* </AuthenticatedLayout> */}
      </>
    );
}

export default ProfileScreen;