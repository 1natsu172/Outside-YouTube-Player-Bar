import { ActionIcon, rem } from "@mantine/core";
import {
	IconBrandChrome,
	IconBrandEdge,
	IconBrandFirefox,
	IconBrandGithub,
} from "@tabler/icons-react";

const links = [
	// TODO: url
	{
		url: "https://chromewebstore.google.com/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde",
		icon: IconBrandChrome,
	},
	{ url: "", icon: IconBrandEdge },
	{
		url: "https://addons.mozilla.org/firefox/addon/outside-youtube-player-bar/",
		icon: IconBrandFirefox,
	},
	{
		url: "https://github.com/1natsu172/Outside-YouTube-Player-Bar",
		icon: IconBrandGithub,
	},
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
