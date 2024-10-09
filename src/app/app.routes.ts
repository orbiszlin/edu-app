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
  },  {
    path: 'login-screen',
    loadComponent: () => import('./pages/login-screen/login-screen.page').then( m => m.LoginScreenPage)
  },

];
