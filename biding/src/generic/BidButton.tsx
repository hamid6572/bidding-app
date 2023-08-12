import Button from "@mui/material/Button";

interface BidButtonProps {
  setLayout: Function;
  productId: number;
  setProductId: Function;
  productPrice: number;
  setBidAmount: Function;
  lastBid: number
  setLastBid: Function;
}

export default function BidButton({
  setLayout,
  productId,
  setProductId,
  productPrice,
  setBidAmount,
  lastBid,
  setLastBid,
}: BidButtonProps) {
  const handleBidButtonClick = () => {
    setLayout("center");
    setProductId(productId);
    setBidAmount(productPrice);
    setLastBid(lastBid)
  };

  return (
    <Button variant="contained" onClick={handleBidButtonClick}>
      Bid
    </Button>
  );
}
