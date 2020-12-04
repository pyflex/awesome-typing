import React from "react";

import { Col, Card, CardBody, Row, CardTitle, CardFooter } from "reactstrap";

const TypingInfoCard = ({ cardName, cardData, colorType, iconName }) => {
  return (
    <Col lg="3" md="6">
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col xs="5">
              <div className={`info-icon text-center icon-${colorType}`}>
                <i className={`tim-icons ${iconName}`} />
              </div>
            </Col>
            <Col xs="7">
              <div className="numbers">
                <p className="card-category">{cardName}</p>
                <CardTitle tag="h3">{cardData}</CardTitle>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <hr />
          <div className="stats">
            <i className="tim-icons icon-refresh-01" /> Updated Just Now
          </div>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default TypingInfoCard;
