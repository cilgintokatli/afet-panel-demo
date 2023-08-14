<script lang="ts">
  import { enhance } from "$app/forms";
  import Tabs from "$lib/components/Tabs.svelte";
</script>

<svelte:head>
  <title>Afet Gönüllüleri</title>
</svelte:head>

<div class=" ">
  <div
    class="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <div
      class="w-full bg-white rounded-lg  shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form action="?/login" method="POST" class="flex flex-col gap-5 mt-5">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="email">Email: demo@demo.com</label
            >
            <input
              type="text"
              name="email"
              placeholder="demo@demo.com"
              class="input input-bordered w-full"
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="password">Password: demo</label
            >
            <input
              type="password"
              name="password"
              class="input input-bordered w-full"
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</div>

<style style="postcss">
  .modal-box {
    @apply w-11/12;
    @apply max-w-5xl;
  }
  .table th:last-child {
    position: sticky;
    position: -webkit-sticky;
    right: 0px;
    z-index: 11;
  }
</style>
