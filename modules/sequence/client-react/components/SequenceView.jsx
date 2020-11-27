import React, { useState } from "react";
import Helmet from "react-helmet";
import { Select, Input } from "antd";
import { PageLayout } from "@gqlapp/look-client-react";
import SequenceForm from "./SequenceForm";
import Sequencer from "./Sequencer";

const { TextArea } = Input;
const { Option } = Select;

const SequenceView = ({ t }) => {
  const [formValues, setFormValues] = useState({
    sequence1: "",
    sequence2: "",
    matchScore: 1,
    mismatchPanelty: -1,
    gapPanelty: -1,
  });

  const [alignmentType, setAlignmentType] = useState("");

  const onSubmit = (values) => {
    const newValues = {
      sequence1: values.sequence1,
      sequence2: values.sequence2,
      matchScore: values.matchScore,
      mismatchPanelty: values.mismatchPanelty,
      gapPanelty: values.gapPanelty,
    };
    setFormValues(newValues);
    setAlignmentType(values.alignmentType);
  };

  const newFormValues = {
    sequence1: formValues.sequence1,
    sequence2: formValues.sequence2,
    matchScore: formValues.matchScore,
    mismatchPanelty: formValues.mismatchPanelty,
    gapPanelty: formValues.gapPanelty,
    alignmentType:alignmentType
  }

  return (
    <>
      {alignmentType === "" && (
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
      {alignmentType !== "" && (
        <Sequencer
          sequenceValues={newFormValues}
          setAlignmentType={setAlignmentType}
        />
      )}
    </>
  );
};

export default SequenceView;
