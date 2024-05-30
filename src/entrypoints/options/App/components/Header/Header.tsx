import { Container, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import OypbLogo from "/images/icon-128.png";
import style from "./Header.module.css";

const links = [
	{ link: "/about", label: "Features" },
	{ link: "/pricing", label: "Pricing" },
	{ link: "/learn", label: "Learn" },
	{ link: "/community", label: "Community" },
];

export function Header() {
	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);

	const items = links.map((link) => (
		<a
			key={link.label}
			href={link.link}
			// className={classes.link}
			data-active={active === link.link || undefined}
			onClick={(event) => {
				event.preventDefault();
				setActive(link.link);
			}}
		>
			{link.label}
		</a>
	));

	return (
		<header className={style.header}>
			<Container h={85} className={style.inner} fluid>
				<Group>
					<div className={style.logo}>
						<img src={OypbLogo} alt="outside-youtube-player-bar-logo" />
					</div>
					<Text fz={"h1"} fw={"bold"}>
						{browser.i18n.getMessage("browserActionTitle")}
					</Text>
				</Group>
			</Container>
		</header>
	);
}
