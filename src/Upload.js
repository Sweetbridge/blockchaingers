import React, { Component } from 'react'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import { Base64 } from 'js-base64'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'
import CertifiersList from './CertifiersList'
import { Card, CardTitle } from 'reactstrap'
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
      { value: 'Drivering License Image', type: 'file' },
      { value: 'Drivering License Number', type: 'text' },
      { value: 'Government Passport', type: 'file' },
      { value: 'Government ID Number', type: 'text' }
    ]
  }

	handleFileDrop = (item, monitor) => {
		if (monitor) {
			const droppedFiles = monitor.getItem().files
			this.setState({ droppedFiles })
		}
	}

  // handleTextFile = ({ target: { value: }}) => {
  //   this.setState(({ textFile }) => ({ droppedFiles: textFile }))
  // }
  handleDropDownFor = stateId => ({ target: { value }}) => {
    this.setState({ success: false })
    console.log('set ', stateId, ' to ', value)
    this.setState({ [stateId]: value })
  }

  handleCertificationSubmit = async () => {
    const encodedData = this.state.droppedFiles
    const hash = sha3(encodedData)
    const {certifierAddress, typeIdentifier, identificationName} = this.state

    try {
      await createDataEntry(typeIdentifier, identificationName, hash)
    } catch (err) {
      console.log('createDataEntry', err.message)
    }

    try {
      await requestCertification(certifierAddress, identificationName)
    } catch (err) {
      console.log('requestCertification', err.message)
    }

    const silo = await getSilo()
    try {
      await silo.methods.certifyClaim(identificationName, 1, (new Date()).getTime(), 9600)
        .send({from: certifierAddress})
    } catch (err) {
      console.log('certifyClaim', err.message)
    }

    const success = await isCertified(silo.options.address, identificationName)
    await this.props.updateEntities()
    this.setState({success: success})
  }

  render() {
    const {FILE} = NativeTypes
    const {droppedFiles, typeIdentifier, certifierAddress, success, identificationName} = this.state
    const validated = success ? 'VALIDATED' : 'NOT SUBMITTED'
    return (
      <Card style={{ padding: '20px' }}>
        <CardTitle>Request Certification</CardTitle>
        <select defaultValue='file' value={this.state.identityFormat} onClick={() => this.setState({ droppedFiles: [] })} onChange={this.handleDropDownFor('identityFormat')}>
          <option disable value='none'>Identity Format</option>
          <option value='file'>File</option>
          <option value='text'>Text</option>
        </select>
        <br/>

        <DragDropContextProvider backend={HTML5Backend}>
          <React.Fragment>
          {
            this.state.identityFormat === 'text' ?
              <input placeholder='identification text' onChange={this.handleDropDownFor('droppedFiles')} type='text' value={this.state.textFile}/> :
              <div style={{padding: '20px'}}>
                <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop}/>
                <FileList files={droppedFiles}/>
              </div>
          }
          <br/>
            <input type='text' placeholder='identification name' value={this.state.identificationName} onChange={this.handleDropDownFor('identificationName')} />
            <br/>
            <select value={this.state.typeIdentifier} defaultValue='none' onChange={this.handleDropDownFor('typeIdentifier')}>
              <option disabled value='none'>Select Identification Type</option>
              <option value='license'>license</option>
              <option value='passport'>passport</option>
              <option value='local-id'>local-id</option>
            </select>
            <br/>
            <CertifiersList certifiers={config.certifiers}
                            onChange={this.handleDropDownFor('certifierAddress')}/>
            <br/>
            <button onClick={this.handleCertificationSubmit}
                    disabled={!(typeIdentifier && certifierAddress && droppedFiles.length && identificationName)}>Submit for
              Certification {validated}</button>
          </React.Fragment>
        </DragDropContextProvider>
      </Card>
    )
  }
}

export default DragDropContext(HTML5Backend)(Uploader)
