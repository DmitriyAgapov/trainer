import React from "react";
import {gql, useMutation} from 'urql';
import {useForm} from 'react-hook-form';
// @ts-ignore
const Select = React.forwardRef(({onChange, onBlur, name, label, children}, ref) => (
	<>
		<select name={name}
			// @ts-ignore
		        ref={ref} onChange={onChange} onBlur={onBlur}>
			{children}
		</select>
	</>
));
export default function FormReg() {
	const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm();
	const [{error, data}, signup] = useMutation(gql`
		mutation($name: String , $email: String, $phone: String) {
		  createCallback(data: { name: $name, email: $email, phone: $phone}) {
		    name
		    email		   
		    publishedDate
		    message
		 }
		}
  `);
	const onSubmit = (data) => {
		const { name, email, phone, promocode} = data

		signup({name, email, phone}).then(result => {
			if (result.data?.createCallback) {
				// FIXME: there's a cache issue with Urql where it's not reloading the
				// current user properly if we do a client-side redirect here.
				// router.push('/');
				// console.log('Success ')
				// top.location.href = '/';
			}
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{!isSubmitSuccessful ? (<>
				<div style={{position: 'relative'}}>
					{errors.email ?
						<span style={{position: 'absolute', color: 'red', top: '-1.125rem', fontSize: '.75rem'}}>Input name</span> : null}
					<input type="text" placeholder="Name" {...register("name", {required: true, maxLength: 80})} />
				</div>

				<div style={{position: 'relative'}}>
					{errors.email ?
						<span style={{position: 'absolute', color: 'red', top: '-1.125rem', fontSize: '.75rem'}}>Input correct email</span> : null}
					<input type="text" placeholder="Email" {...register("email", {
						required: true,
						pattern: /^\S+@\S+$/i
					})} />
				</div>
				<div style={{position: 'relative'}}>
					{errors.phone ?
						<span style={{position: 'absolute', color: 'red', top: '-1.125rem', fontSize: '.75rem'}}>Input correct phone number</span> : null}
					<input type="tel" placeholder="Phone number" {...register("phone", {
						required: true,
						maxLength: 12
					})} />
				</div>
				<div style={{position: 'relative'}}>
					{errors.email ?
						<span style={{position: 'absolute', color: 'red', top: '-1.125rem', fontSize: '.75rem'}}>Input name</span> : null}
					<input type="text" placeholder="Promocode" {...register("promocode", {required: true, maxLength: 80})} />
				</div>
				<div style={{color: 'whitesmoke'}}>
					<p>By clicking the button you agree our <a href={'#'}> Privacy Policy</a> and <a href={'#'}>Terms and Conditions</a></p>
				</div>

				<input type="submit" className={'button button-primary'} value={'Submit'}/>
			</>) : <>
				<div className={'section__form-result'}>Success</div>

			</>}

			{/*{isSubmitSuccessful ? (<input type="button" onClick={() => {*/}
			{/*	reset({*/}
			{/*		email: '',*/}
			{/*		phone: '',*/}
			{/*		message: ''*/}
			{/*	}, {*/}
			{/*		keepErrors: true,*/}
			{/*		keepDirty: true,*/}
			{/*		keepIsSubmitted: false,*/}
			{/*		keepTouched: false,*/}
			{/*		keepIsValid: false,*/}
			{/*		keepSubmitCount: false,*/}
			{/*	});*/}
			{/*}} className={'button button-outline'} value={'Send one more '}/>) : null}*/}
		</form>
	)
}
