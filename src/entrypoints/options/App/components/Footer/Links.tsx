import { ActionIcon, rem } from "@mantine/core";
import {
	IconBrandChrome,
	IconBrandEdge,
	IconBrandFirefox,
	IconBrandGithub,
} from "@tabler/icons-react";

const links = [
	{ url: "", icon: IconBrandChrome },
	{ url: "", icon: IconBrandEdge },
	{ url: "", icon: IconBrandFirefox },
	{ url: "", icon: IconBrandGithub },
];

export const Links = () => {
	return links.map(({ url, icon: Icon }, index) => (
		<ActionIcon
			key={index + url}
			size="lg"
			color="gray"
			variant="subtle"
			onClick={() => {
				window.open(url);
			}}
		>
			<Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
		</ActionIcon>
	));
};
