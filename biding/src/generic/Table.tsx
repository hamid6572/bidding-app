import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ModalDialogProps } from "@mui/joy/ModalDialog";
import BidModal from "./BidModal";
import Notification from "../generic/Notification";
import RenderTableRows from "./RenderRows";

interface ProductTableProps {
  products: any[];
  tab: string;
  header: Array<String>;
}

export default function ProductTable({
  products,
  tab,
  header,
}: ProductTableProps) {
  const [productId, setProductId] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [lastBid, setLastBid] = useState<number>(0);
  const [layout, setLayout] = useState<ModalDialogProps["layout"] | undefined>(
    undefined
  );
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, 15000);
    return () => {
      clearTimeout(timer);
    };
  }, [count, products]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, marginTop: "50px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {header.map((header) => {
                return <TableCell key={header as string} >{header}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {RenderTableRows(header, products, Number(userId), tab, setLayout, setProductId, setBidAmount, setLastBid)}
          </TableBody>
        </Table>
      </TableContainer>
      <BidModal
        bidAmount={bidAmount}
        layout={layout as string}
        setLayout={setLayout}
        setOpen={setOpen}
        productId={productId}
        lastBid ={!lastBid? 0 : lastBid}
      />
      <Notification
        open={open}
        setOpen={setOpen}
        message={"Bid cannot be less than the starting price & Last Bid"}
      />
    </>
  );
}
