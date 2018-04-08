import React from 'react'
import {
  Card, Container, Row, Col,
  ListGroup, ListGroupItem, CardBody,
  CardImage, CardTitle, Button, CardText,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  InputGroup, Input
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

// const AddIdentification = ({ isOpen = false, onSelect, typeIdentifier, onInputChange, onSubmit, selectIdentityType }) =>
//     <Row style={{ marginBottom: '20px'}}>
//       <Col xs='12'>
//         <Card>
//         <CardBody>
//           <CardTitle>Add Identification</CardTitle>
//             <input placeholder="Name Your Identification" onChange={onInputChange}/>
//           <br/>
//             <select type='select' defaultValue='none' value={typeIdentifier} onChange={onSelect}>
//               <option disabled value='none'>Select an Identification type</option>
//               {identificationTypes.map(type => <option value={type}>{type}</option>)}
//             </select>
//           <br/>
//           <br/>
//           <Button disabled={true} onClick={() => createDataEntry()}>Submit Identification</Button>
//         </CardBody>
//         </Card>
//       </Col>
//     </Row>

// const CertificationRequester = ({ isOpen = false, onSelect, certifierAddress }) =>
  // <Row>
  //   <Col xs='12'>
  //   <Card>
  //   <CardBody>
  //     <CardTitle>Request Certification</CardTitle>
  //       <select defaultValue='none' value={certifierAddress} onChange={onSelect}>
  //         <option disabled valut='none'>Select a certifier</option>
  //         {identificationTypes.map(type => <option value={type}>{type}</option>)}
  //       </select>
  //       <br/>
  //       <br/>
  //     <Button disabled={true}>Submit Certification</Button>
  //   </CardBody>
  //   </Card>
  //   </Col>
  // </Row>

  const IdentityList = ({ entries }) =>
    <Col xs="6">
      <ListGroup>
        <ListGroupItem>
          <div className="float-left">Your IDs</div>
        </ListGroupItem>
        {
          entries.length > 0 ?
            entries.map(entry =>
              <ListGroupItem>
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
            : <ListGroupItem>You currently do not have any identification entries</ListGroupItem>
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
    getSilo()
      .then(() => listDataEntries())
      .then(entries => Promise.all(entries.map(entry => getCertifications(entry.hash).then(certs => Object.assign(entry, { certs }))
    )))
      .then(entries => { this.setState({ entries }); console.log('some entries: ', entries) } )
  }

  render() {
    const { entries, selected, certifierAddress, typeIdentifier } = this.state

    return (
      <div style={{ background: '#79d286', minHeight: '1000px', padding: '30px' }}>
        <Container>
          <Row>
            <IdentityList entries={entries} />
            <Col xs="6">
              <Upload />
            </Col>
         </Row>
        </Container>
      </div>
    )
  }
}


export default DataAddPanel
