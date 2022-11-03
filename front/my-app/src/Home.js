import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHandHoldingUsd, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import './Home.css'
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <div className='home'>
      <Container>
        <Row>
          <Col><i> <FontAwesomeIcon id="icon" className="fa-icon" icon={faTruck} /></i><span>&nbsp; Faster</span></Col>
          <Col><i><FontAwesomeIcon id="icon" className="fa-icon" icon={faHandHoldingUsd} /></i><span>&nbsp; Cheaper</span></Col>
          <Col><i> <FontAwesomeIcon id="icon" className="fa-icon" icon={faBasketShopping} /></i><span>&nbsp; Fresher</span></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home