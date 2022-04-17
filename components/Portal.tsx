import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SectionModal from "./SectionModal";
import {ButtonUnstyled} from "@mui/base";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -60%)',
	width: '100%',
	maxWidth: '72rem',
	maxHeight: '41rem',

	// bgcolor: 'background.paper',
	// border: '2px solid #000',
	// boxShadow: 24,
	// p: 4,
};

export default function BasicModal({items, props}) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	// console.log(props)
	return (
		<div>
			{props.map(item => <ButtonUnstyled key={item.id} href={item.link} className={item.linkType} onClick={handleOpen}>{item.linkText}</ButtonUnstyled>)}


			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<SectionModal props={items}/>
				</Box>
			</Modal>
		</div>
	);
}