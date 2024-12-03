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
    path: 'avatar-settings',
    loadComponent: () => import('./pages/avatar-settings/avatar-settings.page').then(m => m.AvatarSettingsPage)
  },

  {
    path: 'login-screen',
    loadComponent: () => import('./pages/login-screen/login-screen.page').then(m => m.LoginScreenPage)
  },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'game',
    loadComponent: () => import('./pages/game/game.page').then(m => m.GamePage)
  },
  {
    path: 'podium',
    loadComponent: () => import('./pages/podium/podium.page').then(m => m.PodiumPage)
  },

  {
    path: 'answers',
    loadComponent: () => import('./pages/answers/answers.page').then( m => m.AnswersPage)
  },

];
