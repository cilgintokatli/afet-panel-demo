<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import Alert from "$lib/components/Alert.svelte";
  import { goto } from "$app/navigation";

  export let data: PageData;
  export let form;

  let { help } = data;
</script>

<svelte:head>
  <title>Kişi düzenle {help.isim}</title>
</svelte:head>

<div class="flex flex-col h-full py-8 mx-auto bg-slate-200 dark:bg-slate-700">
  <div class="mb-10">
    <a
      class=" dark:bg-slate-600 bg-slate-400 rounded-md dark:text-gray-200 text-white text-lg px-3 py-2"
      href="/panel/"
    >
      &#60; bak to panel</a
    >
  </div>

  <div class="">
    <p class="dark:text-gray-200 text-lg">Update {help.isim} info</p>
    {#if form?.error}
      <Alert message={form?.message} />
    {/if}

    <form
      class="flex flex-col gap-8 mt-10"
      method="POST"
      action="?/update"
      use:enhance={() => {
        return async ({ result, update }) => {
          if (result.type === "success") {
            await goto("/panel");
          }
          if (result.type === "failure") {
            await applyAction(result);
          }
          update();
        };
      }}
    >
      <label for="isim" class="block">
        <span class="text-gray-600 dark:text-gray-300">Name</span>
        <input
          bind:value={help.isim}
          class="input input-bordered border-2 w-full"
          type="text"
          name="isim"
        />
      </label>
      <label for="telefon" class="block">
        <span class="text-gray-600 dark:text-gray-300">Phone</span>
        <input
          bind:value={help.telefon}
          class="input input-bordered border-2 w-full"
          type="text"
          name="telefon"
        />
      </label>
      <label for="il">
        <span class="text-gray-600 dark:text-gray-300">City</span>
        <input
          bind:value={help.il}
          class="input input-bordered border-2	w-full"
          type="text"
          name="il"
        />
      </label>
      <label for="ilce">
        <span class="text-gray-600 dark:text-gray-300">Town</span>
        <input
          bind:value={help.ilce}
          class="input input-bordered border-2	w-full"
          type="text"
          name="ilce"
        />
      </label>
      <label for="mahalle">
        <span class="text-gray-600 dark:text-gray-300">Neighborhood</span>
        <input
          bind:value={help.mahalle}
          class="input input-bordered border-2	w-full"
          type="text"
          name="mahalle"
        />
      </label>
      <label for="sokak">
        <span class="text-gray-600 dark:text-gray-300">Sokak</span>
        <input
          bind:value={help.sokak}
          class="input input-bordered border-2	w-full"
          type="text"
          name="sokak"
        />
      </label>
      <label for="konum">
        <span class="text-gray-600 dark:text-gray-300">Location</span>
        <input
          bind:value={help.konum}
          class="input input-bordered border-2	w-full"
          type="text"
          name="konum"
        />
      </label>
      <label for="temas_kisi">
        <span class="text-gray-600 dark:text-gray-300">Contact Person</span>
        <input
          bind:value={help.temas_kisi}
          class="input input-bordered border-2	w-full"
          type="text"
          name="temas_kisi"
        />
      </label>
      <label for="saglik">
        <span class="text-gray-600 dark:text-gray-300">Health</span>
        <textarea
          bind:value={help.saglik}
          class="textarea textarea-bordered border-2 w-full"
          name="saglik"
        />
      </label>
      <label for="gida_hijyen">
        <span class="text-gray-600 dark:text-gray-300">Food and Hygene</span>
        <textarea
          bind:value={help.gida_hijyen}
          class="textarea textarea-bordered border-2 w-full"
          name="gida_hijyen"
        />
      </label>
      <label for="yakacak">
        <span class="text-gray-600 dark:text-gray-300">Fuel</span>
        <textarea
          bind:value={help.yakacak}
          class="textarea textarea-bordered border-2 w-full"
          name="yakacak"
        />
      </label>
      <label for="barinma">
        <span class="text-gray-600 dark:text-gray-300">Shelter</span>
        <textarea
          bind:value={help.barinma}
          class="textarea textarea-bordered border-2 w-full"
          name="barinma"
        />
      </label>
      <label for="hukuksal">
        <span class="text-gray-600 dark:text-gray-300">Legality</span>
        <textarea
          bind:value={help.hukuksal}
          class="textarea textarea-bordered border-2 w-full"
          name="hukuksal"
        />
      </label>
      <label for="psikolojik">
        <span class="text-gray-600 dark:text-gray-300">Psychology</span>
        <textarea
          bind:value={help.psikolojik}
          class="textarea textarea-bordered border-2 w-full"
          name="psikolojik"
        />
      </label>
      <label for="esya">
        <span class="text-gray-600 dark:text-gray-300">Furniture stuff</span>
        <textarea
          bind:value={help.esya}
          class="textarea textarea-bordered border-2 w-full"
          name="esya"
        />
      </label>
      <label for="note">
        <span class="text-gray-600 dark:text-gray-300">Note</span>
        <textarea
          bind:value={help.note}
          class="textarea textarea-bordered border-2 w-full"
          name="note"
        />
      </label>

      <button class="btn btn-outline btn-lg dark:bg-gray-600" type="submit"
        >Update</button
      >
    </form>
  </div>
</div>
