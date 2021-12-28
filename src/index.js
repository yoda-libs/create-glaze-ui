import { Glaze } from 'glaze-ui';

const glaze = new Glaze({debug: true});

// run command below to create a react micro-frontend
//
// npx create-glaze-ui-react-app navbar
//
// uncomment line below to register react micro-frontend
glaze.registerApp({
    type: 'react',
    name: 'navbar', 
    url: 'http://localhost:8081/navbar.js',
    route: '/', 
    container: document.getElementById('navbar')
});

glaze.bootstrap().then(() => {
    //dispatch test message to all micro-frontend apps
    glaze.dispatch({ test: "message" });
});