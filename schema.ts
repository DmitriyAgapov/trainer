// Code copied (with some modifications) from the Keystone 6 "with-auth" example
// See.. https://github.com/keystonejs/keystone/tree/master/examples/with-auth
import {permissions, rules} from './schema/access';
import {config, graphql, list} from '@keystone-6/core';
import {document} from '@keystone-6/fields-document';
import {
	checkbox,
	password,
	relationship,
	text,
	timestamp,
	select,
	image,
	file,
	virtual,
	integer
} from '@keystone-6/core/fields';
import React from "react";


const fieldModes = {
	editSelfOrRead: ({session, item}: any) =>
		permissions.canManageUsers({session}) || session.itemId === item.id
			? 'edit'
			: 'read',
	editSelfOrHidden: ({session, item}: any) =>
		permissions.canManageUsers({session}) || session.itemId === item.id
			? 'edit'
			: 'hidden',
};
function defaultSlug({ context, inputData }: any) {
	const date = new Date();
	return `${inputData?.title
		?.trim()
		?.toLowerCase()
		?.replace(/[^\w ]+/g, '')
		?.replace(/ +/g, '-') ?? ''
	}-${date?.getFullYear() ?? ''}${date?.getMonth() + 1 ?? ''}${date?.getDate() ?? ''
	}`;
}

function defaultTimestamp() {
	return new Date().toISOString();
}
export const lists = {
	Role: list({
		access: {
			filter: {
				delete: permissions.canManageUsers,
				query: permissions.canManageUsers,
				update: permissions.canManageUsers,
			}
		},
		ui: {
			isHidden: context => !permissions.canManageUsers(context),
		},
		fields: {
			name: text(),
			canManageContent: checkbox({defaultValue: false}),
			canManageUsers: checkbox({defaultValue: false}),
			users: relationship({ref: 'User.role', many: true}),
		},
	}),
	User: list({
		access: {
			operation: {
				create: () => true,
			},
			filter: {
				query: () => true,
				update: rules.canManageUserList,
				delete: rules.canManageUserList,
			}
		},
		ui: {
			hideCreate: context => !permissions.canManageUsers(context),
			hideDelete: context => !permissions.canManageUsers(context),
			itemView: {
				defaultFieldMode: context =>
					permissions.canManageUsers(context) ? 'edit' : 'hidden',
			},
			listView: {
				defaultFieldMode: context =>
					permissions.canManageUsers(context) ? 'read' : 'hidden',
			},
		},
		fields: {
			name: text({
				ui: {
					itemView: {fieldMode: fieldModes.editSelfOrRead},
				},
			}),
			email: text({
				isIndexed: 'unique',
				validation: {
					isRequired: true,
				},
				access: {
					read: rules.canManageUser,
				},
				ui: {
					itemView: {fieldMode: fieldModes.editSelfOrHidden},
				},
			}),
			password: password({
				validation: {
					isRequired: true,
				},
				ui: {
					itemView: {fieldMode: fieldModes.editSelfOrHidden},
				},
			}),
			role: relationship({
				ref: 'Role.users',
				access: permissions.canManageUsers,
			}),
			address: text(),
			phone: text(),
			instagram: text(),
			facebook: text(),
			linkedin: text(),
			emailContacts: text(),
		}
	}),
	Callback: list({
		access: {
			item: {
				create: ({ session, context, listKey, operation, inputData }) => true,
				update: ({ session, context, listKey, operation, inputData, item }) => true,
				delete: ({ session, context, listKey, operation, item }) => true,
			},
			operation: {
				query: ({ session, context, listKey, operation }) => true,
				create: ({ session, context, listKey, operation }) => true,
				update: ({ session, context, listKey, operation }) => true,
				delete: ({ session, context, listKey, operation }) => true,
			}
		},
		fields: {
			name: text({}),
			email: text({

				validation: {
					isRequired: true,
					match: {
						regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
						explanation: 'Input valid email'
					},


				}
			}),
			phone: text({
				// validation: {
				// 	// isRequired: true,
				// 	match: {
				// 		regex: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
				// 		explanation: 'Input valid phone'
				// 	},
				// }
			}),
			publishedDate: timestamp({
				isFilterable: true,
				ui: {
					createView: {
						fieldMode: "hidden"
					},
					listView: {
						fieldMode: "read"
					}
				},
				defaultValue: {
					kind: 'now'
				}
			}),
			message: text(),
		}
	}),
	Section: list({
		fields: {
			type: select({
				type: 'string',
				options: [
					{
						label: 'Why our course',
						value: 'why'
					},
					{
						label: 'Meet author',
						value: 'meet-author'
					},
					{
						label: 'Author about course',
						value: 'about-course'
					},
					{
						label: 'Course structure',
						value: 'structure'
					},
					{
						label: 'Features',
						value: 'features'
					},
					{
						label: 'Benefits',
						value: 'benefits'
					},
					{
						label: 'Pricing',
						value: 'pricing'
					},
					{
						label: 'Success stories',
						value: 'stories'
					},
					{
						label: 'Blog',
						value: 'blog'
					},
					{
						label: 'Frequently asked questions',
						value: 'faq'
					},
					{
						label: 'Contacts',
						value: 'contacts'
					}
				],
			}),
			order: integer(),
			subtitle: text(),
			title: text({validation: {isRequired: true}}),
			url: text({
				// validation: {isRequired: true},
				// isIndexed: 'unique'
				ui: { createView: { fieldMode: 'hidden' } },
				isIndexed: 'unique',
				hooks: {
					resolveInput: ({ operation, resolvedData, inputData, context }) => {
						if (operation === 'create' && !inputData.url) {
							return defaultSlug({ context, inputData });
						}
						return resolvedData.url;
					}
				}
			}),
			status: select({
				options: [
					{ label: 'Draft', value: 'draft' },
					{ label: 'Published', value: 'published' },
					{ label: 'Archived', value: 'archived' },
				],
				defaultValue: 'draft',
				ui: { displayMode: 'segmented-control' },
			}),
			image: image({}),
			background: image(),
			video: file(),

			content: document({
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
			linkText: text(),
			link: text({}),
			linkType: select({
				type: 'string',
				defaultValue: 'button',
				options: [
					{
						label: 'Button',
						value: 'button'
					},
					{
						label: 'Button primary',
						value: 'button button-primary'
					},
					{
						label: 'Button outline',
						value: 'button button-outline'
					},
					{
						label: 'Button text',
						value: 'button button-text'
					}
				],
			}),
		}
	}),
	CourseStructure: list({
		fields: {
			order: integer(),
			title: text({validation: {isRequired: true}}),
			image: image({}),
			imageSvg: file({}),
			content: document({
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
		}
	}),
	CourseFeature: list({
		fields: {
			order: integer(),
			title: text({validation: {isRequired: true}}),
			image: image({}),
			imageSvg: file({}),
			content: document({
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
		}
	}),
	CourseBenefit: list({
		fields: {
			order: integer(),
			title: text({validation: {isRequired: true}}),
			image: image({}),
			imageSvg: file({}),
			content: document({
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
		}
	}),
	Faq: list({
		fields: {
			order: integer({
				defaultValue: 0
			}),
			title: text({validation: {isRequired: true}}),
			content: document({
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
		}
	}),
	Story: list({
		fields: {
			order: integer(),
			title: text(),
			slug: text({
				ui: { createView: { fieldMode: 'hidden' } },
				isIndexed: 'unique',
				hooks: {
					resolveInput: ({ operation, resolvedData, inputData, context }) => {
						if (operation === 'create' && !inputData.slug) {
							return defaultSlug({ context, inputData });
						}
						return resolvedData.slug;
					}
				}
			}),
			status: select({
				options: [
					{ label: 'Draft', value: 'draft' },
					{ label: 'Published', value: 'published' },
					{ label: 'Archived', value: 'archived' },
				],
				defaultValue: 'draft',
				ui: { displayMode: 'segmented-control' },
			}),
			publishedDate: timestamp({
				hooks: {
					resolveInput: ({ inputData, operation, resolvedData }) => {
						if (operation === 'create' && !inputData.slug) {
							return defaultTimestamp();
						}
						return resolvedData.slug;
					}
				}
			}),
			image: image({}),
			content: document({
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
		}
	}),
	Price: list({
		fields: {
			order: integer(),
			title: text({validation: {isRequired: true}}),
			content: document({
				label: 'Short content',
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
			fullContent: document({
				label: 'Full content',
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
			price: integer(),
			links: relationship({
				ref: 'Link',
				many: true
			})
		}
	}),
	Post: list({
		fields: {


			order: integer(),
			title: text(),
			slug: text({
				ui: { createView: { fieldMode: 'hidden' } },
				isIndexed: 'unique',
				hooks: {
					resolveInput: ({ operation, resolvedData, inputData, context }) => {
						if (operation === 'create' && !inputData.slug) {
							return defaultSlug({ context, inputData });
						}
						return resolvedData.slug;
					}
				}
			}),
			status: select({
				options: [
					{ label: 'Draft', value: 'draft' },
					{ label: 'Published', value: 'published' },
					{ label: 'Archived', value: 'archived' },
				],
				defaultValue: 'draft',
				ui: { displayMode: 'segmented-control' },
			}),
			date: timestamp({
				hooks: {
					resolveInput: ({ inputData, operation, resolvedData }) => {
						if (operation === 'create' && !inputData.slug) {
							return defaultTimestamp();
						}
						return resolvedData.slug;
					}
				}
			}),
			image: image({}),
			content: document({
				formatting: true,
				dividers: true,
				links: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
				],
			}),
			tag: relationship({
				ref: 'Tag',
				many: true
			}),
			author: relationship({
				ref: 'Person',
				many: false
			}),
		},
	}),
	Task: list({
		fields: {
			label: text({validation: {isRequired: true}}),
			priority: select({
				type: 'enum',
				options: [
					{label: 'Low', value: 'low'},
					{label: 'Medium', value: 'medium'},
					{label: 'High', value: 'high'},
				],
			}),
			isComplete: checkbox(),
			assignedTo: relationship({ref: 'Person.tasks', many: false}),
			finishBy: timestamp(),
		},
	}),
	Person: list({
		fields: {
			name: text({validation: {isRequired: true}}),
			// Added an email and password pair to be used with authentication
			// The email address is going to be used as the identity field, so it's
			// important that we set both isRequired and isUnique
			email: text({validation: {isRequired: true}, isIndexed: 'unique'}),
			// The password field stores a hash of the linkText: text(),supplied password, and
			// we want to ensure that all people have a password set, so we use
			// the isRequired flag.
			password: password({validation: {isRequired: true}}),
			address: text(),
			phone: text(),
			instagram: text(),
			facebook: text(),
			linkedin: text(),
			emailContacts: text(),
			tasks: relationship({ref: 'Task.assignedTo', many: true}),
		},
	}),
	Tag: list({
		fields: {
			title: text(),
		}
	}),
	Gallery: list({
		fields: {
			title: text(),
			image: image({})
		}
	}),
	Link: list({
		ui: {
			labelField: 'linkText',
		},
		fields: {
			linkText: text(),
			link: text(),
			linkType: select({
				type: 'string',
				defaultValue: 'button',
				options: [
					{
						label: 'Button',
						value: 'button'
					},
					{
						label: 'Button primary',
						value: 'button button-primary'
					},
					{
						label: 'Button outline',
						value: 'button button-outline'
					},
					{
						label: 'Button text',
						value: 'button button-text'
					}
				],
			}),
		}
	})
};
