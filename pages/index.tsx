import {InferGetServerSidePropsType, InferGetStaticPropsType} from 'next';
import React from 'react';
// eslint-disable-next-line import/no-unresolved

import { query } from '.keystone/api';
import { Lists } from '.keystone/types';
import intro from '../assets/images/backgrounds/intro.jpg';
import Intro from "../components/sections/Intro";
import Section from '../components/Section';
import {Element} from 'react-scroll'
import Blog from "../components/sections/Blog";
import Gallery from "../components/sections/Gallery";
import BasicModal from "../components/Portal";
import Subscribe from "../components/Subscribe";

type Post = {
	id: string;
	title: string;
	slug: string;
};


type Section = {
	id: string;
	subtitle: string;
	title: string;
	type: string;
	url: string;
	image: object;
	items:[];
	background?: object;
	video?: object;
	content?: object;
	pricing?:  any;
	collapsable: any;
	page?: object;
	contacts?: any;
};
function order(field) {
	return (a, b) => a[field] > b[field] ? 1 : -1;
}


// export default function HomePage({posts, sections, galItems}: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function HomePage({posts, sections, galItems, priceItems}: InferGetStaticPropsType<typeof getStaticProps>) {

	return (
		<>
				<Intro />
				{sections.map((section, index) => (
					index < 8 ? <Element name={section.type}  className="element" key={section.id} id={section.type}>
						<Section props={section} collapsable={section.type == 'contacts' || section.type == 'faq' ? true : false} pricing={section.type == 'contacts' ? sections[5].items : undefined} />
					</Element> : null
				))}
				<Subscribe />
				<Element name={sections[8].type} className="element">
					<Gallery props={galItems} />{/*faq*/}
				</Element>
				<Element name="blog" className="element" id={'blog'}>
					<Blog props={posts}/>{/*Blog*/}
				</Element>
				{sections.map((section, index) => (
					index > 7 ? <Element name={section.type} className="element" key={section.id} id={section.type}>
						<Section props={section} collapsable={section.type == 'contacts' || section.type == 'faq' ? true : false} pricing={section.type == 'contacts' ? sections[5].items : undefined} />
					</Element> : null
				))}
				{/*<Element name="why" className="element" id={'why'}>*/}
				{/*	<Section props={sections[0]} collapsable={false} pricing={undefined} />*/}
				{/*</Element>*/}
				{/*<Element name={sections[1].type} className="element">*/}
				{/*	<Section props={sections[1]} collapsable={false} pricing={undefined}/>*/}
				{/*</Element>*/}
				{/*<Element name={sections[2].type} className="element">*/}
				{/*	<Section props={sections[2]} collapsable={false} pricing={undefined}/>*/}
				{/*</Element>*/}
				{/*/!*<Section props={sections[3]} collapsable={true}/>*!/*/}
				{/*<Element name={sections[4].type} className="element">*/}
				{/*	<Section props={sections[4]} collapsable={false} pricing={undefined}/>*/}
				{/*</Element>*/}
				{/*<Element name={sections[5].type} className="element">*/}
				{/*	<Section props={sections[5]} collapsable={false} pricing={undefined}/>*/}
				{/*</Element>*/}
				{/*<Element name={sections[6].type} className="element">*/}
				{/*	<Section props={sections[6]} collapsable={false} pricing={undefined}/>/!*Pricing*!/*/}
				{/*</Element>*/}
				{/*<Element name={sections[7].type} className="element">*/}
				{/*	<SectionStory props={sections[7]} />/!*story*!/*/}
				{/*</Element>*/}
				{/*<Subscribe />*/}
				{/*<Element name={sections[8].type} className="element">*/}
				{/*	<Section props={sections[8]} collapsable={true} pricing={undefined}/>/!*faq*!/*/}
				{/*</Element>*/}
				{/*<Element name={sections[8].type} className="element">*/}
				{/*	<Gallery props={galItems} />/!*faq*!/*/}
				{/*</Element>*/}
				{/*<Element name="blog" className="element" id={'blog'}>*/}
				{/*	<Blog props={posts}/>/!*Blog*!/*/}
				{/*</Element>*/}
				{/*<Element name={sections[9].type} className="element">*/}
				{/*	<Section props={sections[9]} pricing={sections[5].items} collapsable={true}/>/!*faq*!/*/}
				{/*</Element>*/}
	
		</>
	);
}

export async function getStaticProps() {
	const posts = await query.Post.findMany({query: 'id title slug content { document} date tag { title } author { name } image { url width height }'}) as Post[];
	const sections = await query.Section.findMany({query: 'id type order subtitle title  video {filename url} url image { url width height } background { url } video { url } content { document } linkText link linkType', where: { status: {equals: "published"}} }) as Section[];
	const structureItems = await query.CourseStructure.findMany({query: 'id order title image { url width height } imageSvg { url filename }  content { document } '}) as [];
	const featuresItems = await query.CourseFeature.findMany({query: 'id order title image { url width height } imageSvg { url filename }  content { document } '}) as [];
	const benefitsItems = await query.CourseBenefit.findMany({query: 'id order title image { url width height } imageSvg { url filename }  content { document } '}) as [];
	const priceItems = await query.Price.findMany({query: 'id order title content { document } fullContent { document } price links { id linkText link linkType }'}) as [];
	const storiesItems = await query.Story.findMany({query: 'id order title slug image { url width height } content { document } '}) as [];
	const faqItems = await query.Faq.findMany({query: 'id order title content { document } '}) as [];
	const galItems = await query.Gallery.findMany({query: 'id title image { url id width height }  '}) as [];
	const userContacts = await query.User.findMany({query: ' address phone instagram facebook linkedin emailContacts ', where: { role: { canManageUsers: { equals: true } } }}) as [];

	structureItems.sort(order('order'));
	featuresItems.sort(order('order'));
	benefitsItems.sort(order('order'));
	priceItems.sort(order('order'));
	let page = {
		type: 'index',
		dots: [
			{
				id: 'intro',
				link: 'intro',
			}
		]
	}

	// console.log(sections[9].contacts)
	sections.forEach(function (value, index, array) {
		if (value.type == 'structure') {
			structureItems ? value.items = structureItems : null;
		} else if (value.type == 'features') {
			featuresItems ? value.items = featuresItems : null;
		} else if (value.type == 'benefits') {
			benefitsItems ? value.items = benefitsItems : null;
		} else if (value.type == 'pricing') {
			priceItems ? value.items = priceItems : null;
		} else if (value.type == 'stories') {
			storiesItems ? value.items = storiesItems : null;
		} else if (value.type == 'faq') {
			faqItems ? value.items = faqItems : null;
		}
		 else if (value.type == 'contacts') {
			userContacts ? value.contacts = userContacts : null;
		}

	})

	sections.sort(order('order'));
	sections.map(item => {
		page.dots.push({
			id: item.id,
			link: item.type,
		})
	})
	return {
		props: {
			posts,
			sections,
			galItems,
			page,
			priceItems

		}
	};
}