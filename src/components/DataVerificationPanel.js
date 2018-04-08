import React from 'react'
import {
  Card, Container, Row, Col,
  Form, FormGroup, Label, FormText,
  CardBody, CardImg,
  CardImage, CardTitle, Button, CardText,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  InputGroup, Input
} from 'reactstrap'
import {getSilo, listDataEntries} from '../utils/idSilo'
import {logo} from '../config'
const { utils: { sha3 } } = require('web3')

const identificationTypes = [
  'Driver\'s License Number',
  'Passport Number'
]

const AddIdentification = ({isOpen = true}) =>
  <CardBody>
    <CardTitle>Add Identification</CardTitle>
    <InputGroup>
      <Input placeholder="Name Your Identification"/>
    </InputGroup>
    <Button disabled={true}>Submit Identification</Button>
  </CardBody>

const testEntries = [{
  name: 'Josh\'s TIN',
  certified: false
}, {
  name: 'Josh\'s Passport',
  certified: true
}]

class DataVerificationPanel extends React.PureComponent {
  state = {
    displayResultFailure: {display: 'none'},
    displayResultSuccess: {display: 'none'},
  }

  componentDidMount() {
    listDataEntries()
      .then(entries => this.setState({entries: testEntries}))
      .then(console.log(this.state))
    getSilo().then(silo => this.setState({siloId: silo.options.address}))

  }

  handleChangeDownFor = stateId => ({ target: { value }}) => {
    console.log('set ', stateId, ' to ', value)
    this.setState({ [stateId]: value })
  }

  verifyEntry = (entries, entryName, entryValue) => {
    let valueHash = sha3(entryValue)
    let entry = entries.find(entry => entry.name == entryName)
    if(entry) {
      return entry.hash == valueHash
    }
    return false
  }

  submitData = async () => {

    let entries = await listDataEntries()
    console.log(entries)

    let verified = true
    verified = verified && this.state.firstName && this.verifyEntry(entries, 'firstName', this.state.firstName)
    verified = verified && this.state.lastName && this.verifyEntry(entries, 'lastName', this.state.lastName)
    if(verified) {
      this.setState({
        displayResultFailure: {display: 'none'},
        displayResultSuccess: {},
      })
    } else {
      this.setState({
        displayResultFailure: {},
        displayResultSuccess: {display: 'none'},
      })
    }
  }

  render() {
    const {entries, selected, displayResult} = this.state

    return (
      <div style={{background: '#79d286', minHeight: '1000px', padding: '30px'}}>
        <Container>
          <Row>
            <Col xs="8">
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">First Name</Label>
                  <Input type="text" name="firstName" id="firstNameId"
                         onChange={this.handleChangeDownFor('firstName')}
                         placeholder="Please Type your first name"/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Last Name</Label>
                  <Input type="text" name="lastName" id="lastNameId"
                         onChange={this.handleChangeDownFor('lastName')}
                         placeholder="Please Type your last name"/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Identification Location</Label>
                  <Input type="text" name="idSilo" id="idSiloId"
                         onChange={this.handleChangeDownFor('siloId')}
                         value={this.state.siloId}
                         placeholder="Please copy paste the address of your ID Silo contract"/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Identification</Label>
                  <Input type="select" name="select" id="exampleSelect" multiple
                         onChange={this.handleChangeDownFor('typeIdentifier')}>
                    <option value='license'>license</option>
                    <option value='passport'>passport</option>
                    <option value='local-id'>local-id</option>
                  </Input>
                </FormGroup>
                <Button onClick={this.submitData}>Submit for Verification</Button>
              </Form>
            </Col>
            <Col xs="4">
              <Card style={this.state.displayResultSuccess}>
                <CardImg top width="100%"
                         src="/approved.svg"
                         alt="Card image cap"/>
                <CardBody>
                  <CardTitle>Approval</CardTitle>
                  <CardText>Your information has been successfully approved. You are now a member of SweetBridge</CardText>
                </CardBody>
              </Card>
              <Card style={this.state.displayResultFailure}>
                <CardImg top width="100%"
                         src="/rejected.svg"
                         alt="Card image cap"/>
                <CardBody>
                  <CardTitle>Rejection</CardTitle>
                  <CardText>Your information could not be verified. Please correct the information</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default DataVerificationPanel
