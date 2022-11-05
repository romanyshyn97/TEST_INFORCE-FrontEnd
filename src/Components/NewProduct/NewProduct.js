import React from "react";
import { useState } from "react";
import Modal from "../../shared/Modal";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import ErrorModal from "../../shared/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

import "./NewProduct.scss";

const NewProduct = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      imageUrl: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/products",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          imageUrl: formState.inputs.imageUrl.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={productSubmitHandler}>
        {/* {isLoading && <LoadingSpinner asOverlay />} */}
        <Input
          id="name"
          element="input"
          type="text"
          label="NAME"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={inputHandler}
        />
        <Input
          id="imageUrl"
          element="input"
          type="text"
          label="IMAGE"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid imageUrl"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid description(at least 6 characters)."
          onInput={inputHandler}
        />
        <Button
          type="submit"
          disabled={!formState.isValid}
          onClick={productSubmitHandler}
        >
          ADD PRODUCT
        </Button>
      </form>
    </>
  );
};

export default NewProduct;
