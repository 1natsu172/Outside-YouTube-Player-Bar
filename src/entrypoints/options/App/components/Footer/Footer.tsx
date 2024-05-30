import { Container, Group } from "@mantine/core";
import OypbLogo from "/images/icon-128.png";
import style from "./Footer.module.css";
import { Links } from "./Links.js";

export function Footer() {
	return (
		<div className={style.footer}>
			<Container className={style.inner} fluid>
				<div className={style.logo}>
					<img src={OypbLogo} alt="outside-youtube-player-bar-logo" />
				</div>
				<Group gap={0} className={style.links} justify="flex-end" wrap="nowrap">
					<Links />
				</Group>
			</Container>
		</div>
	);
}
