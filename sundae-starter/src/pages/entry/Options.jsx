import axios from "axios";
import React, { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants/index";
import { formatCurrency } from "../../utils/index";
import { useOrderDtetails } from "../../contexts/OrderDetails";

function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDtetails();

  // option type is scoop or toppings
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO: replace null with ToppingOption when available
  const ItemComponent =
    optionType === "scoops"
      ? ScoopOption
      : optionType === "toppings"
      ? ToppingOption
      : null;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionsItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionsItems}</Row>
    </>
  );
}

export default Options;
