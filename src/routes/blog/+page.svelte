<div class="blog-page">
	<h1 class="section-title">Latest Blog Posts</h1>
	<div class="card-grid">
		<!-- Example Blog Post 1 -->
		<a href="/blog/post1" class="blog-card">
			<div class="card-content">
				<h2 class="card-title">The Future of Web Components</h2>
				<p class="card-excerpt">
					An insightful look at current industry trends and how they affect
					development.
				</p>
				<span class="card-meta">Published on October 25, 2024</span>
			</div>
		</a>

		<!-- Example Blog Post 2 -->
		<a href="/blog/post2" class="blog-card">
			<div class="card-content">
				<h2 class="card-title">Tailwind CSS v4 Deep Dive</h2>
				<p class="card-excerpt">
					Explore our latest thoughts on technology, design, and coding
					practices.
				</p>
				<span class="card-meta">Published on October 20, 2024</span>
			</div>
		</a>

		<!-- Example Blog Post 3 -->
		<a href="/blog/post3" class="blog-card">
			<div class="card-content">
				<h2 class="card-title">Svelte 5 Runes: A Paradigm Shift</h2>
				<p class="card-excerpt">
					A quick summary of key learnings from recent projects and tools.
				</p>
				<span class="card-meta">Published on October 15, 2024</span>
			</div>
		</a>
	</div>
</div>

<style>
	.section-title {
		margin-bottom: 2rem;
		font-size: 2.5rem;
	}
	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}
	.blog-card {
		text-decoration: none;
		color: inherit;
		border: none;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}
	.blog-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}
	.blog-card .card-content {
		padding: 1.5rem;
		border: 1px solid var(--border-color, #e5e7eb); /* Assuming Tailwind colors/variables */
		border-radius: 0.5rem;
		background-color: white;
		display: flex;
		flex-direction: column;
	}
	.card-title {
		font-size: 1.5rem;
		margin-top: 0;
		margin-bottom: 0.75rem;
	}
	.card-excerpt {
		flex-grow: 1;
		margin-bottom: 1rem;
		line-height: 1.5;
	}
	.card-meta {
		font-size: 0.875rem;
		color: #6b7280;
	}
</style>
