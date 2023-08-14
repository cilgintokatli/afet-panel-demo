<script>
  import Flatpickr from "svelte-flatpickr";

  let fp;
  let date = null;

  const flatpickrOptions = {
    element: "#my-picker",
    altInput: true,
    wrap: true,
    altFormat: "j F, Y",
    dateFormat: "Y-m-d",
    locale: "en",

    // onClose: function (selectedDates, dateStr, instance) {
    // 	console.log('n');
    // },
    // onOpen: function () {
    // 	console.log('opened');
    // }
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    type="text/css"
    href="https://npmcdn.com/flatpickr/dist/themes/dark.css"
  />
</svelte:head>

<Flatpickr
  options={flatpickrOptions}
  bind:value={date}
  element="#my-picker"
  bind:fp
>
  <div class="mb-5 w-full md:w-1/2 ">
    <label for="tarih" class="text-gray-600 dark:text-gray-300"
      >Pick a date</label
    >
    <div class="flatpickr relative" id="my-picker">
      <input
        type="text"
        name="tarih"
        placeholder="Pick a date"
        data-input
        class="input input-bordered border-2 w-full focus:outline-none focus:shadow-outline font-medium"
      />

      <div class="absolute top-0 right-0 px-3 py-2">
        <svg
          on:click={() => {
            if (fp) {
              fp.open();
            }
          }}
          class="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0
            00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  </div>
</Flatpickr>
