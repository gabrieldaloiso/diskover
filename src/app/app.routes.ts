import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ArtistList } from './artist-list/artist-list';
import { AlbumList } from './album-list/album-list';
import { TrackList } from './track-list/track-list';
import { ObsPage } from './obs-page/obs-page';
import { About } from './about/about';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: Home },
    { path: 'artists/:letter', component: ArtistList },
    { path: 'artist/:id', component: AlbumList },
    { path: 'album/:artist/:album', component: TrackList },
    { path: 'obs', component: ObsPage },
    { path: 'about', component: About },
];
