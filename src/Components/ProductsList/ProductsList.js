import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../shared/ErrorModal";
import { useForm } from "../../hooks/form-hook";
import Input from "../../shared/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/validators";
import SingleProduct from "./SingleProduct/SingleProduct";
import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import Spinner from "../../shared/spinner";
import {
  fetchProducts,
  productDeleted,
  productCreated,
} from "../../Redux/actions";

import "./ProductsList.scss";

const ProductsList = () => {
  const loadedProducts = useSelector((state) => state.shop.products);
  const loading = useSelector((state) => state.shop.loading);
  const { products } = loadedProducts;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { error, clearError, sendRequest } = useHttpClient();

  // const loadProducts = () => {
  //   dispatch(fetchProducts(sendRequest));
  //   console.log("loaded");
  // };

  useEffect(() => {
    dispatch(fetchProducts(sendRequest));
    console.log("loaded");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const productSubmitHandler = useCallback((event) => {
    event.preventDefault();
    sendRequest(
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
    )
      .then(dispatch(productCreated()))
      .catch(dispatch(fetchProducts(sendRequest)))
      .catch((err) => console.log(err));
   
  });

  const onDelete = useCallback(
    (id) => {
      sendRequest(`http://localhost:5000/products/${id}`, "DELETE")
        .then(dispatch(productDeleted(id)))
        .then(dispatch(fetchProducts(sendRequest)))
        .catch((err) => console.log(err));

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },

    [sendRequest]
  );

  const showAddModal = () => {
    setShow(true);
  };

  const cancelAddModal = () => {
    setShow(false);
  };

  return (
    <>
      {loading && (
        <div className="center">
          <Spinner />
        </div>
      )}
      
      <div className="center">
        <Button onClick={showAddModal}>ADD PRODUCT</Button>
        <Modal
          show={show}
          onCancel={cancelAddModal}
          header="NEW PRODUCT"
          onSubmit={productSubmitHandler}
          footer={
            <Button disabled={!formState.isValid} onClick={cancelAddModal}>
              ADD PRODUCT
            </Button>
          }
        >
          <ErrorModal error={error} onClear={clearError} />
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
        </Modal>
      </div>
      {!loading && loadedProducts && <div className="product-list grid">
        {!loading &&
          products &&
          products.map((product) => (
            <SingleProduct
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              description={product.description}
              onDeleteProduct={()=>onDelete(product.id)}
              
            />
          ))}
      </div>}
    </>
  );
};

export default ProductsList;
