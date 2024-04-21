export const displayInfo = () => {
	const { VITE_DEBUG_YT_EVENTS } = import.meta.env;
	logger.info({ VITE_DEBUG_YT_EVENTS });
};
