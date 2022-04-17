import dynamic from "next/dynamic";
import React from "react";

const Icon = ({props}) => {
	const Svg = require(`../public/files/${props.filename}`)

	// const DynamicComponent = dynamic(() => import(`../public/files/${props.filename}`))
	return (
		<div className={'section__item_image'}>
			<Svg />
		</div>)
}

export default Icon