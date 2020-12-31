import App from './app';
import AuthRouter from './auth/auth.router';
import TestRouter from './test/test.router';

const app = new App([
  new TestRouter(),
  new AuthRouter
]);
app.run();