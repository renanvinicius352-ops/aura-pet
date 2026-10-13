
document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // 1. ANO AUTOMÁTICO NO RODAPÉ
    // ========================================

    document.querySelectorAll("[data-ano]").forEach((elemento) => {
        elemento.textContent = new Date().getFullYear();
    });

    // ========================================
    // 2. ELEMENTOS APARECEM AO ROLAR A PÁGINA
    // ========================================

    const elementosAnimados = document.querySelectorAll(".animar");

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            (entradas, observer) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visivel");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        elementosAnimados.forEach((elemento) => {
            observador.observe(elemento);
        });
    } else {
        elementosAnimados.forEach((elemento) => {
            elemento.classList.add("visivel");
        });
    }

    // ========================================
    // 3. PATINHAS FLUTUANDO PELA TELA
    // ========================================

    const fundoPatinhas = document.getElementById("fundoPatinhas");
    const prefereMenosMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (fundoPatinhas && !prefereMenosMovimento) {
        let quantidadePatinhas = 0;
        const limitePatinhas = 14;

        function criarPatinha() {
            if (document.hidden || quantidadePatinhas >= limitePatinhas) {
                return;
            }

            const patinha = document.createElement("span");

            patinha.className = "patinha";
            patinha.textContent = "🐾";
            // Alterna entre patinhas douradas e ossinhos brancos
            const criarOssinho = Math.random() < 0.35;

             if (criarOssinho) {
            patinha.className = "ossinho";
            patinha.textContent = "";
              } else {
              patinha.className = "patinha";
              patinha.textContent = "";
              }
            patinha.setAttribute("aria-hidden", "true");

            const tamanho = Math.floor(Math.random() * 22) + 18;
            const duracao = (Math.random() * 2.5 + 4).toFixed(2);
            const rotacao = Math.floor(Math.random() * 70) - 35;
            const rotacaoFinal = rotacao + Math.floor(Math.random() * 60) - 30;
            const deriva = Math.floor(Math.random() * 140) - 70;
            const posicaoHorizontal = Math.random() * 100;

            patinha.style.left = `${posicaoHorizontal}%`;
            patinha.style.setProperty("--tamanho", `${tamanho}px`);
            patinha.style.setProperty("--duracao", `${duracao}s`);
            patinha.style.setProperty("--rotacao", `${rotacao}deg`);
            patinha.style.setProperty("--rotacao-final", `${rotacaoFinal}deg`);
            patinha.style.setProperty("--deriva", `${deriva}px`);

            fundoPatinhas.appendChild(patinha);
            quantidadePatinhas++;

            patinha.addEventListener(
                "animationend",
                () => {
                    patinha.remove();
                    quantidadePatinhas--;
                },
                { once: true }
            );
        }

        criarPatinha();
        window.setInterval(criarPatinha, 650);
    }

    // ========================================
    // 4. EFEITO 3D NOS CARDS DE PRODUTOS
    // ========================================

    const cardsProdutos = document.querySelectorAll(".produto-card");
    const dispositivoComMouse = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (dispositivoComMouse && !prefereMenosMovimento) {
        cardsProdutos.forEach((card) => {
            card.addEventListener("mousemove", (evento) => {
                const retangulo = card.getBoundingClientRect();

                const x = evento.clientX - retangulo.left;
                const y = evento.clientY - retangulo.top;

                const centroX = retangulo.width / 2;
                const centroY = retangulo.height / 2;

                const rotacaoX = ((centroY - y) / centroY) * 4;
                const rotacaoY = ((x - centroX) / centroX) * 4;

                card.style.transform =
                    `perspective(900px) rotateX(${rotacaoX}deg) ` +
                    `rotateY(${rotacaoY}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    console.log("AURA PET carregado com sucesso! 🐾");
});

/* CADASTRO DEMONSTRATIVO AURA PET */

const formularioPet = document.getElementById("formularioPet");

if (formularioPet) {
    formularioPet.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const mensagem = document.getElementById("mensagemCadastro");

        mensagem.textContent =
            "Cadastro demonstrativo preenchido! Nenhum dado foi enviado ou salvo.";

        formularioPet.reset();
    });
}

