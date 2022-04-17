import {InferGetServerSidePropsType, InferGetStaticPropsType} from "next";
import {query} from '.keystone/api';
import Head from "next/head";
import React from "react";
import Blog, {BlogItem} from "../../components/sections/Blog";
import { useRouter } from 'next/router'
import { request } from 'graphql-request'
import {DocumentRenderer} from "@keystone-6/document-renderer";
const fetcher = query => request('/api/graphql', query)

type Post = {
	id: string;
	title: string;
	slug: string;
};


export default function BlogPage({post, posts}: InferGetStaticPropsType<typeof getStaticProps>) {
	// console.log({post})
	const router = useRouter()
	const { slug } = router.query
	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<section className={'page page__blog'}>
				<div className={'block'}>
					<h1>{post.title}</h1>
					<div className={'section__content'}>
						<DocumentRenderer document={post.content.document}/>
					</div>

				</div>

			</section>
			<Blog props={posts}/>{/*Blog*/}
		</>
	);

}


export async function getStaticProps({params}) {
	const { slug } = params
	// console.log(slug)
	// const stories = await query.Story.findMany({query: 'id order title slug image { url width height } content { document } '}) as [];
	const posts = await query.Post.findMany({query: 'id title slug content { document} date tag { title } author { name } image { url width height }'}) as Post[];
	const post = await query.Post.findOne({
		query: 'id title slug content { document} date tag { title } author { name } image { url width height }',
		where: { slug: slug as string}});
	let page = {
		type: 'blog',
		dots: [

		]
	}
	// console.log(post)
	return {
		props: {
			post,
			page,
			posts
		}
	};
}

export async function getStaticPaths() {
	const posts = await query.Post.findMany({query: 'id title slug content { document} date tag { title } author { name } image { url width height }'}) as Post[];
	const paths = posts.map((post) => ({
		params: { slug: post.slug },
	}))
	return { paths, fallback: false }
}