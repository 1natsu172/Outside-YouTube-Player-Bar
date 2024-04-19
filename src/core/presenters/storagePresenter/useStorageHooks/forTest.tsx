import { Suspense } from "react";
import { useStorage } from "./index.js";

const _Component = (props: { storageKey: string }) => {
	// @ts-expect-error for testing key
	const store = useStorage(props.storageKey);
	console.log(store);

	return <div>{JSON.stringify(store, null, 2)}</div>;
};

export const TestComponent = (props: { storageKey: string }) => {
	return (
		<Suspense fallback={"loading"}>
			<_Component storageKey={props.storageKey} />
		</Suspense>
	);
};
