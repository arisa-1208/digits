'use server';

import { Contact } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new contact in the database.
 * @param contact the contact with the following properties: firstName, lastName, address, image, description, owner.
 */
export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}) {
  await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });
  redirect('/list');
}

/**
 * Edits an existing contact in the database.
 * @param contact the contact object with updated fields.
 */
export async function editContact(contact: Contact) {
  await prisma.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });
  redirect('/list');
}

/**
 * Adds a note to an existing contact.
 * @param note an object with the note content, owner, and contactId.
 */
export async function addNote(note: { note: string; owner: string; contactId: number }) {
  await prisma.note.create({
    data: {
      note: note.note,
      owner: note.owner,
      contactId: note.contactId,
    },
  });
}

/**
 * Creates a new user in the database.
 * @param credentials an object with email and password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials an object with email and new password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
