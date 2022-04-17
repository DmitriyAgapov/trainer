import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Navigation, Pagination} from 'swiper';
import {DocumentRenderer} from '@keystone-6/document-renderer';
import StoryItem from "./StoryItem";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {useWindowSize} from "../utils";
import {useRouter} from "next/router";
import {useInView} from "react-hook-inview";

// const DynamicComponent = dynamic(() => import(`../public/files/svg/arrow-left-long-solid.svg`))

function SlidePrevButton() {
	const swiper = useSwiper();

	return (
		<a className={'button-next'} onClick={() => swiper.slideNext()}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/>
			</svg>
		</a>
	);
}

function SlideNextButton() {
	const swiper = useSwiper();

	return (
		<a className={'button-prev'} onClick={() => swiper.slidePrev()}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
				<path d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"/>
			</svg>
		</a>
	);
}

const SectionStory = ( ...props) => {

	const {background, type, image, subtitle, title, content, link, linkType, linkText, items} = props[0].props
	const width = useWindowSize()
	const router = useRouter()
	const [isLoading, setIsLoading ] = useState(true)
	const [isVisible, setIsVisible] = useState(false)
	const [ref, inView, entry, observer] = useInView({
		threshold: 0.5,
		unobserveOnEnter: true,
		onEnter: () => setIsVisible(inView),
	}, [isVisible]);

	useEffect(() => {
		setIsLoading(router.isReady)
	}, [isLoading])

	useEffect(() => {
		setIsVisible(prevState => prevState)
		// console.log(isVisible ? `${type}`: '')
	}, [isVisible])
	return (
		<section className={`section section-${type}`} ref={ref}  data-animate={inView}>
			{(background ? <div className={'section__background'}>
				<Image
					className={'section__background__image'}
					alt="background"
					src={background.url}
					layout={"fill"}
					objectFit={"cover"}
					quality={50}

				/></div> : <div className={'section__background section__background-vector'}>
				<div className={'stripe'}></div>
				<div className={'stripe'}></div>
				<div className={'stripe'}></div>
				<div className={'stripe'}></div>
				<div className={'stripe'}></div>
				<div className={'stripe'}></div>
				<div className={'stripe'}></div>
			</div>)
			}
			{(image ? <div className={'section__image'}>
				<div className={'section__image-wrapper'}>
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
				</div>
			</div> : null)
			}
			<div className={'block'}>
				<div className={'section__subtitle'}>{subtitle}</div>
				<h2 className={'section__title'}>{title}</h2>
				<div className={'section__content'}>
					<DocumentRenderer document={content.document}/>
				</div>
				{(link && linkType && linkText ? <div className={'section__links'}>
					<a href={link} className={linkType}>{linkText}</a>
				</div> : null)
				}
				{(items && items.length > 0 ? <div className={'section__items'}>
					{(width.width > 767) ? <Swiper spaceBetween={0}
					        modules={[Navigation, Pagination]}
					        navigation={{
						        prevEl: 'button-prev',
						        nextEl: 'button-next',
						        // disabledClass: 'button-disabled'
					        }}
						// pagination={{ clickable: true }}
						    slidesPerView={2}
						    // onSlideChange={() => console.log('slide change')}
						    // onSwiper={(swiper) => console.log(swiper)}
					>


						{items.map(item =>
							<SwiperSlide key={item.id}>
								<StoryItem props={item}/>
							</SwiperSlide>
						)
						}
						<SlidePrevButton/>
					<SlideNextButton/>
					</Swiper> : 		items.map(item =>

								<StoryItem props={item} key={item.id}/>

						)
					}</div> : null)
				}
			</div>
		</section>
	);
}


export default SectionStory;