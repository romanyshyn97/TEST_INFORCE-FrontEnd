import trash from "../../../resources/delete.png";

const SingleProduct = () => {
  return (
    <>
      <div className="product-list_single-item">
        <img
          src="https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
          alt="apple"
        />
        <h2>Apple</h2>
        <p>count: 1</p>
        <h3>weight: 100g</h3>
        <span className="delete">
          <img src={trash} alt="delete" />
        </span>
      </div>
      <div className="product-list_single-item">
        <img
          src="https://healthjade.com/wp-content/uploads/2017/10/apple-fruit.jpg"
          alt="apple"
        />
        <h2>Apple</h2>
        <p>count: 1</p>
        <h3>weight: 100g</h3>
        <span className="delete">
          <img src={trash} alt="delete" />
        </span>
      </div>
    </>
  );
};

export default SingleProduct;
