import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../Components/Rating'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProductDetails } from '../Actions/productAction'



//import products from '../products'

function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandaler = () =>{
        history.push(`/product/cart/${match.params.id}?qty=${qty}`)
    }

    //const product = products.find((p)=> p._id == match.params.id)
    return (
        <div>
            <Link to='/' className='btn btn-block my-3' variant='outline-dark'>Go Back</Link>

            { loading ? <Loader />
                : error ? <Message variant='danger'> { error } </Message>
                    : (<Row>
                        <Col md={6}>
                        {product && <Image src={ product.image } alt={ product.name} fluid></Image>}
                        </Col>
                        <Col md={3}>{product &&
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} Reviews`} color={'#FF8C00'}/>
                                </ListGroup.Item> 
                                
                                <ListGroup.Item>
                                   <h4>Price: ${product.price} </h4> 
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    Description : {product.description}
                                </ListGroup.Item>
        
                            </ListGroup>}
                        </Col>
        
                        <Col md={3}>{product &&
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price : </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status : </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty: </Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x+1} value={x+1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
        
                                    <ListGroup.Item>
                                        <Row>
                                        <Button 
                                        onClick={addToCartHandaler}
                                        className="btn-block" 
                                        variant="outline-dark" 
                                        disabled={product.countInStock === 0 || product.countInStock < 0 } 
                                        type="button">
                                            Add To Cart
                                        </Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card> }
                        </Col>
                    </Row>
                    )
            }    
        </div>
    )
}

export default ProductScreen
