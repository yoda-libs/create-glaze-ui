/** @jsx createElement */
import { createElement } from '../../glaze-ui/dist';
import { bootstrap, createApps, app } from '../../glaze-ui/dist/glaze';
import { createRoutes, route, createLayout } from '../../glaze-ui/dist/router';

// run command below to create a react micro-frontend
//
// npx create-glaze-ui-react-app navbar
//
// uncomment line below to register react micro-frontend
const apps = createApps([
    app('login', 'http://localhost:8081/login.js'),
    app('navbar', 'http://localhost:8083/navbar.js'),
    app('content', 'http://localhost:9000/content.js'),
    app('sidebar', 'http://localhost:9000/sidebar.js'),
    // app('navbar', () => System.import('http://localhost:8083/navbar.js'))
    // app('navbar', {
    //     mount: (container) => {
    //         const div = <div>rendered navbar</div>;
    //         container.appendChild(div);
    //         return div;
    //     },
    //     unmount: (container, app) => {
    //         container.removeChild(app)
    //     }
    // })
    // app('navbar', () =>({
    //     mount: (container) => {
    //         const div = <div>rendered navbar</div>;
    //         container.appendChild(div);
    //         return div;
    //     },
    //     unmount: (container, app) => {
    //         container.removeChild(app)
    //     }
    // }))
]);

const layout = createLayout(
    <div>
        <div className="row">
            <div id="navbar" />
        </div>
        <div className='row'>
            <div id="content" className='col-sm-8' />
            <div id="sidebar" className='col-sm-4' />
        </div>
    </div>
, {
    navbar: apps['navbar'],
    // content: apps['content'],
    // sidebar: apps['sidebar']
});

const router = createRoutes([
    route('/', layout),
    route('/login', apps['login']),
])


bootstrap({
    container: document.getElementById('root'),
    apps,
    router,
    sharedLibs: {
        'react': 'https://unpkg.com/react@17.0.2/umd/react.development.js',
        'react-dom': 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js',
        // 'react-dom': 'https://unpkg.com/@hot-loader/react-dom@17.0.1/umd/react-dom.development.js',
    },
    options: { debug: true }
}).then(async glaze => {
    // await apps['navbar'].mount(document.getElementById('root'));
    setTimeout(() => glaze.dispatch({test: "message"}), 1000);
}).catch(console.error);