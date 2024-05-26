import { renderWithProviders } from "@/tests/testUtils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductDetail from "..";

describe("Projects table", async () => {
  it("Rendering correctly", async () => {
    renderWithProviders(<ProductDetail />, {
      initialURL: "/3",
      routePath: "/:id",
    });
    const product = await screen.findByTestId("product-3");
    expect(product).toBeInTheDocument();
  });

  it("Rendering correctly", async () => {
    renderWithProviders(<ProductDetail />, {
      initialURL: "/3",
      routePath: "/:id",
    });
    const product = await screen.findByTestId("product-3");
    expect(product).toBeInTheDocument();
    const brand = await screen.findByTestId("brand");
    expect(brand).toBeInTheDocument();
    expect(brand.innerHTML).toBe("<b>Brand : </b>&nbsp;Ferrari");
    const model = await screen.findByTestId("model");
    expect(model).toBeInTheDocument();
    expect(model.innerHTML).toBe("<b>Model : </b>&nbsp;Taurus");
    const price = await screen.findByTestId("price");
    expect(price).toBeInTheDocument();
    expect(price.innerHTML).toBe("<b>Price : </b>&nbsp;735.00 ₺");
  });

  it("Add product to card", async () => {
    renderWithProviders(<ProductDetail />, {
      initialURL: "/3",
      routePath: "/:id",
    });
    const productCardButton = await screen.findByTestId("add-coad-Ford XC90");
    expect(productCardButton).toBeInTheDocument();
    await userEvent.click(productCardButton);
    const cardProduct = await screen.findByTestId("card-Ford XC90");
    expect(cardProduct).toBeInTheDocument();
    const cardProductPrice = await screen.findByTestId("card-price-Ford XC90");
    expect(cardProductPrice).toBeInTheDocument();
    expect(cardProductPrice.innerHTML).toBe("735.00₺");
    const cardPlusButton = await screen.findByTestId("card-plus-Ford XC90");
    expect(cardPlusButton).toBeInTheDocument();
    await userEvent.click(cardPlusButton);
    const afterCardChangePlus = await screen.findByTestId(
      "card-price-Ford XC90"
    );
    expect(afterCardChangePlus).toBeInTheDocument();
    expect(afterCardChangePlus.innerHTML).toBe("1470.00₺");
    const cardMinusButton = await screen.findByTestId("card-minus-Ford XC90");
    expect(cardPlusButton).toBeInTheDocument();
    await userEvent.click(cardMinusButton);
    const afterCardChangeMinus = await screen.findByTestId(
      "card-price-Ford XC90"
    );
    expect(afterCardChangeMinus).toBeInTheDocument();
    expect(afterCardChangeMinus.innerHTML).toBe("735.00₺");
  });
});
