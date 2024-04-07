import popupStyle from '@/assets/styles/popup.module.scss'

export const MainContents = () => {
  return (
    <main>
      <div className={popupStyle['contact']}>
        <ul className={popupStyle['contact__list']}>
          <li
            className={`${popupStyle['contact__list__item']} ${popupStyle['contact__list__item--github']}`}
          >
            <a
              href="https://github.com/1natsu172/Outside-YouTube-Player-Bar/issues"
              target="_blank"
            >
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgMzIgMzIiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsLXJ1bGU6ZXZlbm9kZDsiIGQ9Ik0gMTYgNCBDIDkuMzcxMDk0IDQgNCA5LjM3MTA5NCA0IDE2IEMgNCAyMS4zMDA3ODEgNy40Mzc1IDI1LjgwMDc4MSAxMi4yMDcwMzEgMjcuMzg2NzE5IEMgMTIuODA4NTk0IDI3LjQ5NjA5NCAxMy4wMjczNDQgMjcuMTI4OTA2IDEzLjAyNzM0NCAyNi44MDg1OTQgQyAxMy4wMjczNDQgMjYuNTIzNDM4IDEzLjAxNTYyNSAyNS43Njk1MzEgMTMuMDExNzE5IDI0Ljc2OTUzMSBDIDkuNjcxODc1IDI1LjQ5MjE4OCA4Ljk2ODc1IDIzLjE2MDE1NiA4Ljk2ODc1IDIzLjE2MDE1NiBDIDguNDIxODc1IDIxLjc3MzQzOCA3LjYzNjcxOSAyMS40MDIzNDQgNy42MzY3MTkgMjEuNDAyMzQ0IEMgNi41NDY4NzUgMjAuNjYwMTU2IDcuNzE4NzUgMjAuNjc1NzgxIDcuNzE4NzUgMjAuNjc1NzgxIEMgOC45MjE4NzUgMjAuNzYxNzE5IDkuNTU0Njg4IDIxLjkxMDE1NiA5LjU1NDY4OCAyMS45MTAxNTYgQyAxMC42MjUgMjMuNzQ2MDk0IDEyLjM2MzI4MSAyMy4yMTQ4NDQgMTMuMDQ2ODc1IDIyLjkxMDE1NiBDIDEzLjE1NjI1IDIyLjEzMjgxMyAxMy40Njg3NSAyMS42MDU0NjkgMTMuODA4NTk0IDIxLjMwNDY4OCBDIDExLjE0NDUzMSAyMS4wMDM5MDYgOC4zNDM3NSAxOS45NzI2NTYgOC4zNDM3NSAxNS4zNzUgQyA4LjM0Mzc1IDE0LjA2MjUgOC44MTI1IDEyLjk5MjE4OCA5LjU3ODEyNSAxMi4xNTIzNDQgQyA5LjQ1NzAzMSAxMS44NTE1NjMgOS4wNDI5NjkgMTAuNjI4OTA2IDkuNjk1MzEzIDguOTc2NTYzIEMgOS42OTUzMTMgOC45NzY1NjMgMTAuNzAzMTI1IDguNjU2MjUgMTIuOTk2MDk0IDEwLjIwNzAzMSBDIDEzLjk1MzEyNSA5Ljk0MTQwNiAxNC45ODA0NjkgOS44MDg1OTQgMTYgOS44MDQ2ODggQyAxNy4wMTk1MzEgOS44MDg1OTQgMTguMDQ2ODc1IDkuOTQxNDA2IDE5LjAwMzkwNiAxMC4yMDcwMzEgQyAyMS4yOTY4NzUgOC42NTYyNSAyMi4zMDA3ODEgOC45NzY1NjMgMjIuMzAwNzgxIDguOTc2NTYzIEMgMjIuOTU3MDMxIDEwLjYyODkwNiAyMi41NDY4NzUgMTEuODUxNTYzIDIyLjQyMTg3NSAxMi4xNTIzNDQgQyAyMy4xOTE0MDYgMTIuOTkyMTg4IDIzLjY1MjM0NCAxNC4wNjI1IDIzLjY1MjM0NCAxNS4zNzUgQyAyMy42NTIzNDQgMTkuOTg0Mzc1IDIwLjg0NzY1NiAyMC45OTYwOTQgMTguMTc1NzgxIDIxLjI5Njg3NSBDIDE4LjYwNTQ2OSAyMS42NjQwNjMgMTguOTg4MjgxIDIyLjM5ODQzOCAxOC45ODgyODEgMjMuNTE1NjI1IEMgMTguOTg4MjgxIDI1LjEyMTA5NCAxOC45NzY1NjMgMjYuNDE0MDYzIDE4Ljk3NjU2MyAyNi44MDg1OTQgQyAxOC45NzY1NjMgMjcuMTI4OTA2IDE5LjE5MTQwNiAyNy41MDM5MDYgMTkuODAwNzgxIDI3LjM4NjcxOSBDIDI0LjU2NjQwNiAyNS43OTY4NzUgMjggMjEuMzAwNzgxIDI4IDE2IEMgMjggOS4zNzEwOTQgMjIuNjI4OTA2IDQgMTYgNCBaICI+PC9wYXRoPjwvZz48L3N2Zz4=" />{' '}
              GitHub Issue
            </a>
          </li>
        </ul>
      </div>

      <div className={popupStyle['please']}>
        <p className={popupStyle['please__and']}>&</p>
        <ul className={popupStyle['please__reviewLink']}>
          <li className={popupStyle['please__reviewLink__item']}>
            <a
              href="https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde"
              target="_blank"
            >
              📝 {browser.i18n.getMessage('popup_pleaseReviewLink')}
            </a>
          </li>
        </ul>
      </div>
    </main>
  )
}
