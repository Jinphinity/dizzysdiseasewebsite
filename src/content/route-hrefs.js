const ROUTE_TO_HREF = {
  '/': 'index.html',
  '/archive': 'archive.html',
  '/armory': 'armory.html',
  '/comms': 'comms.html',
  '/devlog': 'devlog.html'
};

const HREF_TO_ROUTE = Object.fromEntries(Object.entries(ROUTE_TO_HREF).map(([route, href]) => [href, route]));

export function routeToHref(route) {
  return ROUTE_TO_HREF[route] ?? 'index.html';
}

export function hrefToRoute(href) {
  return HREF_TO_ROUTE[href] ?? '/';
}
