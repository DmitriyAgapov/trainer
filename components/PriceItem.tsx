import Icon from "./Icon";
import {DocumentRenderer} from "@keystone-6/document-renderer";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Button from "./Button";
import BasicModal from "./Portal";

const PriceItem = ({props}) => {
	// console.log(props.links)
	return (
		<div className={'section__item'} key={props.id}>
			<div className={'section__item_header'}>
				<h3 className={'section__item_title'}>{props.title}</h3>
			</div>
			{props.content ?
				<div className={'section__item_content'}>
					<DocumentRenderer document={props.content.document}/>
				</div> : null }
			{props.price ?
				<div className={'section__item_price'}>
					<span>$</span>{props.price}
				</div> : null }
			{props.links ?
			<div className={'section__item_links'}>
				<BasicModal props={props.links} items={props}/>
			</div>
				: null }
		</div>

	)
}
export default PriceItem;