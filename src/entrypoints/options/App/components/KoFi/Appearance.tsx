import logo from "@/assets/images/Kofi_brand_asset/Kofi_logo/PNG/kofi_s_logo_nolabel.png";
import style from "./Appearance.module.css";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
	size?: string;
	rorate?: string;
}

export const Appearance = ({
	size = "50px",
	rorate = "25deg",
	...others
}: Props) => {
	return (
		<div
			className={style.appearance}
			style={{ transform: `rotate(${rorate})`, ...others.style }}
		>
			<img src={logo} alt="bg-appearance" width={size} height={size} />
		</div>
	);
};

export const Appearances = () => {
	return (
		<>
			<Appearance style={{ left: -90, top: 70 }} rorate="339deg" size="70" />
			<Appearance style={{ left: 40, top: 50 }} rorate="350deg" size="50" />
			<Appearance style={{ left: -30, top: 10 }} rorate="10deg" size="40" />

			<Appearance style={{ right: 50, top: 50 }} rorate="30deg" size="70" />
			<Appearance style={{ right: 175, top: 30 }} rorate="-30deg" size="60" />
			<Appearance
				style={{ left: -60, bottom: 180 }}
				rorate="-25deg"
				size="70"
			/>
			<Appearance
				style={{ left: 260, bottom: 150 }}
				rorate="-10deg"
				size="50"
			/>
			<Appearance style={{ left: 65, bottom: 60 }} rorate="10deg" size="60" />
			<Appearance
				style={{ right: 250, bottom: 70 }}
				rorate="-20deg"
				size="70"
			/>
			<Appearance style={{ right: 0, bottom: 80 }} rorate="20deg" size="60" />
		</>
	);
};
