import { useStorage } from "@/core/presenters/storagePresenter/useStorageHooks/index.js";
import { debugMode } from "@/core/repositories/options.repository.js";
import { Card, Title } from "@mantine/core";
import type { ReactNode } from "react";

export type FormGroupProps = {
	title: string;
	children?: ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	formState?: any;
};
export const FormGroup = ({ title, children, formState }: FormGroupProps) => {
	const { store: isDebug } = useStorage(debugMode);

	return (
		<div>
			<Title>{title}</Title>
			{children}
			{isDebug && (
				<Card withBorder radius="md">
					<pre className="m-0">
						{JSON.stringify({ [title]: formState }, null, 2)}
					</pre>
				</Card>
			)}
		</div>
	);
};
