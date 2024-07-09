import {
	Button,
	Container,
	Flex,
	Group,
	Paper,
	Text,
	Title,
} from "@mantine/core";
import { IconExclamationCircle, IconExternalLink } from "@tabler/icons-react";
import style from "./ErrorReport.module.css";

export const ErrorReport = () => {
	return (
		<Paper className={style.wrapper}>
			<Container size={"md"}>
				<Flex justify={"center"} align={"center"} direction={"column"}>
					<Title order={3} size={"h1"} mb={"xs"}>
						{browser.i18n.getMessage("report_announce_title")}
					</Title>
					<Group mb={"lg"} gap={5} c={"dimmed"}>
						<IconExclamationCircle />
						<Text>{browser.i18n.getMessage("report_announce_caution")}</Text>
					</Group>
					<Button
						component="a"
						href="https://oypb.canny.io/report"
						rightSection={<IconExternalLink />}
						size="lg"
						variant="gradient"
						gradient={{ from: "myColor.5", to: "myColor.7", deg: 90 }}
					>
						{browser.i18n.getMessage("report_announce_description")}
					</Button>
				</Flex>
			</Container>
		</Paper>
	);
};
