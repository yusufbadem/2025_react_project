import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { singleProduct } from "../services/productService"; // API çağrısı için
import { Product } from "../models/IProduct"; // Ürün modeli

function ProductBreadcrumbs() {
  const location = useLocation(); // Mevcut URL'yi alır
  const { pid } = useParams(); // URL'deki pid parametresini alır
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (pid) {
      singleProduct(pid).then((res) => {
        setProduct(res.data.data);
      });
    }
  }, [pid]);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/products">Products</Link>
      {pid ? (
        <Typography color="text.danger">
          {product ? product.title : "Yükleniyor..."}
        </Typography>
      ) : null}
    </Breadcrumbs>
  );
}

export default ProductBreadcrumbs;
