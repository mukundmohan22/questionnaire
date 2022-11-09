import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import Question from "./Question";

const Questionnaire = ({
  json,
  updateJson,
  onCompleteComponent,
  jsonData,
  title,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    onCompleteComponent();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="q-wrapper">
      <div className="q-wrapper-header">
        <h3>{title}</h3>
      </div>
      {json.questions.map((question, index) => {
        return (
          <Question
            errors={errors[question.id] ? true : false}
            register={register}
            {...question}
            orderNo={index + 1}
            key={question.id}
            json={jsonData}
            updateJson={updateJson}
          />
        );
      })}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
      >
        submit
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem("questionnaire");
          window.location.reload();
        }}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ maxWidth: 950, mt: 2 }}
      >
        Reset Form
      </Button>
    </form>
  );
};

export default Questionnaire;
