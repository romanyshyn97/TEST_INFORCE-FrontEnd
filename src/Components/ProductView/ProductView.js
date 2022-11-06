import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";

import Spinner from "../../shared/spinner";
import Modal from "../../shared/Modal";
import Input from "../../shared/Input";
import Button from "../../shared/Button";

import './ProductView.scss'

const ProductView = (props) => {
  const currentProduct = useSelector(state => state.shop.currentItem);
  const loading = useSelector(state => state.shop.loading);
  const {product} = currentProduct;
  const productId = useParams().productId;
  const { sendRequest } = useHttpClient();

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
    {loading && <Spinner/>}
    {!loading && currentProduct && <div className="product-view">
      <div className="product-view_image">
        <img src={product.imageUrl} alt="" />
      </div>
      <div className="product-view_info">
        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <p>count : {product.count}</p>
      </div>
      <Button to='/' >BACK TO ALL PRODUCTS</Button>
    </div>}
    
    </>
  );
};

export default ProductView;
