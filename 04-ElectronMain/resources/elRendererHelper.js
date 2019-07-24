/* eslint-disable no-alert */
/* eslint-disable @lwc/lwc/no-inner-html */
/* eslint-disable @lwc/lwc/no-document-query */

const electron = require("electron");
const { ipcRenderer } = electron;

const utilElectron = document.querySelector('#utilElectron');

const evMap = {
	lastId: 0,
	callbacks: {}
};

utilElectron.addEventListener("toelectron", event => {
	// Save the callback
	const callBackId = evMap.lastId++;
	if (evMap.callbacks[callBackId]) {
		throw new Error("Callback ID already used");
	}

	// Update detail
	const detail = event.detail;
	detail.callBackId = callBackId;
	evMap.callbacks[callBackId] = detail.callback;

	// Call ipcMain
	switch (detail.type) {
		case "showDialog":
			ipcRenderer.send("showDialog", detail);
			break;
		default:
			alert("Invalid request");
			break;
	}
});

ipcRenderer.on("fromElectron", (event, detail) => {

	// Get the callback
	const callBackId = detail.callBackId;
	const callback = evMap.callbacks[callBackId];
	delete evMap.callbacks[callBackId];

	// Invoke it
	callback(detail);
});
