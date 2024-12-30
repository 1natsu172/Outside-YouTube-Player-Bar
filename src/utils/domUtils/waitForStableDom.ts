import { debounce } from "mabiki";

export function waitForStableChildList(
	targetElement: Element,
	delay: number,
	maxWait: number,
) {
	const { promise, resolve } = Promise.withResolvers<void>();
	const debounceResolve = debounce(resolve, delay, {
		leading: false,
		trailing: true,
		maxWait: maxWait,
	});

	const observer = new MutationObserver(() => {
		debounceResolve();
	});
	observer.observe(targetElement, {
		childList: true, // 子要素や孫要素の追加・削除を監視
		subtree: true, // サブツリー全体を監視
	});

	return promise.finally(() => {
		observer.disconnect();
	});
}
