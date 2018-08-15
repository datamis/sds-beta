//const electron = require('electron')
//const ipcMain = electron.ipcMain
//const dialog = electron.dialog || electron.remote.dialog
const {ipcMain, dialog} = require('electron')
const fs = require('fs');
const path = require('path');




ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    if (files) {
      event.sender.send('selected-directory', files)
    }
  })
})
