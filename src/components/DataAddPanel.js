import React from 'react'
import {
  Card, Container, Row, Col,
  ListGroup, ListGroupItem, Button
} from 'reactstrap'
import Upload from '../Upload'
import { Base64 } from 'js-base64'
import { hashData } from '../utils/hash'
import { createDataEntry, requestCertification, getCertifications, listDataEntries, getSilo } from '../utils/idSilo'
import config from '../config'
const identificationTypes = [
  'Driver\'s License Number',
  'Passport Number'
]

  const IdentityList = ({ entries }) =>
    <Col xs="6">
      <ListGroup>
        <ListGroupItem style={{
          background: '#FFFFFF',
          boxShadow: '0 3px 10px 0 rgba(0,0,0,0.10)',
          zIndex: '99',}}>
          <div className="float-left">Your IDs</div>
        </ListGroupItem>
        {
          entries.length > 0 ?
            entries.map(entry =>
              <ListGroupItem style={{
                background: '#F1F1F1',}}>
                <div className="float-left">{entry.name}</div>
                {
                  entry.certifications.some(cert => cert.state === '1') ?
                  <button style={{ background: 'green' }} className="btn float-right">
                    Approved
                  </button>
                  : ''
                }
              </ListGroupItem>
            )
            : <ListGroupItem style={{
              background: '#F1F1F1',}}>You currently do not have any identification entries</ListGroupItem>
        }
      </ListGroup>
    </Col>

const testEntries = [{
  name: 'Josh\'s TIN',
  certified: false
}, {
  name: 'Josh\'s Passport',
  certified: true
}]
class DataAddPanel extends React.PureComponent {

    state = {
      entries: [],
      selected: 'add',
      droppedFiles: [],
      certifierAddress: undefined,
      typeIdentifier: undefined,
      idOptions: [
        { value: 'license' },
        { value: 'passport' },
        { value: 'local id' }
      ]
    }

  componentDidMount() {
    this.updateEntities()
  }

  updateEntities = () => {
    getSilo()
      .then(() => listDataEntries())
      .then(entries => Promise.all(entries.map(entry => getCertifications(entry.hash).then(certs => Object.assign(entry, { certs }))
    )))
      .then(entries => { this.setState({ entries }); console.log('some entries: ', entries) } )
  }


  render() {
    const { entries, selected, certifierAddress, typeIdentifier } = this.state
    return (
      <div style={{ backgroundImage: 'linear-gradient(44deg, #9CED90 0%, #5FCC80 100%)', minHeight: '1000px', padding: '30px' }}>
        <Container>
          <Row>
            <IdentityList entries={entries} />
            <Col xs="6">
              <Upload updateEntities={this.updateEntities}/>
            </Col>
         </Row>
        </Container>
      </div>
    )
  }
}

export default DataAddPanel
