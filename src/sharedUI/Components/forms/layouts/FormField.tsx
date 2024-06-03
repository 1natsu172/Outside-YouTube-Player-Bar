import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";
import { Card, Flex, Text } from "@mantine/core";
import style from "./FormField.module.css";

export type FieldViewProps = {
	title: string;
	description?: string;
	isLoading: boolean;
	children?: JSX.Element;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormField = ({
	children: FieldKnob,
	title,
	description,
	formState,
}: FieldViewProps) => {
	const { store: isDebug } = useStorage(debugMode);

	return (
		<Flex
			align="center"
			justify="space-between"
			wrap="wrap"
			p={"sm"}
			mb={"xl"}
			columnGap={"xl"}
			rowGap={"md"}
		>
			<Flex direction={"column"} flex={6} miw={200} maw={"100%"}>
				<Text fz={"h3"} fw={"bold"}>
					{title}
				</Text>
				<Text size="md" c="dimmed" className={style.description}>
					{description}
				</Text>
			</Flex>
			<Flex direction={"column"} flex={4} maw={"100%"} align={"flex-end"}>
				{FieldKnob}
				{isDebug && (
					<Card withBorder radius={"md"} mt={"md"} maw={"100%"}>
						<pre className={style.pre}>
							{JSON.stringify({ [title]: formState }, null, 2)}
						</pre>
					</Card>
				)}
			</Flex>
		</Flex>
	);
};
