import trash from "../../../resources/delete.png";
import { useState } from "react";
import Modal from "../../../shared/Modal";
import { useHttpClient } from "../../../hooks/http-hook";
import Button from "../../../shared/Button";

const SingleProduct = (props) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {sendRequest} = useHttpClient();
    const showDeleteModalHandler = () => {
        setShowConfirmModal(true);
      };
    
      const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
      };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/products/${props.id}`,
        "DELETE"
        
      );

      props.onDeleteProduct(props.id);
    } catch (err) {}
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
        <p>Do yo want to delete this place?</p>
      </Modal>
      <div className="product-list_single-item">
        <img
          src="https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
          alt="apple"
        />
        <h2>{props.name}</h2>
        <p>count: 1</p>
        <h3>weight: 100g</h3>
        <h3>{props.description}</h3>
        <span className="delete" onClick={showDeleteModalHandler}>
          <img src={trash} alt="delete" />
        </span>
      </div>
    </>
  );
};

export default SingleProduct;
