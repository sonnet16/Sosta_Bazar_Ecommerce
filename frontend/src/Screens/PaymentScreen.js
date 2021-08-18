import React,{useState} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { savePaymentMethod } from '../Actions/cartAction'
import CheackoutSteps from '../Components/CheackoutSteps'
import FormContainer from '../Components/FormContainer'

function PaymentScreen({ history }) { 

    const cart = useSelector(state => state.cart)
    const{ shippingAddress } = cart

    const dispatch = useDispatch()

    const [ paymentMethod, setPaymentMethod ] = useState('Bkash')

    if(!shippingAddress.address){
        history.push('/user/shipping')
    }

    const submitHandaler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/user/placeOrder')
    }

    return (
        <div>
        <CheackoutSteps step1 step2 step3 />
          <FormContainer>
            <Form onSubmit={ submitHandaler }>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio'
                            label='Bkash'
                            id='bkash'
                            name='paymentMethod'
                            checked
                            onChange= {(e) => setPaymentMethod(e.target.value) }
                        ></Form.Check>
                    </Col>
        
                </Form.Group>


                <Button type='submit' variant='outline-dark' className='btn-block mt-2'>
                    Continue
                </Button>
            </Form>

            
        </FormContainer>
        </div>
    )
}

export default PaymentScreen
