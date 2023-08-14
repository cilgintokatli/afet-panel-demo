import { error, fail, redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
}) => {
  const { data } = await supabase.from("help").select().eq("id", params.id);

  return {
    params,
    help: data?.[0] ?? [],
    results: data ?? [],
  };
};
export const actions = {
  update: async ({ request, locals: { supabase, getSession }, params }) => {
    const session = await getSession();
    if (!session) {
      // the user is not signed in
      throw error(401, { message: "Unauthorized" });
    }
    const formData = await request.formData();

    // const {
    // 	isim,
    // 	telefon,
    // 	il,
    // 	ilce,
    // 	mahalle,
    // 	sokak,
    // 	konum,
    // 	temas_kisi,
    // 	saglik,
    // 	gida_hijyen,
    // 	yakacak,
    // 	barinma,
    // 	hukuksal,
    // 	psikolojik,
    // 	esya,
    // 	note
    // } = formData;

    const isim = formData.get("isim");
    const telefon = formData.get("telefon");
    const il = formData.get("il");
    const ilce = formData.get("ilce");
    const mahalle = formData.get("mahalle");
    const sokak = formData.get("sokak");
    const konum = formData.get("konum");
    const temas_kisi = formData.get("temas_kisi");
    const saglik = formData.get("saglik");
    const gida_hijyen = formData.get("gida_hijyen");
    const yakacak = formData.get("yakacak");
    const barinma = formData.get("barinma");
    const hukuksal = formData.get("hukuksal");
    const psikolojik = formData.get("psikolojik");
    const esya = formData.get("esya");
    const note = formData.get("note");

    if (!isim) {
      return fail(400, {
        error: true,
        message: "name is required",
      });
    }
    if (!telefon) {
      return fail(400, {
        error: true,
        message: "phone is required",
      });
    }
    if (!isim && !telefon) {
      return fail(400, {
        error: true,
        message: "name and phone is required",
      });
    }

    const newPerson = {
      isim,
      telefon,
      il,
      ilce,
      mahalle,
      sokak,
      konum,
      temas_kisi,
      saglik,
      gida_hijyen,
      yakacak,
      barinma,
      hukuksal,
      psikolojik,
      esya,
      note,
    };

    const { error: err } = await supabase
      .from("help")
      .update(newPerson)
      .eq("id", params.id)
      .select();
    if (err) {
      console.log("errorrr", err);
    }
    throw redirect(303, "/panel");
  },
};
