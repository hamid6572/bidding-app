import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import { getUserProducts } from "../../service/product";
import ProductTable from "../../generic/Table";
import { ProductsHeader } from "../../Constants";

const fetchProducts = async (setProducts: Function) => {
  try {
    const response = await getUserProducts();
    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    fetchProducts(setProducts);
  }, []);
  return (
    <>
      <Header
      />
      <Typography variant="h2"> My Products </Typography>
      <ProductTable products={products} tab=""  header={ProductsHeader}/>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 15, mb: 2 }}
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </Button>
    </>
  );
}
