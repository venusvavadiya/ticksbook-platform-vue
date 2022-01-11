import { getAuth0Service } from '@/plugins/auth0';

export default function Auth0Guard(to, _, next) {
  const authService = getAuth0Service();

  const fn = () => {
    if (authService.isLoggedIn()) return next();
    authService.login({ appState: { targetUrl: to.fullPath } });
    return undefined;
  };

  authService.$watch('loading', (loading) => {
    if (!loading) fn();
    return undefined;
  });

  if (!authService.loading) return fn();
  return undefined;
}
