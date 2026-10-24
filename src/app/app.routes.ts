import { Routes } from '@angular/router';
import {
  withInMemoryScrolling,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/overview/overview').then((m) => m.OverviewPage),
    data: { title: 'Overview' },
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience').then((m) => m.ExperiencePage),
    data: { title: 'Experience' },
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then((m) => m.ProjectsPage),
    data: { title: 'Projects' },
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills').then((m) => m.SkillsPage),
    data: { title: 'Skills' },
  },
  {
    path: 'knowledge',
    loadComponent: () => import('./features/knowledge/knowledge').then((m) => m.KnowledgePage),
    data: { title: 'Knowledge' },
  },
  {
    path: 'knowledge/:slug',
    loadComponent: () =>
      import('./features/knowledge/article').then((m) => m.ArticlePage),
    data: { title: 'Article' },
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq').then((m) => m.FaqPage),
    data: { title: 'FAQ' },
  },
  {
    path: 'resume',
    loadComponent: () => import('./features/resume/resume').then((m) => m.ResumePage),
    data: { title: 'Resume' },
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.ContactPage),
    data: { title: 'Contact' },
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFoundPage),
    data: { title: 'Not found' },
  },
];

export const routerProviders = [
  withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
  withComponentInputBinding(),
  withViewTransitions(),
];
