import React, { useEffect, useState } from "react";
import { Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import ProductTable from "../../generic/Table";
import { getActiveProjects, getCompletedProjects } from "../../service/product";
import { Completed, Active } from "../../Constants";
import { pageReload } from "../../utils/bidTime";
import { ActiveBidHeader, CompletedBidHeader } from "../../Constants";

const fetchProducts = async (
  tab: string,
  setProducts: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const response =
      tab === Active ? await getActiveProjects() : await getCompletedProjects();
    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default function Dashboard() {
  const [tab, setTab] = useState(Active);
  const [products, setProducts] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [alignment, setAlignment] = React.useState('ongoing');

  const navigate = useNavigate();

  const handleTimeout = () => {
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, pageReload(products));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    handleTimeout();
    fetchProducts(tab, setProducts);
  }, [tab, count]);

  const handleSwitchChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    setTab(newAlignment === 'ongoing' ? Active : Completed);
  };


  return (
    <>
      <Header
      />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleSwitchChange}
        aria-label="Platform"
        sx={{
          marginTop: '50px'
        }}
      >
        <ToggleButton value="ongoing">Ongoing</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
      </ToggleButtonGroup>
      <ProductTable
        products={products}
        tab={tab}
        header={alignment === 'ongoing' ? ActiveBidHeader : CompletedBidHeader}
      />
    </>
  );
}
