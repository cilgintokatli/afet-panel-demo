<script>
	export let activities;
	const formatDate = (x) => {
		const formattedDate = new Date(x);
		return formattedDate.toLocaleDateString();
	};
</script>

<div class="overflow-x-auto">
	<table class="table table-zebra w-full">
		<!-- head -->
		<thead>
			<tr>
				<th />
				<th>Tarih</th>
				<th>Kişi</th>
				<th>İşlemi Yapan</th>
				<th>İşlem Açıklaması</th>
			</tr>
		</thead>
		<tbody>
			<!-- row 1 -->
			{#each activities as activity}
				<tr class="hover">
					<th>{activity.id}</th>
					<td>{formatDate(activity.tarih)}</td>
					<td>{activity.yardimlar?.isim}</td>
					<td>{activity.islemi_yapan}</td>
					<td>{activity.islem_aciklamasi}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
