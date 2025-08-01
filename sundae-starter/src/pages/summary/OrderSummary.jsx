import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDtetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils/index";
import { keyboard } from "@testing-library/user-event/dist/cjs/keyboard/index.js";

function OrderSummary() {
  const { totals, optionCounts } = useOrderDtetails();
  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Object.Key(optionCounts.toppings);
  const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary</h1>
      <h2> Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2> Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  );
}

export default OrderSummary;
