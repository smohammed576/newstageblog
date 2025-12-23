<?php

namespace App\Enums;

enum ActivityType : string
{
    case LOGGED_IN = 'logged_in';
    case VIEWED_PROFILE = 'viewed_profile';
    case VIEWED_DIARY = 'viewed_diary';
    case VIEWED_ACTIVITY = 'viewed_activity';
    case VIEWED_WATCHLIST = 'viewed_watchlist';
    case VIEWED_POST = 'viewed_post';
    case COMMENTED = 'commented';
    case CREATED_POST = 'created_post';
    case VIEWED_FILM = 'viewed_film';
    case WATCHED_FILM = 'watched_film';
    case REWATCHED_FILM = 'rewatched_film';
    case ADDED_FILM = 'added_film';
    case LIKED_FILM = 'liked_film';
    case RATED_FILM = 'rated_film';
    case ADDED_WATCHLIST = 'added_watchlist';
    case ADDED_FAVORITE = 'added_favorite';
    case CHANGED_FAVORITE = 'changed_favorite';
}
