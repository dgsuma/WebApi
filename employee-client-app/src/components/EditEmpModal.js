import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export class EditEmpModal extends Component {
  constructor(props) {
    super(props);

    this.state = { deps: [], snackbaropen: false, snackbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Loading departments for drop-down list
  componentDidMount() {
    fetch("https://localhost:44356/api/department")
      .then(response => response.json())
      .then(data => {
        this.setState({ deps: data });
      });
  }

  snackbarClose = event => {
    this.setState({ snackbaropen: false });
  };

  handleSubmit(event) {
    event.preventDefault();

    fetch("https://localhost:44356/api/employee", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        EmployeID: event.target.EmployeID.value,
        EmployeName: event.target.EmployeName.value,
        Department: event.target.Department.value,
        MailID: event.target.MailID.value,
        DOJ: event.target.DOJ.value
      })
    })
      .then(res => res.json())
      .then(
        result => {
          // alert(result);
          this.setState({ snackbaropen: true, snackbarmsg: result });
        },
        error => {
          // alert("Failed");
          this.setState({ snackbaropen: true, snackbarmsg: "failed" });
        }
      );
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigion={{ vertical: "bottom", horizonatal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeID">
                    <Form.Label>EmployeID</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeID"
                      disabled
                      defaultValue={this.props.empid}
                      placeholder="EmployeID"
                    />
                  </Form.Group>

                  <Form.Group controlId="EmployeName">
                    <Form.Label>EmployeName</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeName"
                      required
                      defaultValue={this.props.empname}
                      placeholder="EmployeName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>

                    <Form.Control as="select" defaultValue={this.props.depmt}>
                      {this.state.deps.map(dep => (
                        <option key={dep.DepartmentID}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="MailID">
                    <Form.Label>MailID</Form.Label>
                    <Form.Control
                      type="text"
                      name="MailID"
                      required
                      defaultValue={this.props.mailid}
                      placeholder="MailID"
                    />
                  </Form.Group>

                  <Form.Group controlId="DOJ">
                    <Form.Label>DOJ</Form.Label>
                    <Form.Control
                      type="date"
                      name="DOJ"
                      required
                      defaultValue={this.props.doj}
                      placeholder="DOJ"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button varient="primary" type="submit">
                      Update Employee
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
