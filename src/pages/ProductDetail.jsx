import { useEffect, React, useState } from "react";
import { useParams } from "react-router";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    fetch(`https://api01.f8team.dev/api/products/${params.id}`)
      .then((res) => res.json())
      .then((response) => {
        setProduct(response);
      });
  }, [params.id]);

  return (
    <>
      <div>
        <ul>
          <li>{product.title}</li>
          <li>{product.description}</li>
          <li>{product.price}</li>
        </ul>
      </div>
    </>
  );
}

export default ProductDetail;
