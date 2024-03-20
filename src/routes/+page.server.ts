import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (session) {
    throw redirect(303, "/panel");
  }
};

export const actions: Actions = {
  login: async ({ request, locals: { supabase } }) => {
    const body = Object.fromEntries(await request.formData());

    // const { error: err } = await locals.supabase.auth.signInWithPassword({
    // 	email: body.email as string,
    // 	password: body.password as string
    // });
    const { error: err } = await supabase.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string,
    });

    if (err) {
      console.log("errör:", err);
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: "Invalid credentials",
        });
      }
      return fail(500, {
        message: "Server error. Try again later.",
      });
    }

    throw redirect(303, "/panel");
  },
  register: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { error: err } = await locals.supabase.auth.signUp({
      email: body.email as string,
      password: body.password as string,
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: "Invalid email or password",
        });
      }
      return fail(500, {
        error: "Server error. Please try again later.",
      });
    }

    throw redirect(303, "/");
  },
};
