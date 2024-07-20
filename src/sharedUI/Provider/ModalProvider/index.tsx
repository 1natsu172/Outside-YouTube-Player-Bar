import { type ReactNode, createContext, useCallback, useState } from "react";

export type State = {
	isShow: boolean;
};

const createInitialState = (initialState?: Partial<State>): State => ({
	isShow: false,
	...initialState,
});

const useModalState = (initialState?: Partial<State>) => {
	const [state, setState] = useState(createInitialState(initialState));

	const onOpen = useCallback(() => {
		setState({ isShow: true });
	}, []);

	const onClose = useCallback(() => {
		setState({ isShow: false });
	}, []);

	return {
		state,
		handlers: {
			onClose,
			onOpen,
		},
	} as const;
};

export const ModalStateContext = createContext<
	ReturnType<typeof useModalState>["state"]
>(createInitialState());
export const ModalHandlerContext = createContext<
	ReturnType<typeof useModalState>["handlers"]
>({ onClose() {}, onOpen() {} });

interface Props {
	children?: ReactNode;
}

export const ModalProvider = ({ children }: Props) => {
	const { state, handlers } = useModalState();
	return (
		<ModalStateContext.Provider value={state}>
			<ModalHandlerContext.Provider value={handlers}>
				{children}
			</ModalHandlerContext.Provider>
		</ModalStateContext.Provider>
	);
};
