export type NamedNodeMapLike = Record<string, string>;

export function convertToNamedNodeMapLike(
	attributes: NamedNodeMap,
): NamedNodeMapLike {
	return Array.from(attributes).reduce<NamedNodeMapLike>((acc, attr) => {
		acc[attr.name] = attr.value;
		return acc;
	}, {});
}
