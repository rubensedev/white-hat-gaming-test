import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const validRoutesLinks = [
  'top',
  'new',
  'slots',
  'jackpots',
  'live',
  'blackjack',
  'roulette',
  'table',
  'poker',
  'other',
];

export const validRouteGuard: CanActivateFn = (route, state) => {
  const routeId = route.paramMap.get('id');
  if (!routeId || !validRoutesLinks.includes(routeId)) {
    inject(Router).navigate(['top']);
    return false;
  }
  return true;
};
