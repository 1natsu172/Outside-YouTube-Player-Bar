import { Container, Group, Text } from "@mantine/core";
import OypbLogo from "/images/icon-128.png";
import style from "./Header.module.css";

export function Header() {
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
