<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import ActivitiesTable from "$lib/components/ActivitiesTable.svelte";
  import Flat from "$lib/components/Flat.svelte";
  import YardimlarTable from "$lib/components/YardimlarTable.svelte";
  import toast, { Toaster } from "svelte-french-toast";
  import { writable } from "svelte/store";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  const sehirler = [
    {
      id: 1,
      name: "Hatay",
      ilceler: [
        { name: "Altınözü" },
        { name: "Antakya" },
        { name: "Arsuz" },
        { name: "Belen" },
        { name: "Defne" },
        { name: "Dörtyol" },
        { name: "Erzin" },
        { name: "Hassa" },
        { name: "İskenderun" },
        { name: "Kırıkhan" },
        { name: "Kumlu" },
        { name: "Payas" },
        { name: "Reyhanlı" },
        { name: "Samandağ" },
        { name: "Yayladağı" },
      ],
    },
    {
      id: 2,
      name: "Malatya",
      ilceler: [
        { name: "Akçadağ" },
        { name: "Arapgir" },
        { name: "Arguvan" },
        { name: "Battalgazi" },
        { name: "Darende" },
        { name: "Doğanşehir" },
        { name: "Doğanyol" },
        { name: "Hekimhan" },
        { name: "Kale" },
        { name: "Kuluncak" },
        { name: "Pütürge" },
        { name: "Yazıhan" },
        { name: "Yeşilyurt" },
      ],
    },
    { id: 3, name: "Maraş", ilceler: [{ name: "Elbistan" }] },
  ];

  let selectedSehir = null;
  let selectedIlce = null;

  let yes = false;
  let acToggle = false;

  let { results, help, session, activities, islemDate } = data;
  $: ({ results, help, session, activities, islemDate } = data);

  // console.log(islemDate);

  let il: null | string = null;
  let ilce: null | string = null;

  const Search = writable({
    isim: "",
    il: "",
    ilce: "",
    mahalle: "",
    temas_kisi: "",
    psikolojik: "",
    saglik: "",
    hukuksal: "",
  });

  function filter(search) {
    results = help.filter(
      (helper) =>
        (!search.isim ||
          helper.isim
            .toLocaleLowerCase("tr")
            .includes(search.isim.toLocaleLowerCase("tr"))) &&
        (!search.il ||
          helper?.il
            ?.toLocaleLowerCase("tr")
            .includes(search?.il?.toLocaleLowerCase("tr"))) &&
        (!search.ilce ||
          helper?.ilce
            ?.toLocaleLowerCase("tr")
            .includes(search?.ilce?.toLocaleLowerCase("tr"))) &&
        (!search.mahalle ||
          helper?.mahalle
            ?.toLocaleLowerCase("tr")
            .includes(search?.mahalle?.toLocaleLowerCase("tr"))) &&
        (!search.temas_kisi ||
          helper?.temas_kisi
            ?.toLocaleLowerCase("tr")
            .includes(search?.temas_kisi.toLocaleLowerCase("tr"))) &&
        (!search.hukuksal ||
          helper?.hukuksal
            ?.toLocaleLowerCase("tr")
            .includes(search?.hukuksal.toLocaleLowerCase("tr"))) &&
        (!search.saglik ||
          helper?.saglik
            ?.toLocaleLowerCase("tr")
            .includes(search?.saglik.toLocaleLowerCase("tr"))) &&
        (!search.psikolojik ||
          helper?.psikolojik
            ?.toLocaleLowerCase("tr")
            .includes(search?.psikolojik.toLocaleLowerCase("tr")))
    );
  }

  $: filter($Search);

  function handleSehirChange(event) {
    const sehirName = event.target.value;
    // const newSelectedSehir = sehirler.find((sehir) => sehir.name == sehirName);
    if (il !== sehirName) {
      il = sehirName;
      ilce = null;
      Search.update((store) => {
        store.il = sehirName;
        store.ilce = null; // set selectedCity to null when a new country is selected
        return store;
      });
    }
  }

  function handleIlceChange(event) {
    ilce = event.target.value;
    Search.update((store) => {
      store.ilce = ilce;
      return store;
    });
  }

  function clearSelectedIlce() {
    selectedIlce = null;
    $Search.ilce = "";
  }
</script>

<svelte:head>
  <title>Disaster Volunteers Panel</title>
</svelte:head>

<div class="">
  <div class="flex mx-5 justify-between items-center">
    <label for="my-modal-6" class="btn btn-primary btn-lg my-8">
      <div class="text-2xl">New</div>
      <div class="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9 12H15"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 9L12 15"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#fff"
            stroke-width="2"
          />
        </svg>
      </div>
    </label>
    <!-- <p>merhaba {session?.user.email}</p> -->
    <form action="/logout" method="POST">
      <button type="submit" class="btn btn-error btn-lg my-8 text-2xl"
        >Logout</button
      >
    </form>
  </div>
  <!-- {#await islemTarihi}
		...
	{:then result}
		{#each islemTarihi || [] as isT}
			<p>{JSON.stringify(isT.activities)}</p>
		{:else}
			<li>No items found</li>
		{/each}
	{/await} -->

  <p class="mx-5 mb-5">
    Welcome {session?.user.email}
  </p>

  <div class="md:m-5" id="help">
    <!-- The button to open modal -->

    <!-- Put this part before </body> tag -->
    <input
      type="checkbox"
      id="my-modal-6"
      class="modal-toggle"
      bind:checked={yes}
    />

    {#if yes}
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box ">
          <label
            for="my-modal-6"
            class="btn btn-md btn-circle dark:bg-black bg-gray-400 dark:border-black border-gray-400 absolute right-2 top-2"
          >
            ✕
          </label>
          <p class="text-gray-600 dark:text-gray-300 text-xl">
            Add a new person
          </p>

          <!-- {#if form?.noisim}
						<p class="alert alert-error shadow-lg">İsim zorunlu</p>
					{/if}
					{#if form?.notelefon}
						<p class="alert alert-error shadow-lg">Telefon zorunlu</p>
					{/if} -->
          <form
            method="POST"
            action="?/create"
            class="flex flex-col gap-8 mt-10"
            use:enhance={({ form }) => {
              return async ({ result, update }) => {
                if (result.type === "success") {
                  yes = !yes;
                  form.reset();
                  toast.success("Successfull");
                  await update();
                }
                if (result?.data?.errors?.isim) {
                  toast.error("name is required");
                }
                if (result?.data?.errors?.telefon) {
                  toast.error("phone is required");
                }
              };
            }}
          >
            <label for="isim" class="block">
              <span class="text-gray-600 dark:text-gray-300">Name</span>
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="isim"
              />
            </label>
            <label for="telefon" class="block">
              <span class="text-gray-600 dark:text-gray-300">Phone</span>
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="telefon"
                id=""
              />
            </label>
            <label for="il">
              <span class="text-gray-600 dark:text-gray-300">City</span>
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="il"
              />
            </label>
            <label for="ilce">
              <span class="text-gray-600 dark:text-gray-300">Town</span>
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="ilce"
              />
            </label>
            <label for="mahalle">
              <span class="text-gray-600 dark:text-gray-300">Neighborhood</span>
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="mahalle"
              />
            </label>
            <label for="sokak">
              <span class="text-gray-600 dark:text-gray-300">Street</span>
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="sokak"
              />
            </label>
            <label for="konum">
              <span class="text-gray-600 dark:text-gray-300">Location</span>
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="konum"
              />
            </label>
            <label for="temas_kisi">
              <span class="text-gray-600 dark:text-gray-300"
                >Contact Person</span
              >
              <input
                class="input input-bordered border-2	w-full"
                type="text"
                name="temas_kisi"
              />
            </label>
            <label for="saglik">
              <span class="text-gray-600 dark:text-gray-300">Health</span>
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="saglik"
              />
            </label>
            <label for="gida_hijyen">
              <span class="text-gray-600 dark:text-gray-300"
                >Food and Hygene</span
              >
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="gida_hijyen"
              />
            </label>
            <label for="yakacak">
              <span class="text-gray-600 dark:text-gray-300">Fuel</span>
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="yakacak"
              />
            </label>
            <label for="barinma">
              <span class="text-gray-600 dark:text-gray-300">Shelter</span>
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="barinma"
              />
            </label>
            <label for="hukuksal">
              <span class="text-gray-600 dark:text-gray-300">Legality</span>
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="hukuksal"
              />
            </label>
            <label for="psikolojik">
              <span class="text-gray-600 dark:text-gray-300">Psychology</span>
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="psikolojik"
              />
            </label>
            <label for="esya">
              <span class="text-gray-600 dark:text-gray-300"
                >Furniture stuff</span
              >
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="esya"
              />
            </label>
            <label for="note">
              <span class="text-gray-600 dark:text-gray-300">Note</span>
              <textarea
                class="textarea textarea-bordered border-2 w-full"
                name="note"
              />
            </label>

            <button
              class="btn btn-outline btn-lg dark:bg-gray-600"
              type="submit">Submit</button
            >
          </form>
        </div>
      </div>
    {/if}

    <div
      class="grid grid-cols-1 grid-flow-row gap-3 md:grid md:grid-rows-2 md:grid-cols-4 md:gap-5 items-baseline mb-6"
    >
      <label class="font-semibold">
        <input
          placeholder="Search name"
          class="input input-bordered w-full"
          bind:value={$Search.isim}
        />
      </label>
      <label class="font-semibold">
        <!-- <input
					placeholder="İl ara"
					class="input input-bordered w-full"
					bind:value={$Search.il} /> -->
        <select
          bind:value={$Search.il}
          on:change={handleSehirChange}
          class="select select-bordered w-full"
        >
          <option selected value="">Search city</option>
          {#each sehirler as sehir}
            <option value={sehir.name}>{sehir.name}</option>
          {/each}
          <!-- <option value="hatay">Hatay</option>
					<option value="malatya">Malatya</option>
					<option value="maraş">Maraş</option> -->
        </select>
      </label>

      <label class="font-semibold">
        <!-- <input
					placeholder="İlçe ara"
					class="input input-bordered w-full"
					bind:value={$Search.ilce} /> -->

        <select
          bind:value={$Search.ilce}
          on:change={handleIlceChange}
          class="select select-bordered w-full"
        >
          <option selected value={null}>Town</option>
          {#if il}
            {#each sehirler.find((c) => c.name === il).ilceler as ilce}
              <option value={ilce?.name ?? ""}>{ilce?.name ?? ""}</option>
            {/each}
          {/if}

          <!-- <option value="hatay">Hatay</option>
						<option value="malatya">Malatya</option>
						<option value="maraş">Maraş</option> -->
        </select>
      </label>
      <label class="font-semibold">
        <input
          placeholder="Neighborhood"
          class="input input-bordered w-full"
          bind:value={$Search.mahalle}
        /></label
      >
      <label class="font-semibold"
        ><input
          placeholder="Contact person"
          class="input input-bordered w-full"
          bind:value={$Search.temas_kisi}
        /></label
      >
      <label class="font-semibold">
        <input
          placeholder="Health"
          class="input input-bordered w-full"
          bind:value={$Search.saglik}
        /></label
      >
      <label class="font-semibold">
        <input
          placeholder="Legality"
          class="input input-bordered w-full"
          bind:value={$Search.hukuksal}
        /></label
      >
      <label class="font-semibold">
        <input
          placeholder="Psychology"
          class="input input-bordered w-full"
          bind:value={$Search.psikolojik}
        />
      </label>
    </div>
    <YardimlarTable {results} {islemDate} />
  </div>

  <div class="px-5 mt-20" id="aktiviteler">
    <!-- The button to open modal -->
    <!-- <label for="yeni-aktivite" class="btn btn-primary btn-lg my-8">
			<div class="text-2xl">yeni</div>
			<div class="ml-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40px"
					height="40px"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M9 12H15"
						stroke="#fff"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 9L12 15"
						stroke="#fff"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
						stroke="#fff"
						stroke-width="2"
					/>
				</svg>
			</div>
		</label> -->
    <!-- Put this part before </body> tag -->
    <input
      type="checkbox"
      id="yeni-aktivite"
      class="modal-toggle"
      bind:checked={acToggle}
    />
    {#if acToggle}
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box relative">
          <label
            for="yeni-aktivite"
            class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
          >
          <div>
            <p class="text-gray-600 dark:text-gray-300 text-xl">
              Yeni İşlem ekle
            </p>

            <form
              class="flex flex-col gap-8 mt-10"
              method="POST"
              action="?/createActivite"
              use:enhance={({ form }) => {
                return async ({ result, update }) => {
                  if (result.type === "success") {
                    acToggle = !acToggle;
                    await form.reset();
                    await toast.success("Eklendi");
                    await update();
                  }
                  if (result?.data?.errors?.kisi) {
                    toast.error("kişi eklemek zorunlu");
                  }
                  if (result?.data?.errors?.islemkisi) {
                    toast.error("işlemi yapan kişi eklemek zorunlu");
                  }
                };
              }}
            >
              <label for="kisi_id" class="block">
                <span class="text-gray-600 dark:text-gray-300">Kişi</span>
                <select class="select select-bordered w-full" name="kisi_id">
                  <option disabled selected />
                  {#each help as y}
                    <option value={y.id}>{y.isim}</option>
                  {/each}
                </select>
              </label>
              <label for="islemi_yapan" class="block">
                <span class="text-gray-600 dark:text-gray-300"
                  >İşlemi Yapan</span
                >
                <input
                  class="input input-bordered border-2 font-medium w-full"
                  type="text"
                  name="islemi_yapan"
                />
              </label>
              <label for="islem_aciklamasi">
                <span class="text-gray-600 dark:text-gray-300"
                  >İşlem Açıklaması</span
                >
                <input
                  class="input input-bordered border-2 font-medium w-full"
                  type="text"
                  name="islem_aciklamasi"
                />
              </label>
              <Flat />

              <button
                class="btn btn-outline btn-lg dark:bg-gray-600"
                type="submit">Gönder</button
              >
            </form>
          </div>
        </div>
      </div>
    {/if}

    <!-- <ActivitiesTable {activities} /> -->
  </div>
  <Toaster />
</div>

<style style="postcss">
  .modal-box {
    @apply w-11/12;
    @apply max-w-5xl;
  }
</style>
