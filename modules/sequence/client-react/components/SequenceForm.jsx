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

const sequenceFormSchema = {
  sequence1: [required],
  sequence2: [required],
  alignmentType: [required],
};

const SequenceForm = ({ values, handleSubmit, submitting, errors, t }) => {
  return (
    <Card style={{width:'100vw', maxWidth:'400px', minWidth:'300px'}}>
      <Form name="sequence" onSubmit={handleSubmit}>
        <Field
          name="alignmentType"
          component={RenderSelect}
          type="select"
          label={"Alignment Type"}
          value={values.alignmentType}
        >
          <Option value="GA">Global Alignment (Needleman-Wunsch)</Option>
          <Option value="LA">Local Alignment (Smith-Waterman)</Option>
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
          label={"Sequence"}
          value={values.sequence2}
        />

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
  mapPropsToValues: () => ({ sequence1: "", sequence2: "", alignmentType: "" }),
  validate: (values) => validate(values, squenceFormSchema),
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch((e) => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  enableReinitialize: true,
  displayName: "SignUpForm", // helps with React DevTools
});

export default translate("user")(SequenceFormWithFormik(SequenceForm));
