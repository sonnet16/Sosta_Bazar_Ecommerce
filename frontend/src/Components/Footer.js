import React from 'react'
import { Container, Row } from 'react-bootstrap'


function Footer() {
    return (
        <footer>
            <Container className='card-footer text-muted'>
                    
                <Row className='d-flex text-center mt-4'>
                <div class="footer__social justify-content-center">
                    <a href="https://www.facebook.com/shaharuk.ahamad" class="footer__link" rel='noreferrer' target="_blank"><i class="fab fa-facebook"></i></a>
                    <a href="https://www.instagram.com/_sonnet_6" class="footer__link" rel='noreferrer' target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/S_Sonnet_" class="footer__link" rel='noreferrer' target="_blank"><i class="fab fa-twitter"></i></a>


                </div>
                </Row>
                <Row>
                <div className="footer-copyright text-center py-3" >
                &copy; {new Date().getFullYear()} Copyright: <a href="/"> SostaBazzar </a>
                </div>
                </Row>
            </Container>
          
        </footer>
    )
}

export default Footer
