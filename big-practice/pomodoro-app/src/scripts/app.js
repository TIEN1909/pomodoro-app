import View from './views/index';
import Model from './models/index';
import Controller from './controllers/index';
import LoadingView from './views/loadingView';

export class App {
  start() {
    const controller = new Controller(new Model(), new View());
    controller.initHome();

    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        setTimeout(new LoadingView().hide, 2000);
      }
    };
  }
}
