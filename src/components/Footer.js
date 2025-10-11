"use client";

// --- ESTILOS DO COMPONENTE ---
const footerStyles = {
    padding: '20px',
    textAlign: 'center',
    marginTop: '40px',
    borderTop: '1px solid var(--nevoa)',
    backgroundColor: '#fff',
    color: 'var(--grafite)'
};

const linkStyles = {
    fontWeight: 'bold',
    textDecoration: 'none'
};

const gradientStyles = {
    // Cria o gradiente de cores da marca
    background: 'linear-gradient(to right, var(--azul-noturno), var(--verde-salvia))',
    // Aplica o gradiente como "clip" (máscara) para o texto
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    // Deixa a cor original do texto transparente para o gradiente aparecer
    color: 'transparent',
};

// --- COMPONENTE PRINCIPAL ---
export default function Footer() {
    return (
        <footer style={footerStyles}>
            <p>
                © 2025 |{' '}
                <a
                    href="https://portfoliomaikongino.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyles}
                >
                    <strong style={gradientStyles}>MG Produções</strong>
                </a>
            </p>
        </footer>
    );
}