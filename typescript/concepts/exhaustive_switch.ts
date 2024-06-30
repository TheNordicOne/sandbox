type QueryOptions =
	| {
			table: 'users';
			userId: string;
	  }
	| {
			table: 'widgets';
			widgetId: string;
	  }
	| {
			table: 'sessions';
			sessionId: string;
	  };

export function exhaustiveSwitchDemo(options: QueryOptions) {
	let id = '';
	switch (options.table) {
		case 'users':
			id = options.userId;
			break;
		case 'widgets':
			id = options.widgetId;
			break;
		case 'sessions':
			id = options.sessionId;
			break;
		default:
			asserUnreachable(options);
	}
	console.log(id);
}

function asserUnreachable(x: never) {
	throw new Error('Unreachable code');
}
