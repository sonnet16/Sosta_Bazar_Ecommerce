import React,{useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { saveShippingAddress } from '../Actions/cartAction'
import CheackoutSteps from '../Components/CheackoutSteps'
import FormContainer from '../Components/FormContainer'


function ShippingScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const{shippingAddress} = cart

    const dispatch = useDispatch()


    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    const  submitHandaler = (e) =>{
        e.preventDefault() 
        dispatch(saveShippingAddress({address, city, postalCode, country}))  
        history.push('/user/payment')
    }
    return (
        <div>
            <CheackoutSteps step1 step2/> 
            <FormContainer>
            <h1>Shipping </h1>
            <Form onSubmit={ submitHandaler }>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    required
                    type='text'd

                    placeholder='Enter Address'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter City'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='Postal Code'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter Postal Code'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter Country'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='outline-dark' className='btn-block mt-2'>
                    Continue
                </Button>


            </Form>
         </FormContainer>
         </div>
    )
}

export default ShippingScreen
