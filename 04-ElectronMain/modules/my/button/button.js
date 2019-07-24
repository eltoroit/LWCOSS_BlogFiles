import { api } from 'lwc';
import LightningElementSLDS from 'util/lightningElementSLDS';
import {
    registerListener,
    unregisterListener,
    unregisterAllListeners
} from 'util/pubsub';

export default class Button extends LightningElementSLDS {
    @api message;

    getData() {
        const server = 'http://localhost:5000';
        fetch(`${server}/upper?msg=${this.message}`)
            .then(response => {
                return response.text(); // .json();
            })
            .then(text => {
                // eslint-disable-next-line no-alert
                alert(text);
            })
            .catch(error => {
                // eslint-disable-next-line no-alert
                alert(`Failed: ${error}`);
            });
    }

    showDialog() {
        registerListener('fromElectron', this.handleFromElectron, this);

        this.dispatchEvent(
            new CustomEvent('toelectron', {
                detail: {
                    type: 'showDialog',
                    message: this.message
                },
                composed: true,
                bubbles: true
            })
        );
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleFromElectron(detail) {
        // eslint-disable-next-line no-alert
        alert(`Button clicked: ${detail.buttonClicked}`);
        unregisterListener('fromElectron', this.handleFromElectron, this);
    }
}
