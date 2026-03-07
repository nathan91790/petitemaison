import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn()
  })
}));

test("affiche le formulaire de connexion", () => {

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const email = screen.getByLabelText(/email/i);

  expect(email).toBeInTheDocument();

});