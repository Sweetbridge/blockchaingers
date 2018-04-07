import React, { Component } from 'react'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import { Base64 } from 'js-base64'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'
import CertifiersList from './CertifiersList'
import { hashData } from './utils/hash'
import { createDataEntry, requestCertification } from './utils/idSilo'
import config from './config'


export class Uploader extends Component {
  state = {
    droppedFiles: [],
    certifierAddress: undefined,
    typeIdentifier: undefined,
    idOptions: [
      { value: 'license' },
      { value: 'passport' },
      { value: 'local id' }
    ]
  }

	handleFileDrop = (item, monitor) => {
		if (monitor) {
			const droppedFiles = monitor.getItem().files
			this.setState({ droppedFiles })
		}
	}
  handleDropDownFor = stateId => ({ target: { value }}) => {
    console.log('set ', stateId, ' to ', value)
    this.setState({ [stateId]: value })
  }

  handleCertificationSubmit = () => {
    const encodedData = Base64.encode(this.state.droppedFiles)
    const hash = hashData(encodedData)
    const { certifierAddress, typeIdentifier } = this.state
    
    fetch(config.certificationService, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify({
        certifierAddress,
        typeIdentifier,
        data: encodedData,
        hash: hashData(encodedData),
      })
    })
    .then(res => res.json())
    .then(console.log)
  }


	render() {
		const { FILE } = NativeTypes
		const { droppedFiles, typeIdentifier, certifierAddress } = this.state

		return (
			<DragDropContextProvider backend={HTML5Backend}>
        <React.Fragment>
				<div style={{ padding: '20px' }}>
					<TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
					<FileList files={droppedFiles} />
				</div>
        <select value={this.state.typeIdentifier} defaultValue='none' onChange={this.handleDropDownFor('typeIdentifier')}>
          <option disabled value='none'>select an type of identification</option>,
          <option value='license'>license</option>
          <option value='passport'>passport</option>
          <option value='local-id'>local-id</option>
        </select>
        <br/>
        <CertifiersList certifiers={config.certifiers} onChange={this.handleDropDownFor('certifierAddress')} />
        <br />
        <button onClick={this.handleCertificationSubmit} disabled={!(typeIdentifier && certifierAddress)}>Submit for Certification</button>
        </React.Fragment>
			</DragDropContextProvider>
		)
	}
}

export default DragDropContext(HTML5Backend)(Uploader)
