import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Product } from "../types/product";

const SingleProduct = () => {
  const location = useLocation();
  const productId = useParams();
  // Here we retrieve the state from React router dom.
  const [product, setProduct] = useState<Product | undefined>(
    (location.state as { product: Product })?.product
  );
  console.log(product);
  console.log(productId);

  // Case is handled if product is not found in the state we call it from the single product api
  useEffect(() => {
    if (!product) {
      const fetchProduct = async () => {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId.id}`
        );
        const data = await response.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [product, productId.id]);

  // The below product?. handles the case if the product is still undefined after attempting to call the API
  return (
    <div>
      <p>{product?.title}</p>
    </div>
  );
};

export default SingleProduct;
