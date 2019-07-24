import { LightningElement, api } from 'lwc';
import { fireEvent } from 'util/pubsub';

export default class Electron extends LightningElement {
    @api
    get fromElectron() {
        throw new Error('This getter should not be called!');
    }
    set fromElectron(detail) {
        fireEvent('fromElectron', detail);
    }
}
