# Publish manual.
## 1. Release to GitHub Release

when develop complete.

1. `git checkout develop && git pull`
2. `pnpm version <SEMVER-arg> && git push`
3. `pnpm run release-to-git`
4. Answering interactive...
5. Complete, then open GitHub release page on broweser
6. Handwrite Release notes

## 2. Release to Chrome Web Store
### uploaded via CD

1. uploaded to devconsole via CD
2. check console.

# Dev console links

- Chrome Web Store Developer Dashboard: https://chrome.google.com/webstore/devconsole
- Mozilla add-on developer hub: https://addons.mozilla.org/en-US/developers/
- Microsoft Partner Center Edge dashboard: https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview
