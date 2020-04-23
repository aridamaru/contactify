import { observable, action, computed } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IContact } from '../models/contact';
import agent from '../api/agent';

class ContactStore {
	@observable contactRegistry = new Map();
	@observable contacts: IContact[] = [];
	@observable selectedContact: IContact | undefined;
	@observable loadingInitial = false;
	@observable editMode = false;
	@observable submitting = false;
	@observable target = '';

	@computed get contactsSorted() {
		return Array.from(this.contactRegistry.values());
	}

	@action loadContacts = async () => {
		this.loadingInitial = true;
		try {
			const contacts = await agent.Contacts.list();
			contacts.forEach((contact) => {
				this.contactRegistry.set(contact.id, contact);
			});
			this.loadingInitial = false;
		} catch (error) {
			console.log(error);
			this.loadingInitial = false;
		}
	};

	@action createContact = async (contact: IContact) => {
		this.submitting = true;
		try {
			await agent.Contacts.create(contact);
			this.contactRegistry.set(contact.id, contact);
			this.editMode = false;
			this.submitting = false;
		} catch (error) {
			console.log(error);
			this.submitting = false;
		}
	};

	@action editContact = async (contact: IContact) => {
		this.submitting = true;
		try {
			await agent.Contacts.update(contact);
			this.contactRegistry.set(contact.id, contact);
			this.selectedContact = contact;
			this.editMode = false;
			this.submitting = false;
		} catch (error) {
			this.submitting = false;
			console.log(error);
		}
	};

	@action deleteContact = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.Contacts.delete(id);
			this.contactRegistry.delete(id);
			this.submitting = false;
			this.target = '';
		} catch (error) {
			this.submitting = false;
			this.target = '';
			console.log(error);
		}
	};

	@action openCreateForm = () => {
		this.editMode = true;
		this.selectedContact = undefined;
	};

	@action openEditForm = (id: string) => {
		this.selectedContact = this.contactRegistry.get(id);
		this.editMode = true;
	};

	@action cancelSelectedContact = () => {
		this.selectedContact = undefined;
	};

	@action cancelFormOpen = () => {
		this.editMode = false;
	};

	@action selectContact = (id: string) => {
		this.selectedContact = this.contactRegistry.get(id);
		this.editMode = false;
	};
}

export default createContext(new ContactStore());
