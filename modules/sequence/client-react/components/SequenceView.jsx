import React, { useState } from "react";
import Helmet from "react-helmet";
import { Select, Input } from "antd";
import { PageLayout } from "@gqlapp/look-client-react";
import  SequenceForm  from "./SequenceForm";

const { TextArea } = Input;
const { Option } = Select;

const SequenceView = ({ t }) => {
  const [pageType, setPageType] = useState(null);
  const [sequence1, setSequence1] = useState(null);
  const [sequence2, setSequence2] = useState(null);

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      {!pageType && (
        <div
          style={{
            display: "grid",
            placeContent: "center",
            width: "100vw",
            padding:'24px',
            height: "100vh",
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
