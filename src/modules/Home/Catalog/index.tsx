import { useEffect } from "react";
import { useState } from "react";
import productsService from "../../../services/products";
import { IProduct } from "../../../store/modules/cart/types";
import CatalogItem from "./CatalogItem";

const Catalog = () => {
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    const response = await productsService.getProducts()
    setCatalog(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <div>
      <h1>Catalog</h1>

      {catalog.map((product) => (
        <CatalogItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Catalog;
