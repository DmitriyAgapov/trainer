import React from "react";

const Button = ({props}) => {

	return (<a key={props.id} href={props.link} className={props.linkType}>{props.linkText}</a>)
}

export default Button