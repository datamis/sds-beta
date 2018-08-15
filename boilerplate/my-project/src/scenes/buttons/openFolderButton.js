import React, { Component } from 'react';
//import {  Button, CardBody, Card } from 'reactstrap';
import Button from 'antd/lib/button';

 const {ipcRenderer} = require('electron');

/*const selectDirBtn = document.getElementById('select-directory')
selectDirBtn2.addEventListener('click', (event) => {
 var extension = '.'+selectedExtension();
console.log(extension);
  ipcRenderer.send('open-file-dialog-2',extension)
})
*/
class OpenFolderBTN extends Component {
    constructor(props) {
        super(props);


        this.state = {
            shown: true,
            value : ''
        };
    }
    selectDirectory() {
  	 //  ipcRenderer.send('open-file-dialog');
	}
    render() {
        return (
          <div>
            <button type="button" class="btn btn-primary"  id="openFolderBTN" onClick = {this.selectDirectory.bind(this)}>Open Folder</button>

          </div>
        );
    }
}

export default OpenFolderBTN;
