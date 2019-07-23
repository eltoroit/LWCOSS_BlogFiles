// https://electronjs.org/docs/api/client-request
// https://electronjs.org/docs/api/incoming-message

const { ipcMain, net } = require("electron");

ipcMain.on("netRequest", (event, detail) => {
	const request = net.request(detail.request.options);
	detail.request.headers.forEach(header => {
		request.setHeader(header.name, header.value);
	});
	request.write(detail.request.data);
	request.on('response', (response) => {

		detail.response = {
			statusCode: response.statusCode,
			headers: response.headers,
			hasError: false,
			isAborted: false,
			body: ""
		}
		
		response.on('data', (chunk) => {
			detail.response.body += chunk;
		})

		response.on('end', () => {
			event.sender.send("fromElectron", detail);
		})

		response.on('aborted', () => {
			detail.response.isAborted = true;
			event.sender.send("fromElectron", detail);
		})

		response.on('error', (error) => {
			detail.response.hasError = true;
			detail.response.error = error;
			event.sender.send("fromElectron", detail);
		})
	});

	request.end();
});

  
