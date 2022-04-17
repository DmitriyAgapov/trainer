import {InferGetServerSidePropsType} from "next";
import {query} from '.keystone/api';
import Head from "next/head";
import React from "react";

import StoryItem from "../../components/StoryItem";

type Post = {
	id: string;
	title: string;
	slug: string;
};


export default function Stories({posts, stories, page}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>Stories</title>
			</Head>
			<section className={'page page__stories'}>
				<div className={'block'}>
				<h1>Stories</h1>
				<div className={'page__items'}>
					{stories.map((item, index) =>
						<StoryItem props={item} key={item[index]}/>
					)
					}
				</div>
				</div>
				{/*<SectionStory props={stories[1]} />/!*story*!/*/}

			</section>
			{/*<Blog props={posts}/>/!*Blog*!/*/}
		</>
	);

}


export async function getServerSideProps() {

	const stories = await query.Story.findMany({query: 'id order title slug image { url width height } content { document } '}) as [];
	const posts = await query.Post.findMany({query: 'id title slug content { document} date tag { title } author { name } image { url width height }'}) as Post[];
	let page = 'story'
	return {
		props: {
			stories,
			posts,
			page

		}
	};
}