import React, { useState } from "react";
import Helmet from "react-helmet";
import { Select, Input } from "antd";
import { PageLayout } from "@gqlapp/look-client-react";
import SequenceForm from "./SequenceForm";
import NeedlemanWunsch from "./NeedlemanWunsch";

const { TextArea } = Input;
const { Option } = Select;

const SequenceView = ({ t }) => {
  const [formValues, setFormValues] = useState({
    alignmentType: "",
    sequence1: "",
    sequence2: "",
    matchScore: 1,
    mismatchPanelty: -1,
    gapPanelty: -1,
  });

  const onSubmit = (values) => {
    console.log(values);
    const newValues = {
      alignmentType: values.alignmentType,
      sequence1: values.sequence1,
      sequence2: values.sequence2,
      matchScore: values.matchScore,
      mismatchPanelty: values.mismatchPanelty,
      gapPanelty: values.gapPanelty,
    };
    setFormValues(newValues);
  };

  return (
    <>
      {formValues.alignmentType === "GA" && (
        <NeedlemanWunsch sequenceValues={formValues} />
      )}

      {formValues.alignmentType === "" && (
        <div
          style={{
            display: "grid",
            placeContent: "center",
            width: "100vw",
            padding: "24px",
            minHeight: "100vh",
            // height: "100%",
          }}
        >
          <SequenceForm onSubmit={onSubmit} />
        </div>
      )}
    </>
  );
};

export default SequenceView;
