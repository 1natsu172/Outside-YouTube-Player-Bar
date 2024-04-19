import popupStyle from "@/assets/styles/popup.module.scss";

type Props = {
	children: React.ReactNode;
};

export const GlobalWrapper: React.FC<Props> = (props) => {
	return <div className={popupStyle["l-globalWrapper"]}>{props.children}</div>;
};
