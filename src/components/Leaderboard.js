import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Progress,
  Table,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const Leaderboard = (props) => {
  const loopOverPeople = [1, 2, 3, 4, 5, 6];
  return (
    <Col lg="12">
      <Card>
        {/* toolbar start */}
        <CardHeader>
          <div className="tools float-right">
            <UncontrolledDropdown>
              <DropdownToggle
                caret
                className="btn-icon"
                color="link"
                data-toggle="dropdown"
                type="button"
              >
                <i className="tim-icons icon-settings-gear-63" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Another action
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  Something else
                </DropdownItem>
                <DropdownItem
                  className="text-danger"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Remove Data
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardTitle tag="h5">Management Table</CardTitle>
        </CardHeader>
        {/* toolbar end */}

        {/* leaderboard people start */}
        <CardBody>
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th className="text-center">#</th>
                <th>Name</th>
                <th>Job Position</th>
                <th>Milestone</th>
                <th className="text-right">Salary</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* individual start */}
              {loopOverPeople.map((person, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      <div className="photo">
                        <img alt="..." src={require("assets/img/tania.jpg")} />
                      </div>
                    </td>
                    <td>Tania Mike</td>
                    <td>Develop</td>
                    <td className="text-center">
                      <div className="progress-container progress-sm">
                        <Progress multi>
                          <span className="progress-value">25%</span>
                          <Progress bar max="100" value="25" />
                        </Progress>
                      </div>
                    </td>
                    <td className="text-right">€ 99,225</td>
                    <td className="text-right">
                      <Button
                        className="btn-link btn-icon btn-neutral"
                        color="success"
                        id="tooltip618296632"
                        size="sm"
                        title="Refresh"
                        type="button"
                      >
                        <i className="tim-icons icon-refresh-01" />
                      </Button>
                      <UncontrolledTooltip delay={0} target="tooltip618296632">
                        Tooltip on top
                      </UncontrolledTooltip>
                      <Button
                        className="btn-link btn-icon btn-neutral"
                        color="danger"
                        id="tooltip707467505"
                        size="sm"
                        title="Delete"
                        type="button"
                      >
                        <i className="tim-icons icon-simple-remove" />
                      </Button>
                      <UncontrolledTooltip delay={0} target="tooltip707467505">
                        Tooltip on top
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                );
              })}

              {/* individual end */}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Leaderboard;
