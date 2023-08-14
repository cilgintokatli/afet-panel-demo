import { error, fail } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  locals: { supabase, getSession },
}) => {
  const session = await getSession();

  const { data } = await supabase
    .from("help")
    .select()
    .order("id", { ascending: true });

  const activities = await supabase.from("activities").select(`
    id,
    help (
		isim
		),
	islemi_yapan,
	tarih,
	islem_aciklamasi
  `);

  const islemDate = await supabase
    .from("activities")
    .select("id,tarih, kisi_id,islemi_yapan");

  console.log(islemDate.data);

  return {
    session,
    islemDate: islemDate.data ?? [],
    activities: activities.data ?? [],
    results: data ?? [],
    help: data ?? [],
  };
};

export const actions = {
  create: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      // the user is not signed in
      throw error(401, { message: "Unauthorized" });
    }
    const formData = Object.fromEntries(await request.formData());

    const {
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
    } = formData;

    const errors: Record<string, unknown> = {};

    if (!isim) {
      errors.isim = true;
    }

    if (!telefon) {
      errors.telefon = true;
    }

    if (Object.keys(errors).length > 0) {
      const data = {
        data: formData,
        errors,
      };
      return fail(400, data);
    }

    // const isim = formData.get('isim');
    // const telefon = formData.get('telefon');
    // const il = formData.get('il');
    // const ilce = formData.get('ilce');
    // const mahalle = formData.get('mahalle');
    // const sokak = formData.get('sokak');
    // const konum = formData.get('konum');
    // const temas_kisi = formData.get('temas_kisi');
    // const saglik = formData.get('saglik');
    // const gida_hijyen = formData.get('gida_hijyen');
    // const yakacak = formData.get('yakacak');
    // const barinma = formData.get('barinma');
    // const hukuksal = formData.get('hukuksal');
    // const psikolojik = formData.get('psikolojik');
    // const esya = formData.get('esya');
    // const note = formData.get('note');

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

    const { data } = await supabase.from("help").insert(newPerson).select();
    try {
      return {
        data,
        message: "form gönderildi",
      };
    } catch (error) {
      return `hata error ${error}`;
    }
  },
  createActivite: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      // the user is not signed in
      throw fail(401, { message: "Unauthorized" });
    }
    const formData = Object.fromEntries(await request.formData());

    const { kisi_id, islemi_yapan } = formData;

    const errors: Record<string, unknown> = {};

    if (!kisi_id) {
      errors.kisi = true;
    }

    if (!islemi_yapan) {
      errors.islemkisi = true;
    }

    if (Object.keys(errors).length > 0) {
      const data = {
        data: formData,
        errors,
      };
      return fail(400, data);
    }

    const { data, error } = await supabase
      .from("activities")
      .insert(formData)
      .select();
    console.log("server error", error);
    console.log("serverdan", data);
    try {
      return {
        data,
        message: "form gönderildi",
      };
    } catch (error) {
      return `hata error ${error}`;
    }
  },
};
