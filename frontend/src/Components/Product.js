import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
    return (
        <Card className='my-3 p-3 rounded' style={{height:'430px'}}>
            <Link to={`/${product._id}`}>
                <Card.Img src={product.image} style={{height:'200px'}}></Card.Img>
            </Link>
            <Card.Body>
            <Link to={`/${product._id}`}>
                <Card.Title as='div' className='title'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                   
                    <Rating value={product.rating} text={`${product.numReviews} Reviews`} color={'#FF8C00'}/>
                </div>

            </Card.Text>
            <Card.Text as='h3'>
                ${product.price}

            </Card.Text>
            </Card.Body>
            
        </Card>
    )
}

export default Product
