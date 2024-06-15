import { getSemverTags } from "git-semver-tags";

const makeTemplate = (currentVersion, prevVersion) => `
## ${currentVersion}

[EN]

*

[JA]

*

---

_For developer_

compare code: [${prevVersion}...${currentVersion}](https://github.com/1natsu172/Outside-YouTube-Player-Bar/compare/${prevVersion}...${currentVersion})
`;

try {
	const [currentVersion, prevVersion] = await getSemverTags();
	const template = makeTemplate(currentVersion, prevVersion);
	process.stdout.write(template);
} catch (error) {
	console.error(error);
}
