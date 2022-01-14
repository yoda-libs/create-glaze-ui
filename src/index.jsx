/** @jsx createElement */
import { 
    createElement,
    bootstrap, 
    createApps, app, 
    createRoutes, route
} from 'glaze-ui';

// run command below to create a react micro-frontend
//
// npx create-glaze-ui-react-app navbar
//
// uncomment line below to register react micro-frontend
const apps = createApps([
    app('navbar', 'http://localhost:8081/navbar.js'),
]);

const layout = createLayout(
    <div>
        <div className="row">
            <div id="navbar" />
        </div>
    </div>
, {
    navbar: apps['navbar'],
});

const router = createRoutes([
    route('/', layout),
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
    // example on how to send a message to a glaze app
    glaze.dispatch({test: "message"});
}).catch(console.error);