// // src/hooks.server.ts
// import {
//   PUBLIC_SUPABASE_URL,
//   PUBLIC_SUPABASE_ANON_KEY,
// } from "$env/static/public";
// import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
// import { error, redirect, type Handle } from "@sveltejs/kit";

// export const handle: Handle = async ({ event, resolve }) => {
//   event.locals.supabase = createSupabaseServerClient({
//     supabaseUrl: PUBLIC_SUPABASE_URL,
//     supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
//     event,
//   });

//   /**
//    * a little helper that is written for convenience so that instead
//    * of calling `const { data: { session } } = await supabase.auth.getSession()`
//    * you just call this `await getSession()`
//    */
//   event.locals.getSession = async () => {
//     const {
//       data: { session },
//     } = await event.locals.supabase.auth.getSession();
//     return session;
//   };

//   if (event.url.pathname.startsWith("/panel")) {
//     const session = await event.locals.getSession();
//     if (!session) {
//       // the user is not signed in
//       throw redirect(303, "/");
//     }
//   }
//   if (
//     event.url.pathname.startsWith("/panel") &&
//     event.request.method === "POST"
//   ) {
//     const session = await event.locals.getSession();
//     if (!session) {
//       // the user is not signed in
//       throw error(303, "/");
//     }
//   }

//   return resolve(event, {
//     /**
//      * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
//      *
//      * https://github.com/sveltejs/kit/issues/8061
//      */
//     filterSerializedResponseHeaders(name) {
//       return name === "content-range";
//     },
//   });
// };

import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { createServerClient } from "@supabase/ssr";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (key) => event.cookies.get(key),
        /**
         * Note: You have to add the `path` variable to the
         * set and remove method due to sveltekit's cookie API
         * requiring this to be set, setting the path to an empty string
         * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
         */
        set: (key, value, options) => {
          event.cookies.set(key, value, { ...options, path: "/" });
        },
        remove: (key, options) => {
          event.cookies.delete(key, { ...options, path: "/" });
        },
      },
    }
  );

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  if (event.url.pathname.startsWith("/panel")) {
    const session = await event.locals.getSession();
    if (!session) {
      // the user is not signed in
      throw redirect(303, "/");
    }
  }
  if (
    event.url.pathname.startsWith("/panel") &&
    event.request.method === "POST"
  ) {
    const session = await event.locals.getSession();
    if (!session) {
      // the user is not signed in
      throw error(303, "/");
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
