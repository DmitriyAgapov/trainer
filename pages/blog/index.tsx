import { InferGetStaticPropsType } from "next";
import {query} from '.keystone/api';
import Head from "next/head";
import React from "react";
import Blog, { BlogItem } from "../../components/sections/Blog";



type Post = {
	id: string;
	title: string;
	slug: string;
};

export default function HomePage({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
// export default function BlogPage({posts}: InferGetServerSidePropsType<typeof getServerSideProps>) {

	return (
		<>
			<Head>
				<title>Blog</title>
			</Head>

			<section className={'page page__blog'}>
				<div className={'block'}>
					<h1>Blog</h1>
					<div className={'page__items'}>
						{(posts && posts.length > 0 ? <div className={'section__items'}>
							{posts.map(item =>
								<BlogItem props={item} key={item.id} />					)
							}
						</div> : null)
						}
					</div>
				</div>

			</section>
			<Blog props={posts}/>{/*Blog*/}
		</>
	);

}


// export async function getServerSideProps() {
export async function getStaticProps() {
	// const priceItems = await query.Price.findMany({query: 'id order title content { document } fullContent { document } price links { id linkText link linkType }'}) as [];
	const stories = await query.Story.findMany({query: 'id order title slug image { url width height } content { document } '}) as [];
	const posts = await query.Post.findMany({query: 'id title slug content { document} date tag { title } author { name } image { url width height }'}) as Post[];

	let page = {
		type: 'story',
		dots: [
			{
				id: 'intro',
				link: 'intro',
			}
		]
	}
	return {
		props: {
			stories,
			posts,
			page,


		}
	};
}