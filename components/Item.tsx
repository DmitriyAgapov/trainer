import Icon from "./Icon";
import {DocumentRenderer} from "@keystone-6/document-renderer";
import React, {useEffect, useMemo, useRef, useState} from "react";


const Item = ({props, collapsable}) => {
	collapsable = collapsable || false;

	const [open, setOpen] = useState(collapsable);
	const [height, setHeight] = useState(0)
	const ref = useRef(null)


	useEffect(() => {
		setHeight(ref.current.clientHeight)
	}, []);

	function Open() {
		collapsable ? setOpen(prevState => prevState ? false : true) : null
	}

	return (
		<div className={'section__item'} key={props.id}>
			{(props.imageSvg?.url) ? <Icon props={props.imageSvg}/> : null}
			<div className={`section__item_accordition`} data-open={open}>
				<div className={'section__item_header'} onClick={() => Open()}>
					<h3 className={'section__item_title'}>{props.title}</h3>
					{collapsable ? <div className={'section__item_trigger'}/> : null}
				</div>
				{props.content ?
				<div className={'section__item_content'} ref={ref}>
					<DocumentRenderer document={props.content.document}/>
				</div> : null}

			</div>
		</div>
	)
}
export default Item;