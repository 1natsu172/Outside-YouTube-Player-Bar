# Publish manual.

## 0. Prepare shell variables

1. write `.envrc` with reference `.envrc.template`

> need yarn global install chrome-webstore-manager

## 1. Release to GitHub Release

### use release-it

when develop complete.

1. `git checkout master`
2. `git merge develop --no-ff`
3. `yarn release-git`
4. Answering interactive...
5. Complete, then open GitHub release page on broweser
6. Handwrite Release notes
7. `git checkout develop && git pull --rebase origin master`

## 2. Release to Chrome Web Store

### use chrome-webstore-manager

1. `yarn webstore:update && yarn webstore:publish`
2. update complete, then open Chrome Web Store Developer console on broweser 
3. check it.
