import {query} from '.keystone/api';
import type { Request, Response } from 'express';
import type { KeystoneContext } from '@keystone-6/core/types';

export async function loadStories() {
	// Call an external API endpoint to get posts
	// const posts = await query.Post.findMany({query: 'id title slug content { document} date tag { title } author { name } image { url width height }'}) as Post[];
	const res = await fetch('https://.../posts/')
	const data = await res.json()

	return data
}

export async function getStories(req: Request, res: Response) {
	// This was added by the context middleware in ../keystone.ts
	const context = (req as any).context as KeystoneContext;
	// Let's map the `complete` query param to a where filter
	let isComplete;
	if (req.query.complete === 'true') {
		isComplete = { equals: true };
	} else if (req.query.complete === 'false') {
		isComplete = { equals: false };
	}
	// Now we can use it to query the Keystone Schema
	const stories = await context.query.Story.findMany({
		where: {
			isComplete,
		},
		query: `
      id title slug content { document} date tag { title } author { name } image { url width height }
    `,
	});
	// And return the result as JSON
	res.json(stories);
}