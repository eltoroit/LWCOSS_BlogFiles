const { ipcMain, dialog } = require('electron');

ipcMain.on('showDialog', (event, detail) => {
    const buttons = ['OK', 'Cancel', 'Other'];
    dialog.showMessageBox(
        {
            type: 'warning',
            buttons: buttons,
            title: 'Hello in your language',
            message: detail.message
        },
        response => {
            detail.buttonClicked = buttons[response];
            event.sender.send('fromElectron', detail);
        }
    );
});
