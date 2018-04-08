import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FileList extends Component {
	static propTypes = {
		files: PropTypes.arrayOf(PropTypes.object),
	}


	render() {
		const { files = [] } = this.props

		if (files.length > 0) {
			return <div>File Uploaded</div>
		}

		return <div>Waiting for File</div>
	}
}
