import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as productService from '@/services/productService';
import * as httpRequest from "@/utils/httpRequest";

function Product() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    httpRequest
      .get("/products")
      .then((products) => {

        setProduct(products.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);
  return (
    <>
      <div>
        <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`${product.id}`}>{product.title}</Link>
              </li>
            );
          })}
        </ul>

      </div>
    </>
  );
}

export default Product;
