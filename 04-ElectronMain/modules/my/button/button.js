import { api } from 'lwc';
import LightningElementSLDS from 'util/lightningElementSLDS';
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
        this.dispatchEvent(
            new CustomEvent('toelectron', {
                detail: {
                    type: 'showDialog',
                    message: this.message,
                    callback: detail => {
                        // eslint-disable-next-line no-alert
                        alert(`Button clicked (callback): ${detail.buttonClicked}`);
                    }
                },
                composed: true,
                bubbles: true
            })
        );
    }
}
