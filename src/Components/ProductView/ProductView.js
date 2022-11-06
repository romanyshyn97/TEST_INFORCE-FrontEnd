import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/validators";
import ErrorModal from "../../shared/ErrorModal";
import Spinner from "../../shared/spinner";
import Modal from "../../shared/Modal";
import Input from "../../shared/Input";
import Button from "../../shared/Button";
import { fetchCurrentItem, productUPDATE } from "../../Redux/actions";

import "./ProductView.scss";

const ProductView = (props) => {
  const currentProduct = useSelector((state) => state.shop.currentItem);
  const [showEdit, setShowEdit] = useState(false);
  const loading = useSelector((state) => state.shop.loading);
  const { product } = currentProduct;
  const productId = useParams().productId;
  const { error, clearError, sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      imageUrl:{
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

  const showEditModal = () => {
    setShowEdit(true);
  }

  const closeEditModal = () => {
    setShowEdit(false)
  }

  const productUpdateSubmitHandler = (event) => {
    event.preventDefault();
    sendRequest(
        `http://localhost:5000/products/${product.id}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          imageUrl: formState.inputs.imageUrl.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json"
        
        }
      ).then(() => {
        dispatch(productUPDATE(product.id));
        dispatch(fetchCurrentItem(sendRequest, product.id));
      })
      .catch((err) => console.log(err));
    
  };

  // useEffect(() => {
  //   const fetchProductById = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `http://localhost:5000/products/${productId}`
  //       );
  //       console.log(responseData.product);
  //       setCurrentProduct(responseData.product);
  //     } catch (err) {}
  //   };

  //   fetchProductById();
  // }, [sendRequest, productId]);
  return (
    <>
    <Modal
          show={showEdit}
          onCancel={closeEditModal}
          header="EDIT PRODUCT"
          onSubmit={productUpdateSubmitHandler}
          footer={
            <>
            <Button disabled={!formState.isValid} onClick={closeEditModal}>
              EDIT PRODUCT
            </Button>
            <Button onClick={closeEditModal}>CLOSE</Button>
            </>
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
      {loading && <Spinner />}
      {!loading && currentProduct && (
        <div className="product-view">
          <div className="product-view_image">
            <img src={product.imageUrl} alt="" />
          </div>
          <div className="product-view_info">
            <h2>{product.name}</h2>
            <h3>Description: {product.description}</h3>
            <p>count : {product.count}</p>
          </div>
          <div className="product-view_actions">
            <Button to="/">BACK TO ALL PRODUCTS</Button>
            <Button onClick={showEditModal}>EDIT</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
