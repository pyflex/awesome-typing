import React from "react";

import { Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";

const TypingCharts = ({ title, numbers, chartExample, isLine }) => {
  return (
    <>
      <Col lg="4">
        <Card className="card-chart">
          <CardHeader>
            <h5 className="card-category">{title}</h5>
            <CardTitle tag="h3">
              <i className="tim-icons icon-bell-55 text-primary" /> {numbers}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              {isLine ? (
                <Line data={chartExample.data} options={chartExample.options} />
              ) : (
                <Bar data={chartExample.data} options={chartExample.options} />
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default TypingCharts;
