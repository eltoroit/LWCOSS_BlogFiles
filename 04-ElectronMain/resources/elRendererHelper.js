/* eslint-disable no-alert */
/* eslint-disable @lwc/lwc/no-inner-html */
/* eslint-disable @lwc/lwc/no-document-query */

const electron = require('electron');
const { ipcRenderer } = electron;

const utilElectron = document.querySelector('#utilElectron');

utilElectron.addEventListener('toelectron', event => {
    switch (event.detail.type) {
        case 'showDialog':
            ipcRenderer.send('showDialog', event.detail);
            break;
        default:
            alert('Invalid request');
            break;
    }
});

ipcRenderer.on('fromElectron', (event, detail) => {
    utilElectron.fromElectron = detail;
});
