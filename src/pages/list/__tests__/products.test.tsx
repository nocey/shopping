import { renderWithProviders } from "@/tests/testUtils";
import ProductList from "..";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Projects table", async () => {
  it("Rendering correctly", async () => {
    renderWithProviders(<ProductList />);
    const product = await screen.findByTestId("product-list");
    expect(product).toBeInTheDocument();
  });

  it("Global search input change", async () => {
    renderWithProviders(<ProductList />);
    const globalSearch = await screen.findByTestId("global-search");
    expect(globalSearch).toBeInTheDocument();
    await userEvent.type(globalSearch, "Bentley");

    let products = await screen.findAllByTestId("product");
    expect(products.length).toBe(2);
    await userEvent.clear(globalSearch);
    await userEvent.type(globalSearch, "aston");

    products = await screen.findAllByTestId("product");
    expect(products.length).toBe(4);
  });

  it("Add product to card", async () => {
    renderWithProviders(<ProductList />);
    const productCardButton = await screen.findByTestId(
      "add-coad-Bentley Focus"
    );
    expect(productCardButton).toBeInTheDocument();
    await userEvent.click(productCardButton);
    const cardProduct = await screen.findByTestId("card-Bentley Focus");
    expect(cardProduct).toBeInTheDocument();
    const cardProductPrice = await screen.findByTestId(
      "card-price-Bentley Focus"
    );
    expect(cardProductPrice).toBeInTheDocument();
    expect(cardProductPrice.innerHTML).toBe("51.00₺");
    const cardPlusButton = await screen.findByTestId("card-plus-Bentley Focus");
    expect(cardPlusButton).toBeInTheDocument();
    await userEvent.click(cardPlusButton);
    const afterCardChangePlus = await screen.findByTestId(
      "card-price-Bentley Focus"
    );
    expect(afterCardChangePlus).toBeInTheDocument();
    expect(afterCardChangePlus.innerHTML).toBe("102.00₺");
    const cardMinusButton = await screen.findByTestId(
      "card-minus-Bentley Focus"
    );
    expect(cardPlusButton).toBeInTheDocument();
    await userEvent.click(cardMinusButton);
    const afterCardChangeMinus = await screen.findByTestId(
      "card-price-Bentley Focus"
    );
    expect(afterCardChangeMinus).toBeInTheDocument();
    expect(afterCardChangeMinus.innerHTML).toBe("51.00₺");
    const totalPrice = await screen.findByTestId("total-price");
    expect(totalPrice).toBeInTheDocument();
    expect(totalPrice.innerHTML).toBe("51.00₺");
  });

  it("Filtering table correctly", async () => {
    renderWithProviders(<ProductList />);
    const filterName = await screen.findByTestId("Bentley Focus");
    expect(filterName).toBeInTheDocument();
    await userEvent.click(filterName);
    const productsName = await screen.findAllByTestId("product");
    expect(productsName.length).toBe(1);
    const filterBrand = await screen.findByTestId("Lamborghini");
    expect(filterBrand).toBeInTheDocument();
    await userEvent.click(filterBrand);
    const productsBrand = await screen.findAllByTestId("product");
    expect(productsBrand.length).toBe(3);
    const filterModel = await screen.findByTestId("CTS");
    expect(filterModel).toBeInTheDocument();
    await userEvent.click(filterModel);
    const productsModel = await screen.findAllByTestId("product");
    expect(productsModel.length).toBe(7);
  });
});
