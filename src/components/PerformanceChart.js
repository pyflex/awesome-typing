import React from "react";

import { chartExample1 } from "variables/charts";
import { Col, Row, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { Line } from "react-chartjs-2";

const PerformanceChart = () => {
  return (
    <Col xs="12">
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Total Shipments</h5>
              <CardTitle tag="h2">Performance</CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <Line
              data={chartExample1["data1"]}
              options={chartExample1.options}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PerformanceChart;
