import trash from "../../../resources/delete.png";
import { useState } from "react";
import Modal from "../../../shared/Modal";
import { useHttpClient } from "../../../hooks/http-hook";
import Button from "../../../shared/Button";
import { Link } from "react-router-dom";
import { fetchCurrentItem } from "../../../Redux/actions";
import { useDispatch } from "react-redux";

const SingleProduct = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();
  const showDeleteModalHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    props.onDeleteProduct();
      
    
  };
  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Do yo want to delete this product?</p>
      </Modal>

      <div className="product-list_single-item">
        <Link to={`/${props.id}`} onClick={() => dispatch(fetchCurrentItem(sendRequest, props.id))} >
          <div className="product-list_single-item_image">
            <img src={props.imageUrl} alt="apple" />
          </div>
          <div className="product-list_single-item_info">
            <h2>{props.name}</h2>
            <p>count: 1</p>
            <h3>weight: 100g</h3>
            <h3>{props.description}</h3>
          </div>
        </Link>
        <span className="delete" onClick={showDeleteModalHandler}>
          <img src={trash} alt="delete" />
        </span>
      </div>
    </>
  );
};

export default SingleProduct;
