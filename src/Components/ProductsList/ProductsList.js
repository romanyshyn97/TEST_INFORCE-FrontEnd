import { useState, useEffect, useCallback } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { NavLink } from "react-router-dom";
import SingleProduct from "./SingleProduct/SingleProduct";
import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import NewProduct from "../NewProduct/NewProduct";
import { useDispatch } from "react-redux";

import "./ProductsList.scss";

const ProductsList = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();

  const showAddModal = () => {
    setShow(true);
  };

  const cancelAddModal = () => {
    setShow(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/products"
        );
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };

    fetchProducts();
  }, [sendRequest]);
  const productDeletedHandler = (deletedProductId) => {
    setLoadedProducts(prevPlaces => prevPlaces.filter(product => product.id !== deletedProductId));
  }
  return (
    <>
      <div className="center">
        <Button onClick={showAddModal}>ADD PRODUCT</Button>
        <Modal show={show} onCancel={cancelAddModal} header="NEW PRODUCT">
          <NewProduct />
        </Modal>
      </div>
      <div className="product-list grid">
        {loadedProducts && loadedProducts.map((product) => (
          <SingleProduct key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          description={product.description}
          onDeleteProduct={productDeletedHandler}
          />
        ))}
      </div>
    </>
  );
};

export default ProductsList;
