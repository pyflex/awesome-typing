/*!

=========================================================
* Black Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
import Step1 from "./forms/WizardSteps/Step1.js";
import Step2 from "./forms/WizardSteps/Step2.js";
import Step3 from "./forms/WizardSteps/Step3.js";

var steps = [
  {
    stepName: "About",
    stepIcon: "tim-icons icon-single-02",
    component: Step1,
  },
  {
    stepName: "Account",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: Step2,
  },
  {
    stepName: "Address",
    stepIcon: "tim-icons icon-delivery-fast",
    component: Step3,
  },
];

class Profile extends React.Component {
  finishButtonClick(finishStates) {
    console.log(finishStates);
    // firebase.set information from the form
  }

  render() {
    return (
      <>
        <div className="content">
          <Col className="mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title="Build Your Profile"
              description="This information will let us know more about you."
              headerTextCenter
              finishButtonClasses="btn-wd btn-info"
              nextButtonClasses="btn-wd btn-info"
              previousButtonClasses="btn-wd"
              progressbar
              color="blue"
              finishButtonClick={this.finishButtonClick}
            />
          </Col>
        </div>
      </>
    );
  }
}

export default Profile;
