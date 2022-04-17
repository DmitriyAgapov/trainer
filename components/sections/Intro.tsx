import React, {useEffect, useState} from 'react';
import Image from "next/image";
import introImg from "../../assets/images/backgrounds/intro.jpg";
import woman from "../../assets/images/backgrounds/woman.png";
import Social from "../Social";
import { useInView } from 'react-hook-inview'
import {useWindowSize} from "../../utils";
import { useInViewEffect } from 'react-hook-inview'

const Intro = () => {
	const width = useWindowSize()
	// const [isVisible, setIsVisible] = useState(false)

	// const ref = useInViewEffect(
	// 	([entry], observer) => {
	// 		// if (entry.isIntersecting) {
	// 		// 	observer.unobserve(entry.target)
	// 		// 	console.log(isVisible)
	// 		// } else {
	// 		// 	observer.observe(entry.target)
	// 		// }
	// 		setIsVisible(entry.isIntersecting)
	//
	// 	},
	//
	// 	{ threshold: 0.5 },
	// )
	// useEffect(() => {
	// 	console.log(isVisible)
	// }, [isVisible])
	return (
		// <>
		// 	{isVisible ? <div style={{position: "fixed", zIndex: 999, width: '400px', height: '400px', background: 'red'}}></div> : null}
		<section className={'section section-intro'} id={'intro'}
		         // ref={ref}
		>
			{(width.width > 767) ?	<Social />:null}

			<div className={'section__background'}>
				<Image
					className={'section__background__image'}
					alt="background"
					src={introImg}
					layout={"fill"}
					objectFit={"cover"}
					quality={70}
					objectPosition={'bottom'}
					priority={true}
				/>
			</div>

			<div className={'section__image'}>
				<Image
					className={'section__image-woman'}
					alt="woman"
					src={woman}
					sizes={'16w'}
					layout={"fill"}
					objectFit={width.width > 1023 ? "contain" : "cover"}
					quality={100}
					objectPosition={'bottom'}
					priority={true}
				/>
			</div>

			<h1 className={'section__title'}>Easy<span> Workout</span></h1>

			<div className={'block'}>
				<div className={'section__subtitle'}>The healthy way to get in shape</div>
				<div className={'section__content'}>
					<p>This course is ideal for people with no restrictions on physical exertion and any level of fitness. It will help you achieve your goals in a safe, healthy way!</p>
				</div>
				<div className={'section__links'}>
					<a href={'#pricing'} className={'button button-primary'}>Let’s start!</a>
				</div>

			</div>

		</section>
		// </>
	);
};

export default Intro;