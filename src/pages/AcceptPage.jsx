import React from "react";
import { Heading } from "../components/Heading";
import { AppInput } from "../components/UI/AppInput";
import { AppCheckbox } from "../components/UI/AppCheckbox";
import { Button } from "../components/Button";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const regexUzbNumber = /^(?:\+998)?(?:\d{2})?(?:\d{7})$/;

const acceptFormSchema = yup.object({
  username: yup.string().required("Обязательное поле!"),
  userphone: yup
    .string()
    .matches(regexUzbNumber, "Введите узбекский номер телефона")
    .required("Обязательное поле!"),
  publicoffer: yup.boolean().required("Обязательное поле!"),
  agreePublicOffer: yup.boolean().required("Обязательное поле!"),
});

export const AcceptPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(acceptFormSchema),
    defaultValues: {
      username: "",
      userphone: "",
      publicoffer: false,
      agreePublicOffer: false,
    },
  });

  const onAcceptSubmit = (data) => {
    console.table(data);
    console.log(Object.keys(errors).length)
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="AcceptPage">
          <Heading
            headingType="h1"
            text="АКЦЕПТ на предложение о заключении договора"
          />
          <form onSubmit={handleSubmit(onAcceptSubmit)}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <AppInput
                  inputLabel="Ф.И.:"
                  placeholder="Ваш ответ"
                  type="text"
                  errorMessage={errors.username?.message}
                  hasError={errors.username ? true : false}
                  {...field}
                />
              )}
            />

            <Controller
              name="userphone"
              control={control}
              render={({ field }) => (
                <AppInput
                  inputLabel="Номер телефона:"
                  placeholder="+998 9- --- -- --"
                  type="tel"
                  errorMessage={errors.userphone?.message}
                  hasError={errors.userphone ? true : false}
                  {...field}
                />
              )}
            />

            <Controller
              name="publicoffer"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AppCheckbox
                  checkboxLabel="Ознакомился с публичной офертой"
                  {...field}
                />
              )}
            />

            <Controller
              name="agreePublicOffer"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <AppCheckbox
                  checkboxLabel="Согласен с условиями публичной оферты"
                  {...field}
                />
              )}
            />

            <Button
              isDisabled={!!Object.keys(errors).length}
              buttonText="Далее"
              buttonType="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
