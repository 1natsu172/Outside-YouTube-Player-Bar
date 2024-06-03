/// <reference types="vite-plugin-svgr/client" />

import qrImage from "@/assets/images/Kofi_brand_asset/Kofi_QR/qrcode.png";
import KofiBadge from "@/assets/images/Kofi_brand_asset/Kofi_badge/SVG/kofi_s_tag_white.svg?react";
import {
	Card,
	Container,
	Group,
	Highlight,
	List,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import {
	IconAlertTriangle,
	IconCheck,
	IconMoneybag,
} from "@tabler/icons-react";
import { Appearances } from "./Appearance.js";
import style from "./KoFi.module.css";

const EmbedKofi = () => {
	return (
		<div
			className={style.embed}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{
				__html: `<iframe id='kofiframe' src='https://ko-fi.com/1natsu/?hidefeed=true&widget=true&embed=true&preview=true' style='border:none;width:100%;padding:4px;' height='712' title='1natsu'></iframe>`,
			}}
		/>
	);
};

export const KoFi = () => (
	<Container size="xl" className={style.container}>
		<Appearances />
		<div className={style.inner}>
			<div className={style.content}>
				<Highlight
					component={Title}
					highlight={"tip"}
					className={style.title}
					highlightStyles={{
						backgroundColor: "var(--mantine-color-myColor-1)",
						borderRadius: "var(--mantine-radius-sm)",
					}}
				>
					{browser.i18n.getMessage("kofi_title")}
				</Highlight>
				<Text c="dimmed" mt="md">
					{browser.i18n.getMessage("kofi_description")}
				</Text>

				<List
					mt={30}
					spacing="sm"
					size="lg"
					icon={
						<ThemeIcon
							size={"xl"}
							radius="xl"
							color="myColor.3"
							autoContrast={false}
						>
							<IconCheck stroke={2} />
						</ThemeIcon>
					}
				>
					<List.Item
						icon={
							<ThemeIcon
								size={"xl"}
								radius="xl"
								color="myColor.3"
								autoContrast={false}
							>
								<IconMoneybag stroke={2} />
							</ThemeIcon>
						}
					>
						<b>{browser.i18n.getMessage("kofi_underPrice")}</b>
						{` – ${browser.i18n.getMessage("kofi_underPrice_description")}`}
					</List.Item>
					<List.Item>
						<b>{browser.i18n.getMessage("kofi_paymentMethod")}</b>
						{` – ${browser.i18n.getMessage("kofi_paymentMethod_description")}`}
					</List.Item>
					<List.Item
						icon={
							<ThemeIcon
								size={"xl"}
								radius="xl"
								color="yellow"
								autoContrast={false}
							>
								<IconAlertTriangle stroke={2} />
							</ThemeIcon>
						}
					>
						<b>{browser.i18n.getMessage("kofi_tipCaution")}</b>
						{` – ${browser.i18n.getMessage("kofi_tipCaution_description")}`}
					</List.Item>
				</List>

				<Group mt={30} align="stretch" wrap="nowrap" className={style.links}>
					<Card
						withBorder
						radius={"lg"}
						component="a"
						target="_blank "
						href="https://ko-fi.com/1natsu"
					>
						<KofiBadge width={"100%"} height={"100%"} />
					</Card>
					<Card withBorder radius={"lg"}>
						<img src={qrImage} alt="Ko-Fi qr code" />
					</Card>
				</Group>
			</div>
			<EmbedKofi />
		</div>
	</Container>
);
