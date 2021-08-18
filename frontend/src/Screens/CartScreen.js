import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Card, ListGroup, Button, Image, Form } from 'react-bootstrap'
import  Message from '../Components/Message'
import { addToCart, removeFromCart } from '../Actions/cartAction'


function CartScreen({ match, location, history }) {

    
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty])


    const removeFormCartHandaler = (id) =>{
        dispatch(removeFromCart(id)) 
    }

    const checkOutHandaler = () =>{
        history.push('/user/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your Cart Is Empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item =>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/${item.product}`}>{item.name} </Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x + 1}
                                                    </option>
                                                ))
                                                        }
                                        </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                        <Button type='button' variant='light'
                                        onClick={()=> removeFormCartHandaler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>


            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0 ) }) items</h3>

                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0 ).toFixed(2) }
                        </ListGroup.Item>
                    </ListGroup>
                    
                    <ListGroup.Item>
                    <Button 
                        onClick={checkOutHandaler}
                        className="btn-block" 
                        variant="outline-dark" 
                        disabled={ cartItems.length === 0 }
                        type="button">
                           Proceed To CheckOut
                    </Button>
    </ListGroup.Item>
                </Card>
            </Col>
        
        </Row>
    )
}

export default CartScreen
