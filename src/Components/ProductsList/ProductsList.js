import { useState, useEffect, useCallback } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { NavLink } from "react-router-dom";
import SingleProduct from "./SingleProduct/SingleProduct";
import Modal from "../../shared/Modal";
import Button from "../../shared/Button";
import NewProduct from "../NewProduct/NewProduct";

import "./ProductsList.scss";

const ProductsList = () => {
  const [show, setShow] = useState(false);

  const showAddModal = () => {
    setShow(true);
  }

  const cancelAddModal = () => {
    setShow(false);
  };
  return (
    <>
      <div className="center">
        <Button onClick={showAddModal}>ADD PRODUCT</Button>
        <Modal show={show} onCancel={cancelAddModal} header="NEW PRODUCT">
            <NewProduct/>
        </Modal>
      </div>
      <div className="product-list center">
        <SingleProduct />
      </div>
    </>
  );
};

export default ProductsList;
