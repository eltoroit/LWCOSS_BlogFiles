import { api } from 'lwc';
import LightningElementSLDS from 'util/lightningElementSLDS';
import {
    registerListener,
    unregisterListener,
    unregisterAllListeners
} from 'util/pubsub';

export default class Button extends LightningElementSLDS {
    @api message;

    // getData() {
    //     const server = 'http://localhost:5000';
    //     fetch(`${server}/upper?msg=${this.message}`)
    //         .then(response => {
    //             return response.text(); // .json();
    //         })
    //         .then(text => {
    //             // eslint-disable-next-line no-alert
    //             alert(text);
    //         })
    //         .catch(error => {
    //             // eslint-disable-next-line no-alert
    //             alert(`Failed: ${error}`);
    //         });
    // }

    getData() {
        registerListener('fromElectron', this.handleSearchKeyChange, this);

        this.dispatchEvent(
            new CustomEvent('toelectron', {
                detail: {
                    type: 'netRequest',
                    request: {
                        options: {
                            method: 'GET',
                            url: `http://localhost:5000/upper?msg=${this.message}`
                        },
                        headers: [
                            {
                                name: 'Content-Type',
                                value: 'application/json'
                            }
                        ],
                        data: JSON.stringify({ a: 1, b: 2 })
                    }
                },
                composed: true,
                bubbles: true
            })
        );
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleSearchKeyChange(data) {
        // eslint-disable-next-line no-alert
        alert('Back at App (v1.0): ' + data.response.body);
        unregisterListener('fromElectron', this.handleSearchKeyChange, this);
    }
}
