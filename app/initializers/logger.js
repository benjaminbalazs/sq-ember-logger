import LoggerService from '../services/logger';

export function initialize (container, app) {

	app.register('logger:main', LoggerService);

    app.inject('route', 'logger', 'logger:main');
    app.inject('adapter', 'logger', 'logger:main');
    app.inject('component', 'logger', 'logger:main');
    app.inject('controller', 'logger', 'logger:main');

}

export default {
    name: 'logger',
    initialize: initialize
}