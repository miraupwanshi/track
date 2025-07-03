import React, { useEffect } from "react";
import { useState } from "react";
import './HomePage.css';

function Products () {

    const[products , setProducts] = useState([]);

   useEffect (() => {
    fetch("http://localhost:8081/api/products").
        then((res)=> res.json()).
        then((data)=>setProducts(data)).
        catch((error)=> console.error(error));
   } , []);
    
    
    return (
        <>
        <h2>Products</h2>
       <div>
            { products.map((item)=>(
                <div key={item.id}>
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                    </div>
            ))
            }
        </div>
        </>
    );
}

export default Products ;