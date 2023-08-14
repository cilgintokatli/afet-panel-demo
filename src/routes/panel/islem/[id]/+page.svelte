<script lang="ts">
  import { enhance } from "$app/forms";
  import Flat from "$lib/components/Flat.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import type { ActionData, PageData } from "./$types";
  import { writable } from "svelte/store";

  export let data: PageData;
  export let form: ActionData;

  let { islemGecmis, help } = data;
  $: ({ islemGecmis, help } = data);

  console.log(islemGecmis);

  const helpID = help[0];

  const formatDate = (x) => {
    const formattedDate = new Date(x);
    return formattedDate.toLocaleDateString();
  };
</script>

<div class="bg-slate-200 dark:bg-slate-700 ">
  <div class="py-5 ">
    <div
      class="mb-10 flex gap-5 align-middle md:items-center flex-col md:flex-row"
    >
      <a
        class=" dark:bg-slate-600 bg-slate-400 rounded-md dark:text-gray-200 text-white text-lg px-3 py-2"
        href="/panel/"
      >
        &#60; back to panel</a
      >
      <div class="text-2xl md:flex">
        Name: <p class=" dark:text-gray-300 md:ml-2">{helpID.isim}</p>
      </div>
    </div>

    <div class="mb-5 ">
      <form
        class="mt-10"
        method="POST"
        action="?/addIslem"
        use:enhance={({ form }) => {
          return async ({ result, update }) => {
            if (result.type === "success") {
              form.reset();
              toast.success("Successfull");
              await update();
            }
            if (result?.data?.errors?.kisi) {
              toast.error("person is required");
            }
            if (result?.data?.errors?.islemkisi) {
              toast.error("visitor is required");
            }
            console.log(result);
          };
        }}
      >
        <h2 class=" text-3xl dark:text-gray-300 mb-10">Add a new visit</h2>
        <label for="kisi_id" class="block">
          <select
            hidden
            class="input input-bordered border-2 font-medium w-full"
            name="kisi_id"
          >
            <option value={helpID.id}>{helpID.isim} </option>
          </select>
        </label>
        <label for="islemi_yapan" class="flex flex-col mb-5">
          <span class="text-gray-600 dark:text-gray-300">Visitor</span>
          <input
            class="input input-bordered border-2 font-medium w-full md:w-1/2"
            type=" text"
            name="islemi_yapan"
          />
        </label>
        <label for="islem_aciklamasi" class="flex flex-col mb-5">
          <span class="text-gray-600 dark:text-gray-300">Visit description</span
          >
          <textarea
            class="input input-bordered border-2 font-medium w-full md:w-1/2"
            name="islem_aciklamasi"
          />
        </label>

        <Flat />

        <button class="btn btn-outline btn-lg dark:bg-gray-600" type="submit"
          >Submit</button
        >
      </form>
    </div>

    {#if islemGecmis.length > 0}
      <div class="overflow-x-auto mt-20">
        <table class="table table-zebra w-full">
          <!-- head -->
          <thead>
            <tr>
              <th />
              <th>Date</th>
              <!-- <th>İsim</th> -->
              <th>Visitor</th>
              <th>Visit Description</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            {#each islemGecmis as islem, id}
              <tr class="hover">
                <th />
                <td>{formatDate(islem.tarih) ?? ""}</td>
                <!-- <td>{islem?.yardimlar?.isim ?? ''}</td> -->
                <td>{islem.islemi_yapan ?? ""}</td>
                <td> {islem.islem_aciklamasi}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-2xl mt-10">No history of visit.</p>
    {/if}
    <Toaster />
  </div>
</div>

<style>
  table {
    counter-reset: row-num;
  }
  table tbody tr {
    counter-increment: row-num;
  }

  /* table tbody tr th:first-child::before {
		content: counter(row-num) '. ';
	} */

  table tbody tr th:first-child::before {
    content: counter(row-num);
  }
</style>
