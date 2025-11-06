// src/app/api/presentes/route.js

let presentes = [
  {
    id: "panela",
    nome: "Jogo de panelas",
    preco: 289.9,
    caminhoImagem: "/assets/champagne.jpeg",
  },
];

export async function GET() {
  return Response.json(presentes);
}

export async function POST(req) {
  try {
    const novoPresente = await req.json();

    // Validação simples
    if (!novoPresente.nome || !novoPresente.preco) {
      return Response.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const presente = {
      id: crypto.randomUUID(),
      nome: novoPresente.nome,
      preco: parseFloat(novoPresente.preco),
      caminhoImagem: novoPresente.imagem || "/assets/champagne.jpeg",
    };

    presentes.push(presente);

    return Response.json(presente, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Erro ao criar presente" }, { status: 500 });
  }
}
