<script lang="ts">
  import { onMount } from "svelte";

  export let results;
  export let islemDate;

  // console.log('component', islemDate);

  // islemDate.forEach((element) => console.log(element));

  // const formatDate = (x) => {
  // 	const formattedDate = new Date(x);
  // 	return formattedDate.toLocaleDateString();
  // };

  let root: HTMLBodyElement;
  // let modalEl;
  onMount(async () => {
    // if (modalEl.hasChildNodes()) {
    // 	console.log(modalEl);
    // }
    // const nd = root.querySelectorAll('.modal-govde');
    // console.log(nd);
    // [...nd].forEach((nodeEl) => {
    // 	if (nodeEl.querySelector('#tarihcek') == null) {
    // 		const parentEl = nodeEl?.parentElement?.parentElement;
    // 		const prevS = parentEl?.previousElementSibling?.previousElementSibling;
    // 		prevS?.remove();
    // 		parentEl?.previousElementSibling?.remove();
    // 		parentEl?.remove();
    // 	}
    // });
  });
</script>

<div class="overflow-x-auto">
  <table class="table table-zebra w-full" bind:this={root}>
    <!-- head -->
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Phone</th>
        <th>City</th>
        <th>Town</th>
        <th>Neighborhood</th>
        <th>Street</th>
        <th>Location</th>
        <th>Contact Person</th>
        <th>Health</th>
        <th>Food and Hygene</th>
        <th>Fuel</th>
        <th>Shelter</th>
        <th>Legality</th>
        <th>Psychology</th>
        <th>Furniture</th>
        <th>Note</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {#each results as yardim}
        <tr class="hover">
          <th>{yardim.id}</th>
          <td>{yardim.isim}</td>
          <td>{yardim.telefon ?? ""}</td>
          <td>{yardim.il ?? ""}</td>
          <td>{yardim.ilce ?? ""}</td>
          <td>{yardim.mahalle ?? ""}</td>
          <td>{yardim.sokak ?? ""}</td>
          <td>{yardim.konum ?? ""}</td>
          <td>{yardim.temas_kisi ?? ""}</td>
          <td>{yardim.saglik ?? ""}</td>
          <td>{yardim.gida_hijyen ?? ""}</td>
          <td>{yardim.yakacak ?? ""}</td>
          <td>{yardim.barinma ?? ""}</td>
          <td>{yardim.hukuksal ?? ""}</td>
          <td>{yardim.psikolojik ?? ""}</td>
          <td>{yardim.esya ?? ""}</td>
          <td>{yardim.note ?? ""}</td>
          <th>
            <a href="panel/islem/{yardim.id}" class="btn btn-sm"
              >Visit history</a
            >
            <!-- <label id="modal-button" for="my-modal-{yardim.id}" class="btn btn-sm"
							>İşlem Geçmişi</label
						> -->
            <!-- <input type="checkbox" id="my-modal-{yardim.id}" class="modal-toggle" />
						<div class="modal modal-bottom sm:modal-middle">
							<div class="modal-box">
								<h2 class=" text-3xl mb-6">İşlem Geçmişi</h2>
								<ol bind:this={modalEl} class="modal-govde list-decimal pl-5"> -->
            <!-- loop -->
            <!-- {#each islemDate as iDate (iDate.id)} -->
            <!-- yardımlar arrayinin içindeyken
								activities tablosununun kisi_id, islemi_yapan, tarih sütunlarıyla
								arrayi(islemDate) çağırdım -->

            <!-- {#if iDate.kisi_id === yardim.id}
											<li class=" text-lg" id="tarihcek">
												{iDate.islemi_yapan}: {formatDate(iDate.tarih)}
											</li>
											<hr class="mb-4 dark:border-gray-600" /> -->
            <!-- The button to open modal -->

            <!-- Put this part before </body> tag -->
            <!-- {/if}
									{/each} -->
            <!-- </ol>
								<div class="modal-action">
									<label for="my-modal-{yardim.id}" class="btn">Kapat</label>
								</div> -->
            <!-- </div> -->
            <!-- </div> -->
          </th>
          <th>
            <a href="/panel/{yardim.id}" class="btn btn-accent btn-sm">Update</a
            >
          </th>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style style="postcss">
  .table th:last-child {
    position: sticky;
    position: -webkit-sticky;
    right: 0px;
    z-index: 11;
  }
  .table th:nth-last-child(2) {
    position: sticky;
    position: -webkit-sticky;
    right: 0px;
    z-index: 12;
  }
</style>
