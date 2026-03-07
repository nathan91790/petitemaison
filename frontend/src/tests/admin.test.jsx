import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import Home from "../pages/Home";

test("le bouton créer un produit apparait pour un admin", () => {

    vi.mock("../context/AuthContext", () => ({
        useAuth: () => ({
            user: { role: "ADMIN" }
        })
    }));

    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    const button = screen.queryByText(/Créer un produit/i);
    expect(button).not.toBeInTheDocument();

});

test("le bouton créer un produit ne s'affiche pas pour un utilisateur", () => {

    vi.mock("../context/AuthContext", () => ({
        useAuth: () => ({
            user: { role: "USER" }
        })
    }));

    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    const button = screen.queryByText(/Créer un produit/i);

    expect(button).not.toBeInTheDocument();

});