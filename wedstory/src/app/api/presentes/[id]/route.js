// src/app/api/presentes/[id]/route.js
import { presentes } from "../route";

// helpers locais (precisamos aqui também)
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

function findIndex(id) {
  return presentes.findIndex((p) => p.id === id);
}

export async function GET(_req, ctx) {
  const { id } = await ctx.params; // 👈 precisa aguardar
  const item = presentes.find((p) => p.id === id);
  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(item);
}

export async function PUT(req, ctx) {
  const { id } = await ctx.params; // 👈 precisa aguardar
  const i = findIndex(id);
  if (i === -1) return Response.json({ error: "Not found" }, { status: 404 });

  try {
    const body = await req.json();

    const current = presentes[i];
    const next = { ...current };

    if (body.nome !== undefined) next.nome = String(body.nome);
    if (body.preco !== undefined) next.preco = Number(body.preco);

    // aceita caminhoImagem ou imagem
    if (body.caminhoImagem !== undefined) {
      next.caminhoImagem = String(body.caminhoImagem).trim();
    } else if (body.imagem !== undefined) {
      next.caminhoImagem = String(body.imagem).trim();
    }

    // 👉 Se o nome mudou, sincroniza o ID com o novo nome (slug único)
    if (body.nome !== undefined && String(body.nome) !== current.nome) {
      const base = slugify(body.nome);
      const newId = makeUniqueId(base);
      next.id = newId;
    }

    presentes[i] = next;

    return Response.json(next);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

export async function DELETE(_req, ctx) {
  const { id } = await ctx.params; // 👈 precisa aguardar
  const i = findIndex(id);
  if (i === -1) return Response.json({ error: "Not found" }, { status: 404 });
  presentes.splice(i, 1);
  return new Response(null, { status: 204 });
}
