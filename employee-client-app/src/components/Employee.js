import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from "./AddEmpModal";
import { EditEmpModal } from "./EditEmpModal";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch("https://localhost:44356/api/employee")
      .then(response => response.json())
      .then(data => {
        this.setState({ emps: data });
      });
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteEmp(empid) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44356/api/employee/" + empid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  }

  render() {
    const { emps, empid, empname, depmt, mailid, doj } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>EmployeID</th>
              <th>EmployeName</th>
              <th>Department</th>
              <th>MailID</th>
              <th>DOJ</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map(emp => (
              <tr key={emp.EmployeID}>
                <td>{emp.EmployeID}</td>
                <td>{emp.EmployeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.MailID}</td>
                <td>{emp.DOJ}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      varient="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          empid: emp.EmployeID,
                          empname: emp.EmployeName,
                          depmt: emp.Department,
                          mailid: emp.MailID,
                          doj: emp.DOJ
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      onClick={() => this.deleteEmp(emp.EmployeID)}
                      variant="danger"
                    >
                      Delete
                    </Button>

                    <EditEmpModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      empid={empid}
                      empname={empname}
                      depmt={depmt}
                      mailid={mailid}
                      doj={doj}
                    ></EditEmpModal>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Employee
          </Button>
          <AddEmpModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
