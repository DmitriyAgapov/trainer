import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {DocumentRenderer} from '@keystone-6/document-renderer';
import Item from './Item';
import PriceItem from "./PriceItem";
import StoryItem from "./StoryItem";
import Form from "./Form";
import SectionStory from "../components/SectionStory";

import section from "./Section";
import {useInViewEffect} from "react-hook-inview";
import {useRouter} from "next/router";

const Section = ({collapsable,pricing, props}) => {
	const router = useRouter()
	const [isLoading, setIsLoading ] = useState(true)
	// console.log(`Loading: ${router.isReady}`)

	const [isVisible, setIsVisible] = useState(false)

	const ref = useInViewEffect(
		([entry], observer) => {
			// if (entry.isIntersecting) {
			// 	observer.unobserve(entry.target)
			// 	// console.log(isVisible)
			// } else {
			// 	observer.observe(entry.target)
			// }
			setIsVisible(entry.isIntersecting)
		},
		{ threshold: 0.15 },
	)
	useEffect(() => {
		setIsLoading(router.isReady)
		// console.log(`Loading: ${isLoading}`)
	}, [isLoading])

	useEffect(() => {
		console.log(isVisible ? `${props.type}`: '')
	}, [isVisible])
	const {id, type, order, subtitle, title, url, contacts, video,  image, background,  content, items, linkText, link, linkType } = props
	// console.log(`${props.type} : ${video?.url}`)
	if (props.type == 'stories') {
		return <SectionStory props={props}/>
	}

	return (
		<section className={`section section-${url}`} ref={ref} data-animate={isVisible}>
			{(background ? <div className={'section__background'}>
				<Image
					className={'section__background__image'}
					alt="background"
					src={background.url}
					layout={"fill"}
					objectFit={"cover"}
					quality={50}

				/></div> : null)
			}
			{(image ? <div className={'section__image'}>
					{video?.url ?
				<div className={'section__image-wrapper'} style={{display: 'flex'}}>

						<video controls width="4096" height="2048">
							<source src="./video/pexels-mart-production-8836861-6x81JumKZumJSKT9iidB.mp4" type="video/mp4" />
						</video>


				</div> : <div className={'section__image-wrapper'}>
							<Image
							className={'section__image-woman'}
							alt="woman"
							src={image?.url}
							layout={"responsive"}
							width={image.width}
							height={image.height}
							objectFit={"cover"}
							quality={100}
							objectPosition={'top'}
						/>
						</div>}
			</div> : null)
			}
			<div className={'block'}>
				<div className={'section__text'}>
				<div className={'section__subtitle'}>{subtitle}</div>
				<h2 className={'section__title'}>{title}</h2>
				<div className={'section__content'}>
					<DocumentRenderer document={content.document}/>
				</div>
				{(link && linkType && linkText ? <div className={'section__links'}>
					<a href={link} className={linkType}>{linkText}</a>
				</div> : null)
				}
				</div>
				{(items && items.length > 0 ? <div className={'section__items'}>
					{items.map(item =>
						type == 'pricing' ? <PriceItem props={item} key={item.id} /> : type == 'stories' ? <StoryItem props={item} key={item.id} /> : <Item props={item} key={item.id} collapsable={collapsable}/>
					)
					}
				</div> : null)
				}

				{type == 'contacts' ? <div className={'section__form'}>
					<Form props={pricing}/>
				</div> : null}
				{type == 'contacts' ? <div className={'contacts'}>
					<div className={'contacts__address'}>
						<div className={'contacts__title'}>Address</div>
						<div className={'contacts__value'}>{props.contacts[0].address}</div>
					</div>
					<div className={'contacts__address'}>
						<div className={'contacts__title'}>Phone</div>
						<div className={'contacts__value'}>{props.contacts[0].phone}</div>
					</div>
					<div className={'contacts__address'}>
						<div className={'contacts__title'}>Address</div>
						<div className={'contacts__value'}>{props.contacts[0].emailContacts}</div>
					</div>
				</div> : null}
			</div>



		</section>
	);
}


export default Section;