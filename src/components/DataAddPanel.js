import React from 'react'
import {
  Card, Container, Row, Col,
  ListGroup, ListGroupItem, CardBody,
  CardImage, CardTitle, Button, CardText,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  InputGroup, Input
} from 'reactstrap'
import { listDataEntries } from '../utils/idSilo'
const identificationTypes = [
  'Driver\'s License Number',
  'Passport Number'
]

const AddIdentification = ({ isOpen = true}) =>
  <CardBody>
    <CardTitle>Add Identification</CardTitle>
    <InputGroup>
    <Input placeholder="Name Your Identification" />
    </InputGroup>
    <br/>
    <Dropdown isOpen={isOpen} toggle={this.toggle}>
      <DropdownToggle caret>
        Identification Type
      </DropdownToggle>
      <DropdownMenu right>
        {identificationTypes.map(type => <DropdownItem value={type}>{type}</DropdownItem>)}
      </DropdownMenu>
    </Dropdown>
    <br/>
    <Button disabled={true}>Submit Identification</Button>
  </CardBody>

const testEntries = [{
  name: 'Josh\'s TIN',
  certified: false
}, {
  name: 'Josh\'s Passport',
  certified: true
}]
class DataAddPanel extends React.PureComponent {
  state = { entries: [], selected: 'add' }
  componentDidMount() {
    listDataEntries()
      .then(entries => this.setState({ entries: testEntries }))
      .then(console.log(this.state))
  }
  render() {
    const { entries, selected } = this.state
    return (
      <div style={{ background: '#79d286', minHeight: '1000px', padding: '30px' }}>
        <Container>
          <Row>
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
                          entry.certified ?
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
            <Col xs="6">
            <Card>
            {
                selected === 'add' ?
                <AddIdentification />
                :
                 <CardBody>
                   <CardTitle>Card title</CardTitle>
                   <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                   <Button>Button</Button>
                 </CardBody>
            }
            </Card>
           </Col>
         </Row>
        </Container>
      </div>
    )
  }
}

export default DataAddPanel
