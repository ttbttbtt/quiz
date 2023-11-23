// import React, { useState } from "react";
import React from "react";
import { Heading } from "../components/Heading";
// import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
// import { LinkButton } from "../components/LinkButton";
// import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppInput } from "../components/UI/AppInput";

const regexUzbNumber = /^(?:\+998)?(?:\d{2})?(?:\d{7})$/;

const acceptFormSchema = yup.object({
  // username: yup.string().required("Введите ваше имя"),
  userphone: yup
    .string()
    .matches(regexUzbNumber, "Введите номер в правильном формате")
    .required("Обязательное поле!"),
  // publicoffer: yup.boolean().required("Обязательное поле!"),
  // agreePublicOffer: yup.boolean().required("Обязательное поле!"),
});

const StepOne = () => {
  // const navigate = useNavigate();

  // const [phoneValue, setPhoneValue] = useState("");
  // const [phoneError, setPhoneError] = useState(false);

  // const goToNextPage = () => {
  //   if (phoneError) {
  //     navigate("/step-two");
  //   }
  // };

  // const validatePhone = () => {
  //   if (phoneValue) {
  //     setPhoneError(true);
  //   } else {
  //     setPhoneError(false);
  //   }
  // };

  // const handlePhoneInput = (value) => {
  //   setPhoneValue(value);
  //   validatePhone();
  // };

  // const clickHandler = () => {
  //   validatePhone();

  //   goToNextPage();
  // };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(acceptFormSchema),
    defaultValues: {
      // username: "",
      userphone: "",
      // publicoffer: false,
      // agreePublicOffer: false,
    },
  });

  console.warn("ERRORS: ", errors);

  const onAcceptSubmit = (data) => {
    console.table(data);
    console.log(Object.keys(errors).length);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="single-input-quiz">
          {/* <div className="indicator"> */}
          {/* <div className="indicator__text"> */}
          {/* <span className="indicator__description"> */}
          {/* Скидка за прохождение опроса: */}
          {/* </span> */}
          {/* <span className="indicator__value">15%</span> */}
          {/* </div> */}
          {/* <div className="indicator__progressbar"> */}
          {/* <div className="indicator__unit indicator__unit-1"></div> */}
          {/* <div className="indicator__unit indicator__unit-2"></div> */}
          {/* <div className="indicator__unit indicator__unit-3"></div> */}
          {/* <div className="indicator__unit indicator__unit-4"></div> */}
          {/* </div> */}
          {/* </div> */}
          <ProgressBar currentStep={1} />
          <div className="question">
            <Heading text="1. Занимательный вопрос" headingType="h2" />

            <form onSubmit={handleSubmit(onAcceptSubmit)}>
              <label className="input-wrapper">
                {/* <Input
                hasError={phoneError}
                value={phoneValue}
                onChange={(value) => handlePhoneInput(value)}
                isRequired
                type="text"
                id="answer"
                inputPlaceholder="Ваш ответ"
                errorMessage="Введите номер в правильном формате"
              /> */}
                <Controller
                  name="userphone"
                  control={control}
                  render={({ field }) => (
                    <AppInput
                      inputLabel="Ваш ответ"
                      placeholder="Ваш ответ"
                      type="text"
                      errorMessage={errors.userphone?.message}
                      hasError={errors.userphone ? true : false}
                      {...field}
                    />
                  )}
                />
              </label>
              {/* <Button id="next-btn" buttonText="Далее" onClick={clickHandler} /> */}
              {/* <LinkButton
              id="next-btn"
              buttonText="Далее"
              onClick={clickHandler}
              path="/step-two"
              type="button"
            /> */}
              <Button
                isDisabled={!!Object.keys(errors).length}
                buttonText="Далее"
                buttonType="submit"
                // onClick={goToNextPage}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
