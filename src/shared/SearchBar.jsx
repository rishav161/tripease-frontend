import React,{useRef} from 'react'

import './search-bar.css'
import {Col,Form,FormGroup} from "reactstrap"

const SearchBar = () => {

    const loacationRef=useRef('')
    const distanceRef = useRef(0);
    const maxGroupSizeRef = useRef(0);

    const searchHandler=() => {
        const loacation=locationRef.current.value
        const distance=diatanceRef.current.value
        const maxGroupSize = maxGroupSizeRef.current.value;

        if(loacation===''||distance===''||maxGroupSize===""){
            return alert("All fields are required")
        }
    }
    
  return (
    <Col>
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group from__group-fast">
            <span>
              <i class="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="Where are you going"  ref={loacationRef}/>
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group from__group-fast">
            <span>
              <i class="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input type="number" placeholder="Distance k/m" ref={distanceRef}/>
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group from__group-last">
            <span>
              <i class="ri-group-fill"></i>
            </span>
            <div>
              <h6>Max people</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i class="ri-search-fill"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
}

export default SearchBar