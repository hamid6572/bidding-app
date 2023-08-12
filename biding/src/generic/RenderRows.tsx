import { useState } from "react";
import { TableCell, TableRow, Button } from "@mui/material"; // Import the appropriate TableCell component
import { bidTime } from "../utils/bidTime";
import BidButton from "./BidButton";
import ActiveBidModal from "./ActiveBidModal";
import { ModalDialogProps } from "@mui/joy/ModalDialog";

interface Product {
  id: number;
  name: string;
  starting_price: number;
  bid_time: string;
  bids: { amount: number }[];
  ownerId?: number;
  active?: boolean;
}

type Header = string;

const renderRecord = (tab: string) => {
  return tab === "active";
};

export default function RenderTableRows(
  headers: any,
  products: Product[],
  userId: number,
  tab: string,
  setLayout: any,
  setProductId: any,
  setBidAmount: any,
  setLastBid: any,
) {
  const [bidLayout, setBidLayout] = useState<ModalDialogProps["layout"] | undefined>(
    undefined
  );
  return products.map((row) => (
    <TableRow key={row.id}>
      {headers.map((column: Header, index: number) => {
        switch (column) {
          case "Product Name":
            return <TableCell key={index}>{row["name"]}</TableCell>;
          case "($) Starting Price":
            return (
              <TableCell key={index}>{`$ ${row["starting_price"]}`}</TableCell>
            );
          case "($) Last Bid":
            return (
              <TableCell key={index}>
                $ {row["bids"]?.length >= 1 ? row["bids"][0]?.amount : "-"}
              </TableCell>
            );
          case "Bid Time":
            return (
              renderRecord(tab) && (
                <TableCell key={index}>{bidTime(row?.bid_time)}</TableCell>
              )
            );
          case "Bid":
            return (
              renderRecord(tab) &&
              row["ownerId"] !== userId && (
                <TableCell key={index}>
                  <BidButton
                    setLayout={setLayout}
                    productId={row.id}
                    setProductId={setProductId}
                    productPrice={row.starting_price}
                    setBidAmount={setBidAmount}
                    lastBid={Number(row["bids"][0]?.amount)}
                    setLastBid={setLastBid}
                  />
                </TableCell>
              )
            );
          case "($) Closed Bid":
            return (
              <TableCell key={index}>
                $ {row["bids"]?.length >= 1 ? row["bids"][0]?.amount : "-"}
              </TableCell>
            );
          case "Status":
            return (
              <TableCell key={index}>
                {row["active"] ? (
                  "Active"
                ) : (
                  <>
                  <ActiveBidModal
                    layout={bidLayout as string}
                    setLayout={setBidLayout}
                    productId={Number(row.id)}
                    currentDate={row?.bid_time}
                    starting_price={Number(row.starting_price)}
                  />
                  <Button variant="contained" onClick={()=> setBidLayout("center")}>
                    Start Bidding
                  </Button>
                  </>
                )}
              </TableCell>
            );
          default:
            return null;
        }
      })}
    </TableRow>
  ));
}
