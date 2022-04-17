import Icon from "./Icon";
import {DocumentRenderer} from "@keystone-6/document-renderer";
import React, {useEffect, useMemo, useRef, useState} from "react";

import Image from 'next/image'

const StoryItem = ({props}) => {
	// console.log(props.links)
	return (
		<div className={'section__item'} key={props.id}>
			<div className={'section__item_text'}>
				<div className={'section__item_header'}>
					<h3 className={'section__item_title'}>{props.title}</h3>
				</div>
				{props.content ?
					<div className={'section__item_content'}>
						<DocumentRenderer document={props.content.document}/>
					</div> : null }

			</div>
			{props.slug ?
				<div className={'section__item_links'}>
					<div className={'link__wrapper'}>
						<a key={props.id} href={`story/${props.slug}`} className={'button button-primary'}>Read full story</a>
					</div>
				</div>
				: null }
			{props.content ?
				<div className={'section__item_image'}>
					<Image src={props.image.url}  layout={"fill"}
					       // width={props.image.width}
					       // height={props.image.height}
					       objectPosition={'center'} objectFit={"cover"}/>
				</div> : null }



		</div>

	)
}
export default StoryItem;