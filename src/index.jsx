/** @jsx createElement */
import { createElement } from 'glaze-ui';
import { bootstrap, createApps, app } from 'glaze-ui';
import { createRoutes, route, createLayout } from 'glaze-ui';

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
    
    // -------------------------------------------------------
    // example on how to manually import an external glaze app
    // -------------------------------------------------------
    // app('navbar', () => System.import('http://localhost:8083/navbar.js'))

    // ---------------------------------------------
    // example on how to manually render a glaze app
    // ---------------------------------------------
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
    content: apps['content'],
    sidebar: apps['sidebar']
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
    },
    options: { debug: true }
}).then(async glaze => {
    // example on how to mount a glaze app without a router
    // await apps['navbar'].mount(document.getElementById('root'));

    // example on how to send a message to a glaze app
    glaze.dispatch({test: "message"});
}).catch(console.error);