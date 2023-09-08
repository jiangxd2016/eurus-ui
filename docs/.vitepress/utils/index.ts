export const extractFileNameFromPath = (path: string): string => {
	// console.log(path.split('/').at(-3) as string + path.split('/').at(-1)?.split('.')[0] as string);

	return ((path.split('/').at(-3) as string) + path.split('/').at(-1)?.split('.')[0]) as string;
};

export const extractFileNameFromGlobImport = (demos: string[]) => {
	const names: Array<string> = [];
	for (const path in demos) {
		names.push(extractFileNameFromPath(path));
	}

	return names;
};
