import React, { Component } from 'react'
import { DragDropContext, DragDropContextProvider } from 'react-dnd'
import { Base64 } from 'js-base64'
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend'
import TargetBox from './TargetBox'
import FileList from './FileList'
import { hashData } from './utils/hash'


export class Uploader extends Component {
  state = { droppedFiles: [] }
	handleFileDrop = (item, monitor) => {
		if (monitor) {
			const droppedFiles = monitor.getItem().files
			this.setState({ droppedFiles })
		}
	}

  handleCertificationSubmit = () => {
    const encodedData = Base64.encode(this.state.droppedFiles)

    fetch('http://localhost:3333/certify', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify({
        data: encodedData,
        typeIdentifier: 'license',
        hash: hashData(encodedData),
      })
    })
    .then(res => res.json())
    .then(console.log)
  }


	render() {
		const { FILE } = NativeTypes
		const { droppedFiles } = this.state

		return (
			<DragDropContextProvider backend={HTML5Backend}>
        <React.Fragment>
				<div>
					<TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
					<FileList files={droppedFiles} />
				</div>
        <button onClick={this.handleCertificationSubmit}>Submit for Certification</button>
        </React.Fragment>
			</DragDropContextProvider>
		)
	}
}

export default DragDropContext(HTML5Backend)(Uploader)
