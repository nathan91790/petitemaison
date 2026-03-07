import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Products from "../pages/Products";

test("affiche la page produit", () => {

  render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  );

  const title = screen.getByText(/Nos produits/i);

  expect(title).toBeInTheDocument();

});