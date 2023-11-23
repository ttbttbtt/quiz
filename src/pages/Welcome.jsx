// import React, { useState } from "react";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
// import { LinkButton } from "../components/LinkButton";
// import { Input } from "../components/Input";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppInput } from "../components/UI/AppInput";

const regexUzbNumber = /^(?:\+998)?(?:\d{2})?(?:\d{7})$/;

const acceptFormSchema = yup.object({
  username: yup.string().required("Введите ваше имя"),
  userphone: yup
    .string()
    .matches(regexUzbNumber, "Введите номер в правильном формате")
    .required("Обязательное поле!"),
  // publicoffer: yup.boolean().required("Обязательное поле!"),
  // agreePublicOffer: yup.boolean().required("Обязательное поле!"),
});

const Welcome = () => {
  // const navigate = useNavigate();

  // const [nameValue, setNameValue] = useState("");
  // const [phoneValue, setPhoneValue] = useState("");

  // const [nameError, setNameError] = useState(false);
  // const [phoneError, setPhoneError] = useState(false);

  // const goToNextPage = () => {
  //   if (nameError && phoneError) {
  //     navigate("/step-one");
  //   }
  // };

  // const validateName = () => {
  //   if (!nameValue) {
  //     setNameError(true);
  //   } else {
  //     setNameError(false);
  //   }
  // };
  // const validatePhone = () => {
  //   if (!phoneValue) {
  //     setPhoneError(true);
  //   } else {
  //     setPhoneError(false);
  //   }
  // };

  // const handleNameInput = (value) => {
  //   setNameValue(value);
  //   validateName();
  // };
  // const handlePhoneInput = (value) => {
  //   setPhoneValue(value);
  //   validatePhone();
  // };

  // const clickHandler = () => {
  //   validateName();
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
      username: "",
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
        <div className="welcome">
          <Heading
            text="Добро пожаловать в квиз от лучшего учебного центра"
            headingType="h1"
          />
          <form
            onSubmit={handleSubmit(onAcceptSubmit)}
            className="welcome__form"
          >
            {/* <Input
              hasError={nameError}
              value={nameValue}
              onChange={(value) => handleNameInput(value)}
              id="username"
              isRequired
              inputLabel="Ваше имя"
              inputPlaceholder="Ваш ответ"
              errorMessage="Введите ваше имя"
            /> */}
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <AppInput
                  inputLabel="Ваше имя"
                  placeholder="Ваш ответ"
                  type="text"
                  errorMessage={errors.username?.message}
                  hasError={errors.username ? true : false}
                  {...field}
                />
              )}
            />

            <label className="input-wrapper" htmlFor="username">
              {/* <Input
                hasError={phoneError}
                value={phoneValue}
                onChange={(value) => handlePhoneInput(value)}
                id="phone"
                isRequired
                inputLabel="Ваш номер"
                inputPlaceholder="+998 9- --- -- --"
                errorMessage="Введите номер в правильном формате"
              /> */}
              <Controller
                name="userphone"
                control={control}
                render={({ field }) => (
                  <AppInput
                    inputLabel="Ваш номер"
                    placeholder="+998 9- --- -- --"
                    type="text"
                    errorMessage={errors.userphone?.message}
                    hasError={errors.userphone ? true : false}
                    {...field}
                  />
                )}
              />
            </label>
            {/* <LinkButton
              buttonType="button"
              buttonText="Далее"
              onClick={clickHandler}
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
  );
};

export default Welcome;
