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
						backgroundColor: "var(--mantine-color-blue-light)",
						borderRadius: "var(--mantine-radius-sm)",
					}}
				>
					Send tip to the author
				</Highlight>
				<Text c="dimmed" mt="md">
					I develop and publish this extension for free. I have taken a lot of
					time into this...over 7 years...no compensation. I would be happy with
					a tip to be honest!
				</Text>

				<List
					mt={30}
					spacing="sm"
					size="lg"
					icon={
						<ThemeIcon size={"xl"} radius="xl">
							<IconCheck stroke={2} />
						</ThemeIcon>
					}
				>
					<List.Item
						icon={
							<ThemeIcon size={"xl"} radius="xl">
								<IconMoneybag stroke={2} />
							</ThemeIcon>
						}
					>
						<b>From $1.00</b> – But the more money, be happy 😉
					</List.Item>
					<List.Item>
						<b>Payment Method</b> – You can pay with what Ko-Fi provides. Credit
						card, ApplePay, GooglePay…
					</List.Item>
					<List.Item
						icon={
							<ThemeIcon size={"xl"} radius="xl" color="yellow">
								<IconAlertTriangle stroke={2} />
							</ThemeIcon>
						}
					>
						<b>Not a work order</b> – Tipping is not a request for priority
						support or custom-made development.
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
