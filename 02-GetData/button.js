import { api } from "lwc";
import LightningElementSLDS from "util/lightningElementSLDS";

export default class Button extends LightningElementSLDS {
	@api message;

	getData() {
		fetch(`http://localhost:5000/upper?msg=${this.message}`)
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
}
