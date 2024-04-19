import popupStyle from "@/assets/styles/popup.module.scss";

export const GlobalHeader = () => {
	return (
		<header className={popupStyle.globalHeader}>
			<h1 className={popupStyle.title}>
				{browser.i18n.getMessage("popup_title")} 😃
			</h1>
			<p className={popupStyle.description}>
				{browser.i18n.getMessage("popup_description")}
			</p>
		</header>
	);
};
