import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'

const style = {
	border: '1px solid #5ABC77',
	width: '288px',
	padding: '10px 0px 8px 10px',
  margin: 'auto',
	textAlign: 'center',
	color: '#5ABC77',
}

export class TargetBox extends React.PureComponent {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
		accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
		onDrop: PropTypes.func,
	}

	render() {
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		return connectDropTarget(
			<div style={style}>
				{isActive ? 'Release to drop' : 'Drag file here'}
			</div>,
		)
	}
}

const boxTarget = {
	drop(props, monitor) {
		if (props.onDrop) {
			props.onDrop(props, monitor)
		}
	},
}

const hoc = compose(
  DropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
  	connectDropTarget: connect.dropTarget(),
  	isOver: monitor.isOver(),
  	canDrop: monitor.canDrop(),
  }))
)

export default hoc(TargetBox)
