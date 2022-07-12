import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {callbackService} from "../CallbackService";

describe('Callback Service', () => {
    it('Test getServiceAll method', done => {
        const mock = new MockAdapter(axios);
        const data = {response: true};

        mock.onGet(`/homework-assistance/services/all`).reply(200, data);


        callbackService.getServices().then(response => {
            expect(response.data).toEqual(data);
            expect(response.status).toEqual(200);
            expect(response.config.url).toEqual(`/homework-assistance/services/all`);
            done();
        });
    });
});
