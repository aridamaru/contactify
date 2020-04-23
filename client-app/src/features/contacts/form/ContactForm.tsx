import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IContact } from '../../../app/models/contact';
import { v4 as uuid } from 'uuid';
import ContactStore from '../../../app/stores/contactStore';
import { observer } from 'mobx-react-lite';

interface IProps {
	contact: IContact;
}

const ContactForm: React.FC<IProps> = ({ contact: initialFormState }) => {
	const contactStore = useContext(ContactStore);
	const {
		createContact,
		editContact,
		submitting,
		cancelFormOpen,
	} = contactStore;
	const initializeForm = () => {
		if (initialFormState) {
			return initialFormState;
		} else {
			return {
				id: '',
				name: '',
				lastName: '',
				email: '',
				phoneNumber: '',
			};
		}
	};

	const [contact, setContact] = useState<IContact>(initializeForm);

	const handleSubmit = () => {
		if (contact.id.length === 0) {
			let newContact = {
				...contact,
				id: uuid(),
			};
			createContact(newContact);
		} else {
			editContact(contact);
		}
	};
	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setContact({ ...contact, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='name'
					placeholder='Name'
					value={contact.name}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='lastName'
					placeholder='Last Name'
					value={contact.lastName}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='email'
					type='email'
					placeholder='Email'
					value={contact.email}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='phoneNumber'
					placeholder='Phone Number'
					value={contact.phoneNumber}
				/>
				<Button
					loading={submitting}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={cancelFormOpen}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};
export default observer(ContactForm);
