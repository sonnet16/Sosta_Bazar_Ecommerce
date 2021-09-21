import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {
  listProductsAdmin,
  deleteProduct,
  createProduct,
  listProductDetails,
} from "../Actions/productAction";
import { PRODUCT_CREATE_RESET } from "../Constants/ProductConstant";

function ProductListScreen({ history }) {
  const dispatch = useDispatch();
  const productAdminList = useSelector((state) => state.productAdminList);
  const { loading, error, products } = productAdminList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({
      type: PRODUCT_CREATE_RESET,
    });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/user/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProductsAdmin());
    }
  }, [dispatch, history, userInfo, success, successCreate, createdProduct]);

  const deleteHandaler = (id) => {
    if (window.confirm("Are you sure want to delete this Product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandaler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className='d-flex justify-content-between mb-3'>
        <h1>Products</h1>
        <Button
          onClick={createProductHandaler}
          variant='outline-dark'
          className='btn mb-4'
          size='sm'
        >
          <i className='fas fa-plus mt-1' style={{ fontSize: "18px" }}>
            {" "}
            add
          </i>
        </Button>
      </div>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>CountInStock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn'>
                      <i
                        className='fas fa-user-edit'
                        style={{ color: "blue" }}
                      ></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='light'
                    className='btn'
                    onClick={() => deleteHandaler(product._id)}
                  >
                    <i className='fas fa-trash' style={{ color: "red" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ProductListScreen;
