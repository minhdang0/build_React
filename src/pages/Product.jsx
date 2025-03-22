import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    fetch("https://api01.f8team.dev/api/products")
      .then((res) => res.json())
      .then((response) => {
        setProduct(response.data);
      });
  }, []);
  return (
    <>
      <div>
        {/* <ul>
          {products.map((product) => {
            return (
              <li key={product.id}>
                <Link to={`${product.id}`}>{product.title}</Link>
              </li>
            );
          })}
        </ul> */}
        Product
      </div>
    </>
  );
}

export default Product;
