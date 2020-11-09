import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  saveProduct,
  listSellerProducts,
  listProducts,
  //deleteProduct,
} from '../actions/productActions';

function SellerProductsScreen(props) {
const [modalVisible, setModalVisible] = useState(false); //hide create product form unless you click on create product button
  const [id, setId] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  //const productList = useSelector((state) => state.productList);
  const sellerProductList = useSelector((state) => state.sellerProductList);
  //const { loading, products, error } = productList; //get elements from productList element
  const { loading, sellerProducts, error } = sellerProductList;//list of products for each sellers

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

//   const productDelete = useSelector((state) => state.productDelete);
//   const {
//     loading: loadingDelete,
//     success: successDelete,
//     error: errorDelete,
//   } = productDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listSellerProducts()); //unfortunately there are no products attached to sellers yet?
    //dispatch(listProducts()); //this lists all products; 
    return () => {
      //
    };
  }, [successSave]);

  const openModal = (product) => { //open the create product form
    setModalVisible(true);
    setId(product._id);
    setItemName(product.itemName);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setInventory(product.inventory);
  };
  const submitHandler = (e) => { //save the product when seller adds it
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        itemName,
        price,
        image,
        brand,
        category,
        inventory: inventory,
        description,
      })
    );
  };
//   const deleteHandler = (product) => {
//     dispatch(deleteProduct(product._id));
//   };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/upload/image', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data.fileLink);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    //show list of products this user has created
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div> 
      {/* open create product form */}
      {modalVisible && ( 
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={itemName}
                  id="itemName"
                  onChange={(e) => setItemName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="inventory">inventory</label>
                <input
                  type="text"
                  name="inventory"
                  value={inventory}
                  id="inventory"
                  onChange={(e) => setInventory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="itemName">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                {/* if id already exists, show update, else show create */}
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'} 
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          {sellerProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.item.itemName}</td>
                <td>{product.price}</td>
                <td>{product.item.category}</td>
                <td>
                  {/* open create product form with exact product to be edited */}
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  {/* <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SellerProductsScreen;