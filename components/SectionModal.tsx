import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {DocumentRenderer} from '@keystone-6/document-renderer';
import Item from './Item';
import PriceItem from "./PriceItem";
import StoryItem from "./StoryItem";
import Form from "./Form";
import SectionStory from "../components/SectionStory";

import section from "./Section";
import FormSubscribe from "./FormSubscribe";
import FormReg from "./FormReg";

const img = '/images/pexels-daria-shevtsova-4117644 1.jpg'
const useToggle = (initialState) => {
	const [isToggled, setIsToggled] = useState(initialState);

	// put [setIsToggled] into the useCallback's dependencies array
	// this value never changes so the callback is not going to be ever re-created
	const toggle = React.useCallback(
		() => setIsToggled(state => !state),
		[setIsToggled],
	);

	return [isToggled, toggle];
}
const SectionModal = ({props}) => {

	const {title, video, image, background, content, fullContent, linkText, link, linkType} = props
	const [isToggled, toggle] = useToggle(false);
	return (
		<section className={`section section-modal`}>
			<div className={'section__image'}>
				<div className={'section__image-wrapper'} data-back={isToggled}>
					<Image
						className={'section__image-woman'}
						alt="woman"
						src={img}
						layout={"responsive"}
						width={360}
						height={720}
						objectFit={"cover"}
						quality={100}
						objectPosition={'top'}
					/>
					{isToggled ?
						<div className={'form-wrapper'}>
							<FormReg/>
						</div> : null}
				</div>
			</div>
			<div className={'block'}>
				<div className={'section__text'}>
					<div className={'section__subtitle'}>Selected plan</div>
					<h2 className={'section__title'}>{title}</h2>
					<div className={'section__content section__content-full'}>
						<DocumentRenderer document={fullContent.document}/>
					</div>
					<div className={'section__content'}>
						<DocumentRenderer document={content.document}/>
					</div>


					{(link && linkType && linkText ? <div className={'section__links'}>
						<a href={link} className={linkType}>{linkText}</a>
					</div> : null)
					}
				</div>
				{!isToggled ?
					<div className={'section__links'}>
						<a  onClick={toggle} className={'button button-primary'}>Jump with us!</a>
					</div>: null}
			</div>
		</section>
	);
}


export default SectionModal;