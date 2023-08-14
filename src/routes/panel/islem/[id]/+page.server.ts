import type { PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
}) => {
  const { data } = await supabase
    .from("activities")
    .select(
      `
    id,
    kisi_id,
    help (
		isim,
        id
		),
	islemi_yapan,
	tarih,
	islem_aciklamasi
  `
    )
    .eq("kisi_id", params.id);

  const help = await await supabase.from("help").select().eq("id", params.id);

  return {
    params,
    help: help.data ?? [],
    islemGecmis: data ?? [],
  };
};

export const actions = {
  addIslem: async ({ request, locals: { supabase, getSession } }) => {
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

    console.log(kisi_id);

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
