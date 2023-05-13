import { Route } from './RouteNames';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      [Route.Demo]: undefined;
      [Route.Home]: undefined;
      [Route.Questions]: undefined;
    }
  }
}
