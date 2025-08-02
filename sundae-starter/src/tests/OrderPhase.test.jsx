import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App';

test('order phase for happy path', async () => {
    //render app
    const { unmount } = render(<App />);
    const user = userEvent.setup();

    // add ice cream scoops and toppings
    const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate"});
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "1");

    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla"});
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
    await user.click(cherriesCheckbox);

    // find and click order summary button
    const orderSummaryButton = screen.getByRole("button", { name: /order sundae/i});
    await user.clicl(orderSummaryButton);

    // check summary information based on order
    const sammaryHeading = screen.getByRole("heading", {name: "Order Summary"});
    expect(sammaryHeading).toBeInTheDocument();

    const scoopsHeading = screen.getByRole("heading", {name: "Scoops: $6.00"});
    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.getByRole("heading", {name: "Toppings: $1.50"});
    expect(toppingsHeading).toBeInTheDocument();

    expect(screen.getByText("1 Chocolate")).toBeInTheDocument();
    expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
    expect(screen.getByText("Cherries")).toBeInTheDocument();

    // accept terms and conditions and click button to confirm order
    const tcCheckBox = screen.getByRole("checkbox", {name: /terms and conditions/i });
    await user.click(tcCheckBox)

    const confirmOrderButton = screen.getByRole("button", { name: /confirm order/i});
    await user.click(confirmOrderButton);

    // looading must show with a delay
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();

    //check confimation page text is available
    const thankYouHeader = await screen.findByRole("heading", { name: /thank you/i });
    expect(thankYouHeader).toBeInTheDocument();

    // looading must have disappered
    const noloading = screen.queryByText(/loading/i);
    expect(noloading).not.toBeInTheDocument();

    //  confirm order number on confirmation page 
    const orderNumber = await screen.findByText(/order number/i);
    expect(orderNumber).toBeInTheDocument();

    // click new order button on confirmation page
    const newOrderButton = screen.getByRole("button", { name: /new order/i});
    await user.click(newOrderButton);

    // check the scoops and toppoings subtotals have reset
    const scoopsTotal = await screen.findByText("Scoops total: $0.00");
    expect(scoopsTotal).toBeInTheDocument();

    const toppingTotal = screen.getByText("Topping total: $0.00");
    expect(toppingTotal).toBeInTheDocument();

    // clean up
    unmount();

    // HINT: do we need to await anything to avoid test errors?
})
