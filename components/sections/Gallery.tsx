import React from 'react';
import Image from 'next/image'
import {SRLWrapper} from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox'

const Gallery = ({props}) => {

	props.background = {
		url: '/images/backgrounds/gallery@2x.jpg'
	}

	return (
		<React.StrictMode>
			<SimpleReactLightbox>
				<section className={'section section-gallery'} id={'gallery'}>
					{(props.background ? <div className={'section__background'}>
						<Image
							className={'section__background__image'}
							alt="background"
							src={props.background.url}
							layout={"fill"}
							objectFit={"cover"}
							quality={50}

						/></div> : null)
					}
					<div className={'block'}>
						<div className={'block__text'}>
							<div className={'section__subtitle'}>Gallery</div>
							<h2 className={'section__title'}>Our Photos & Videos</h2>
							<div className={'section__content'}>
								We save your successes and are happy to share them with others. See what our participants were able to achieve!
							</div>
						</div>


						{/*{(props.link && props.linkType && props.linkText ? <div className={'section__links'}>*/}
						{/*	<a href={props.link} className={props.linkType}>{props.linkText}</a>*/}
						{/*</div> : null)*/}
						{/*}*/}
						{(props && props.length > 0 ? <div className={'section__items'}>
							<SRLWrapper>
								{props.map(item =>
									<a href={item.image.url} className={'gallery__image'} key={item.id}>
										<div className={'overlay'}>
											<Image
												src={item.image.url}
												alt="Picture of the author"
												layout={"responsive"}
												width={item.image.width}
												height={item.image.height}
												objectFit={'cover'}
												// @ts-ignore
												srl_gallery_image="true"
											/>
										</div>

									</a>
								)
								}
							</SRLWrapper></div> : null)
						}
					</div>

				</section>
			</SimpleReactLightbox>
		</React.StrictMode>
	);
};

export default Gallery;