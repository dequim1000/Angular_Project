import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

interface IBreadCrumb {
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadCrumb[] = [];

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this._activatedRoute.root);
  }

  ngOnInit() {
    this._router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this._activatedRoute.root);
      });
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    if (path) {
      const lastRoutePart = path.split('/').pop() || '';
      const isDynamicRoute = lastRoutePart.startsWith(':');
      if (isDynamicRoute && !!route.snapshot) {
        const paramName = lastRoutePart.split(':')[1];
        path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
        label = route.snapshot.params[paramName];
      }
    }
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };

    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
