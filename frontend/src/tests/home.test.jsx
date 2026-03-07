import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: null
  })
}));

test("affiche le titre de la page", () => {

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const title = screen.getByText(/Petite Maison de l'Épouvante/i);

  expect(title).toBeInTheDocument();

});