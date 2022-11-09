import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./Question.scss";
import { isEmpty } from "lodash";
const Question = ({
  id,
  type,
  orderNo,
  title,
  choices,
  helperText,
  value: defaultValue,
  isRequired,
  message,
  errors,
  json,
  register,
  updateJson,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [valueBoolean, setValueBoolean] = useState(defaultValue);
  // const classes = useStyles();
  const renderText = () => {
    return <RenderQuestionTitle orderNo={orderNo} title={title} />;
  };
  const handleChange = (event) => {
    if (event.target.checked) {
      const array = value ? [...value, event.target.id] : [event.target.id];
      setValue(array);
      updateValueInJson(array);
    } else {
      const array = value.filter((item) => item !== event.target.id);
      setValue(array);
      updateValueInJson(array);
    }
  };

  const handleBooleanChange = (event) => {
    if (event.target.checked) {
      setValueBoolean(true);
      updateValueInJson(true);
    } else {
      setValueBoolean(false);
      updateValueInJson(false);
    }
  };

  const updateValueInJson = (updateValue) => {
    const questions = json?.questions ? json.questions : [];

    const ques = questions.find((item) => item.id === id);
    const otherQues = questions.filter((item) => item.id !== id);

    ques.value = updateValue;
    console.log("{ questions: [...otherQues, ques] }", {
      questions: [...otherQues, ques],
    });
    updateJson({ questions: [...otherQues, ques] });
  };

  const renderCheckbox = () => {
    return (
      <RenderQuestionTitle orderNo={orderNo} title={title}>
        <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
          {errors && showValidationError(message)}
          <FormGroup>
            {choices.map((option, index) => {
              return (
                <FormControlLabel
                  {...register(id, { required: isRequired })}
                  key={id + index}
                  control={
                    <Checkbox
                      className="container__question"
                      onChange={handleChange}
                      checked={!isEmpty(value) ? value.includes(option) : false}
                      id={option}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 15 }}>{option}</Typography>
                  }
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </RenderQuestionTitle>
    );
  };
  const renderSingleBooleanCheckbox = () => {
    return (
      <RenderQuestionTitle orderNo={orderNo} title={null}>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              key={id}
              {...register(id, { required: isRequired })}
              control={
                <Checkbox
                  onChange={handleBooleanChange}
                  checked={valueBoolean}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 550,
                    color: "rgba(47, 47, 47, 0.8);",
                  }}
                >
                  {title}
                </Typography>
              }
            />
          </FormGroup>
          {errors && showValidationError(message)}
        </FormControl>
      </RenderQuestionTitle>
    );
  };

  const showValidationError = (message) => {
    return (
      <div role="alert" class="que__error">
        <div class="">
          <span>{message}</span>
        </div>
      </div>
    );
  };

  const renderInput = () => {
    return (
      <RenderQuestionTitle orderNo={orderNo} title={title}>
        <TextField {...register(id, { required: true })} />
        {errors && <FormHelperText>Please Provide a value</FormHelperText>}
      </RenderQuestionTitle>
    );
  };

  switch (type) {
    case "text":
      return renderText();
    case "checkbox":
      return renderCheckbox();
    case "input":
      return renderInput();
    case "singleBooleanCheckbox":
      return renderSingleBooleanCheckbox();

    default:
      return null;
  }
};

Question.defaultProps = {
  type: "text",
  name: "",
  title: "",
  choices: [],
  isRequired: false,
  helperText: null,
};

const RenderQuestionTitle = ({ children, orderNo, title }) => {
  const shade = orderNo % 2 === 0 ? "light" : "dark";
  console.log("shade", shade);
  return (
    <div className={`container container--${shade}`}>
      {title ? (
        <div className="container_question">
          <div className="container_question--num">{orderNo}</div>
          <div className="container_question--sp">.&nbsp;</div>
          <div className="container_question--title">{title}</div>
        </div>
      ) : null}
      <div className="container_option">{children}</div>
    </div>
  );
};

export default Question;
