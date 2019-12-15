import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export class AddEmpModal extends Component {
  constructor(props) {
    super(props);

    this.state = { deps: [], snackbaropen: false, snackbarmsg: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        EmployeID: null,
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
              Add Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="EmployeName">
                    <Form.Label>EmployeName</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmployeName"
                      required
                      placeholder="EmployeName"
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>

                    <Form.Control as="select">
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
                      placeholder="MailID"
                    />
                  </Form.Group>

                  <Form.Group controlId="DOJ">
                    <Form.Label>DOJ</Form.Label>
                    <Form.Control
                      type="date"
                      name="DOJ"
                      required
                      placeholder="DOJ"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button varient="primary" type="submit">
                      Add Employee
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
