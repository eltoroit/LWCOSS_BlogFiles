import { LightningElement, api } from 'lwc';
import { fireEvent } from 'util/pubsub';

export default class Electron extends LightningElement {
    @api
    get fromElectron() {
        throw new Error('This getter should not be called!');
    }
    set fromElectron(data) {
        // eslint-disable-next-line no-alert
        // alert(data.msg);
        fireEvent('fromElectron', data);
    }
}
