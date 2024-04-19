const gitSemverTags = require("git-semver-tags");

const gitTags = () =>
	new Promise((resolve, reject) => {
		gitSemverTags((err, result) => {
			err ? reject(err) : resolve(result);
		});
	});

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
(async () => {
	const [currentVersion, prevVersion] = await gitTags();
	const template = makeTemplate(currentVersion, prevVersion);
	process.stdout.write(template);
})().catch((err) => console.error(err));
