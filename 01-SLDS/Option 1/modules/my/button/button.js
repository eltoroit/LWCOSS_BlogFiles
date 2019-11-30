import { api } from 'lwc';
import LightningElementSLDS from 'util/lightningElementSLDS';

export default class Button extends LightningElementSLDS {
	@api message;

	getData() {
		// eslint-disable-next-line no-alert
		alert(this.message);
	}
}
