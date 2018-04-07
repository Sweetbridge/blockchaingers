import React, {Component} from 'react'
import {DragDropContext, DragDropContextProvider} from 'react-dnd'
import {Base64} from 'js-base64'
import HTML5Backend, {NativeTypes} from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'
import CertifiersList from './CertifiersList'
import {createDataEntry, getSilo, requestCertification} from './utils/idSilo'
// import { createDataEntry, requestCertification } from './utils/idSilo'
import config from './config'
import base64js from 'base64-js'
import {isCertified} from "./utils/verifiers";

const {utils: {sha3}} = require('web3')


export class Uploader extends Component {
  state = {
    droppedFiles: [],
    certifierAddress: undefined,
    typeIdentifier: undefined,
    idOptions: [
      {value: 'license'},
      {value: 'passport'},
      {value: 'local id'}
    ]
  }

  handleFileDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files
      var reader = new FileReader()
      reader.onload = (evt) => {
        let bytes = new TextEncoder('utf8').encode(evt.currentTarget.result)
        let b64String = base64js.fromByteArray(bytes)
        this.setState({droppedFile: b64String})
      }
      reader.readAsBinaryString(droppedFiles[0])
    }
  }

  handleDropDownFor = stateId => ({target: {value}}) => {
    console.log('set ', stateId, ' to ', value)
    this.setState({[stateId]: value})
  }

  handleCertificationSubmit = async () => {
    const encodedData = this.state.droppedFile
    const hash = sha3(encodedData)
    const {certifierAddress, typeIdentifier} = this.state

    try {
      await createDataEntry(typeIdentifier, typeIdentifier, hash)
    } catch (err) {
      console.log('createDataEntry', err.message)
    }

    try {
      await requestCertification(certifierAddress, typeIdentifier)
    } catch (err) {
      console.log('requestCertification', err.message)
    }

    const silo = await getSilo()
    try {
      await silo.methods.certifyClaim(typeIdentifier, 1, (new Date()).getTime(), 9600)
        .send({from: certifierAddress})
    } catch (err) {
      console.log('certifyClaim', err.message)
    }

    const success = await isCertified(silo.options.address, typeIdentifier)

    this.setState({success: success})
  }


  render() {
    const {FILE} = NativeTypes
    const {droppedFiles, typeIdentifier, certifierAddress, success} = this.state
    const validated = success ? 'VALIDATED' : 'NOT SUBMITTED'
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <React.Fragment>
          <div style={{padding: '20px'}}>
            <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop}/>
            <FileList files={droppedFiles}/>
          </div>
          <select value={this.state.typeIdentifier} defaultValue='none'
                  onChange={this.handleDropDownFor('typeIdentifier')}>
            <option disabled value='none'>select an type of identification</option>
            ,
            <option value='license'>license</option>
            <option value='passport'>passport</option>
            <option value='local-id'>local-id</option>
          </select>
          <br/>
          <CertifiersList certifiers={config.certifiers}
                          onChange={this.handleDropDownFor('certifierAddress')}/>
          <br/>
          <button onClick={this.handleCertificationSubmit}
                  disabled={!(typeIdentifier && certifierAddress)}>Submit for
            Certification {validated}</button>
        </React.Fragment>
      </DragDropContextProvider>
    )
  }
}

export default DragDropContext(HTML5Backend)(Uploader)
