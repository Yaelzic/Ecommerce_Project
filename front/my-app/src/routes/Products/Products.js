import React, { useState, useEffect } from 'react'
import { selectProds, getProductsAsync } from './productSlice'
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useParams } from "react-router-dom";
import Product from './Product';
import { sendCart, selectorders, addItem ,removeItem} from './orderSlice'



const Products = () => {
  let params = useParams();
  let id = params.id;
  const myProds = useSelector(selectProds);
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams({ replace: true });
  const [counter, setcounter] = useState(1);
  const [total, settotal] = useState(0);
  const myOrders = useSelector(selectorders);

  useEffect(() => {
    dispatch(getProductsAsync())
  }, [])

  useEffect(() => { }, [counter])

  const addToCart = (item) => {
    let tempTotal = 0;
    setcounter(counter + 1);
    let found = false;
    let tempOrders = JSON.parse( JSON.stringify(myOrders))
    {
      tempOrders && tempOrders.forEach((element) => {
        if (element.id === item.id) {
          found = true;
          element.amount += 1; 
          dispatch(sendCart(tempOrders))
        }
      });
    }
    if (!found) {
      item.amount = 1;
      let temp = JSON.parse( JSON.stringify(item))
      dispatch(addItem(temp))
    }
    { myOrders && myOrders.forEach((element) => {
      tempTotal += element.amount * element.price;
    });}
    settotal(tempTotal)
  };

  const removeFromCart = (item) => {
    let found = false;
    setcounter(counter + 1);
    let tempOrders = JSON.parse( JSON.stringify(myOrders))
    tempOrders.forEach((element) => {
      if (element.id === item.id) {
        found = true;
        if (element.amount === 1) {
          dispatch(removeItem(item))
        } else {
          element.amount -= 1;
          dispatch(sendCart(tempOrders))
        }
      }
    });
  };


  return (
    <div>
      <nav>
        <input placeholder="Search"
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter }, { replace: true });
            } else {
              setSearchParams({}, { replace: true });
            }
          }}
        />
        <br /><br />
        <section className="product" id="product">
          <div className="box-container">
            {myProds.filter((pro) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = pro.desc.toLowerCase();
              return name.startsWith(filter.toLowerCase());
            })
              .filter(x => x.category_id === id)
              .map((prod, index) => <Product key={index} prod={prod} addToCart={addToCart} removeFromCart={removeFromCart} ></Product>)}
          </div>
        </section>
      </nav>

    </div>

  )
}

export default Products