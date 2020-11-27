import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";

import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import {
  match,
  email,
  minLength,
  required,
  validate,
} from "@gqlapp/validation-common-react";
import {
  Form,
  RenderField,
  Button,
  Alert,
  Icon,
  RenderSelect,
  Option,
  Card,
} from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";
import AlignmentTypes from '../constants';

const sequenceFormSchema = {
  sequence1: [required],
  sequence2: [required],
  alignmentType: [required],
  matchScore:[required],
  gapPanelty:[required],
  mismatchPanelty:[required],
};

const SequenceForm = ({ values, handleSubmit, submitting, errors, t }) => {
  return (
    <Card style={{ width: "100vw", maxWidth: "400px", minWidth: "300px" }}>
      <Form name="sequence" onSubmit={handleSubmit}>
        <Field
          name="alignmentType"
          component={RenderSelect}
          type="select"
          label={"Alignment Type"}
          value={values.alignmentType}
        >
          <Option value={AlignmentTypes.GA.name}>{AlignmentTypes.GA.title}</Option>
          <Option value={AlignmentTypes.LA.name}>{AlignmentTypes.LA.title}</Option>
        </Field>
        <Field
          name="sequence1"
          component={RenderField}
          type="textarea"
          // componentProps={{rows:4}}
          label={"Sequence1"}
          value={values.sequence1}
        />
        <Field
          name="sequence2"
          component={RenderField}
          type="textarea"
          label={"Sequence2"}
          value={values.sequence2}
        />
        <Field
          name="matchScore"
          component={RenderSelect}
          type="select"
          label={"Match Score"}
          value={values.matchScore}
        >
          <Option value={0}>0</Option>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
        </Field>
        <Field
          name="mismatchPanelty"
          component={RenderSelect}
          type="select"
          label={"Mismatch Panelty"}
          value={values.mismatchPanelty}
        >
          <Option value={0}>0</Option>
          <Option value={-1}>-1</Option>
          <Option value={-2}>-2</Option>
          <Option value={-3}>-3</Option>
          <Option value={-4}>-4</Option>
          <Option value={-5}>-5</Option>
        </Field>
        <Field
          name="gapPanelty"
          component={RenderSelect}
          type="select"
          label={"Gap Panelty"}
          value={values.gapPanelty}
        >
          <Option value={0}>0</Option>
          <Option value={-1}>-1</Option>
          <Option value={-2}>-2</Option>
          <Option value={-3}>-3</Option>
          <Option value={-4}>-4</Option>
          <Option value={-5}>-5</Option>
        </Field>
        <div className="text-center">
          {errors && errors.errorMsg && (
            <Alert color="error">{errors.errorMsg}</Alert>
          )}
          <Button block color="primary" type="submit" disabled={submitting}>
            Next <Icon type="arrow-right" />
          </Button>
        </div>
      </Form>
    </Card>
  );
};

SequenceForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object,
  t: PropTypes.func,
};

const SequenceFormWithFormik = withFormik({
  mapPropsToValues: () => ({
    sequence1: "",
    sequence2: "",
    alignmentType: "",
    matchScore: 1,
    mismatchPanelty: -1,
    gapPanelty: -1,
  }),
  validate: (values) => validate(values, squenceFormSchema),
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: "SignUpForm", // helps with React DevTools
});

export default translate("user")(SequenceFormWithFormik(SequenceForm));
