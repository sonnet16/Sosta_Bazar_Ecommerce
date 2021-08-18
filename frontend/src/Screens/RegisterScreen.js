import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import FormContainer from '../Components/FormContainer'
import { register } from '../Actions/userActions'


function RegisterScreen({location, history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)

    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
           history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const  submitHandaler = (e) =>{
        e.preventDefault()
        if (password !== confirmPassword){
            setMessage('Password Do Not Match')
        }else{
            dispatch(register(name, email, password))
            setMessage('')
        }
        
    }


    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'> { message } </Message>}
            {error && <Message variant='danger'> { error } </Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandaler}>

            <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password again'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='outline-dark' className='btn-block mt-2'>
                    Sign Up
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
               Already have an account ? <Link to={ redirect? `/user/login?redirect=${redirect}` : '/user/login'} >
                    LogIn
                </Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen
