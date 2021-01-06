import App from './app';
import AuthRouter from './auth/auth.router';
import TestRouter from './test/test.router';
import UserRouter from './user/user.router';
import EventRouter from './event/event.router';

const app = new App([
  new TestRouter(),
  new AuthRouter(),
  new UserRouter(),
  new EventRouter()
]);
app.run();
