<template>
	<div class="d-flex justify-content-between">
		<p>
			Showing {{ pagination.from }} to {{ pagination.to }} of
			{{ pagination.total }} entries
		</p>
		<ul class="pagination">
			<li class="page-item" :class="{ disabled: pagination.current_page <= 1 }">
				<a class="page-link" @click.prevent="changePage(1)">First</a>
			</li>
			<li class="page-item" :class="{ disabled: pagination.current_page <= 1 }">
				<a class="page-link" @click.prevent="changePage(pagination.current_page - 1)">Previous</a>
			</li>

			<li class="page-item" v-for="page in pages" :key="page" :class="isCurrentPage(page) ? 'active' : ''">
				<a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
			</li>

			<li class="page-item" :class="{ disabled: pagination.current_page >= pagination.last_page }">
				<a class="page-link" @click.prevent="changePage(pagination.current_page + 1)">Next</a>
			</li>
			<li class="page-item" :class="{ disabled: pagination.current_page >= pagination.last_page}">
				<a class="page-link" @click.prevent="changePage(pagination.last_page)">Last </a>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: ["pagination", "offset", "params"],
		methods: {
			isCurrentPage(page) {
				return this.pagination.current_page === page;
			},
			changePage(page) {
				if (page > this.pagination.last_page) {
					page = this.pagination.last_page;
				}
				this.params.current_page = page;
			},
		},
		computed: {
			pages() {
				let pages = [];
				let from = this.pagination.current_page - Math.floor(this.offset / 2);
				if (from < 1) {
					from = 1;
				}
				let to = from + this.offset - 1;
				if (to > this.pagination.last_page) {
					to = this.pagination.last_page;
				}
				while (from <= to) {
					pages.push(from);
					from++;
				}
				return pages;
			},
		},
	};
</script>
