import { Glaze } from 'glaze-ui';

const glaze = new Glaze({debug: true});
glaze.registerApp('@test/test', '/test-test.js', '/test', document.getElementById('test'));
glaze.bootstrap().then(() => {
    glaze.dispatch({ test: "message" });
});