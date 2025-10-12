"use client";
import './Footer.css'; // Importa o novo CSS

export default function Footer() {
    return (
        <footer className="footer">
            <p>
                © 2025 |{' '}
                <a
                    href="https://portfoliomaikongino.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    <strong className="gradient-text">MG Produções</strong>
                </a>
            </p>
        </footer>
    );
}