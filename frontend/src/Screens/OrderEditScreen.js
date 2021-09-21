import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  deliverOrder,
  getOrderDetails,
  paymentOrder,
} from "../Actions/orderAction";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAYMENT_RESET,
} from "../Constants/OrderConstant";

function OrderEditScreen({ match, history }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPayment = useSelector((state) => state.orderPayment);
  const { loading: loadingPayment, success: successPayment } = orderPayment;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/user/login");
    }

    if (
      !order ||
      order._id !== Number(orderId) ||
      successDeliver ||
      successPayment
    ) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successPayment, successDeliver]);

  const PaymentHandaler = () => {
    dispatch(paymentOrder(order));
  };

  const DeliverHandaler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>

              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered On: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='warning'> Not Delivered </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid On: {order.paidAt}</Message>
              ) : (
                <Message variant='warning'> Not Paid </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              <p>
                {order.orderItems.length === 0 ? (
                  <Message variant='info'>Your order Is Empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items : </Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping : </Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax : </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total : </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            {loadingPayment && <Loader />}

            {userInfo &&
              userInfo.isAdmin &&
              !order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    onClick={PaymentHandaler}
                    className='btn-block'
                    variant='outline-dark'
                    type='button'
                  >
                    Order Cash Paid
                  </Button>
                </ListGroup.Item>
              )}
            {loadingDeliver && <Loader />}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    onClick={DeliverHandaler}
                    className='btn-block'
                    variant='outline-dark'
                    type='button'
                  >
                    Order Delivered
                  </Button>
                </ListGroup.Item>
              )}
            {userInfo && userInfo.isAdmin && order.isPaid && order.isDelivered && (
              <ListGroup.Item>
                <Button
                  onClick={DeliverHandaler}
                  className='btn-block'
                  variant='outline-success'
                  disabled
                  type='button'
                >
                  Order Delivered Successfully
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderEditScreen;
