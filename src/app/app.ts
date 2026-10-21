import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NAV_LINKS, PROFILE } from './core/data/profile.data';
import { UiIcon } from './shared/ui/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UiIcon],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  protected readonly navLinks = NAV_LINKS;
  protected readonly profile = PROFILE;
  protected readonly sidebarOpen = signal(false);
  protected readonly sectionTitle = signal('Overview');

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.resolveTitle(this.router.routerState.snapshot.root)),
      )
      .pipe(takeUntilDestroyed())
      .subscribe((title) => {
        this.sectionTitle.set(title);
        this.sidebarOpen.set(false);
      });

    this.sectionTitle.set(this.resolveTitle(this.router.routerState.snapshot.root));
  }

  private resolveTitle(route: Router['routerState']['snapshot']['root']): string {
    let r: typeof route = route;
    let title = r.data['title'] ?? 'Overview';
    while (r.firstChild) {
      r = r.firstChild;
      if (r.data['title']) {
        title = r.data['title'];
      }
    }
    return String(title);
  }
}
