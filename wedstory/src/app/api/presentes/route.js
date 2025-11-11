// // src/app/api/presentes/route.js

// let presentes = [
//   {
//     id: "panela",
//     nome: "Jogo de panelas",
//     preco: 289.9,
//     caminhoImagem: "/assets/champagne.jpeg",
//   },
// ];

// export async function GET() {
//   return Response.json(presentes);
// }

// export async function POST(req) {
//   try {
//     const novoPresente = await req.json();

//     // Validação simples
//     if (!novoPresente.nome || !novoPresente.preco) {
//       return Response.json({ error: "Dados inválidos" }, { status: 400 });
//     }

//     const presente = {
//       id: crypto.randomUUID(),
//       nome: novoPresente.nome,
//       preco: parseFloat(novoPresente.preco),
//       caminhoImagem: novoPresente.imagem || "/assets/champagne.jpeg",
//     };

//     presentes.push(presente);

//     return Response.json(presente, { status: 201 });
//   } catch (error) {
//     return Response.json({ error: "Erro ao criar presente" }, { status: 500 });
//   }
// }
// src/app/api/presentes/route.js

export let presentes = [
  {
    id: "panela",
    nome: "Jogo de panelas",
    preco: 289.9,
    caminhoImagem: "/assets/champagne.jpeg",
  },
];

const slugify = (s) =>
  String(s)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const short = () => Math.random().toString(36).slice(2, 6);
const makeUniqueId = (base) => {
  const taken = new Set(presentes.map((p) => p.id));
  let candidate = base || "item";
  while (taken.has(candidate)) candidate = `${base}-${short()}`;
  return candidate;
};

export async function GET() {
  return Response.json(presentes);
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body?.nome || body.preco === undefined || body.preco === null) {
      return Response.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // aceita id do client (slug) ou gera a partir do nome
    const base = body.id ? String(body.id) : slugify(body.nome);
    const id = makeUniqueId(base);

    const presente = {
      id,
      nome: String(body.nome),
      preco: Number(body.preco),
      caminhoImagem: (body.caminhoImagem ?? body.imagem ?? "/assets/champagne.jpeg").trim(),
    };

    presentes.push(presente);
    return Response.json(presente, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Erro ao criar presente" }, { status: 500 });
  }
}
