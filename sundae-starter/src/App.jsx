import Container_ from "react-bootstrap/container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container_>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container_>
  );
}

export default App;
