import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'login-screen',
    loadComponent: () => import('./pages/login-screen/login-screen.page').then( m => m.LoginScreenPage)
  },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'game',
    loadComponent: () => import('./pages/game/game.page').then( m => m.GamePage)
  },
  {
    path: 'lobby',
    loadComponent: () => import('./pages/lobby/lobby.page').then( m => m.LobbyPage)
  },

];
