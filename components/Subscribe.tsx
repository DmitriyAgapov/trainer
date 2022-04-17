import React from 'react';
import Image from "next/image";
import Button from "./Button";
import FormSubscribe from "./FormSubscribe";

const Subscribe = (props) => {
	return (
		<section className={`section section-subscribe`}>
			<div className={'section__background'}>
				<Image
					className={'section__background__image'}
					alt="background"
					src={'/images/backgrounds/subscribe.jpg'}
					layout={"fill"}
					objectFit={"cover"}
					quality={80}
				/></div>
			<div className={'block'}>
				<h2 className={'section__title'}>Subscribe to <span>newsletter</span> </h2>
				<div className={'section__links'}>
					<FormSubscribe />

				</div>
			</div>
		</section>
	)
};

export default Subscribe;