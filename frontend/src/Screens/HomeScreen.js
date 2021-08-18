import React, { useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col} from 'react-bootstrap'
import Product from '../Components/Product'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { listProducts } from '../Actions/productAction'
import Paginate from '../Components/Paginate'
import ProductCarousel from '../Components/ProductCarousel'



function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    
    const { error, loading, products, page, pages } = productList

    let keyword = history.location.search
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel />}
            
            <h1>Latest Product</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            { products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product ={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword= {keyword} />
                    </div>
                    
            }
         
        </div>
    )
}

export default HomeScreen
