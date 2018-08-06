import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const MyRouter = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

MyRouter.map(function() {
});

export default MyRouter;
