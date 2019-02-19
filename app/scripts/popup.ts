// Enable chromereload by uncommenting this line:
import 'chromereload/devonly'

// const i18n = {
//   header: {
//     title: chrome.i18n.getMessage('popup_title'),
//     description: chrome.i18n.getMessage('popup_description'),
//   }
// }

const popupHtmlContent = `
<div class="l-globalWrapper">
  <header class="globalHeader">
    <h1 class="title">${chrome.i18n.getMessage('popup_title')} 😃</h1>
    <p class="description">${chrome.i18n.getMessage('popup_description')}</p>
  </header>
  <main>
    <div class="contact">
      <ul class="contact__list">
        <li class="contact__list__item contact__list__item--github">
          <a href="https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde" target="_blank">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAN9SURBVGhD7dm5ixRNAMbh9b4Rr0BUvM/EQBT9AwzNvAVN/DIVBC9MFBQ1VsErMxEVFfGOFANP8BZMvRKvQERURH1/Ms1XFG9PV+/0tMm88MDuTFV193Z1VXVtVyeddFJJesl82S5n5Ll8kh8N/PxM+I4ylO0p/zzjZJ+8ld8lvRHqjpXaM1KOyndxJ1cGbRwS2qwlK+WjuJNpxXuh7balrxwTd/AqHZY+UmkGymVxB2yHS8IxKwl/+TpPPnNeKrkTdXSbPHSnlrJKXMN1Wibdyij5IK7ROjE6jZDS4fa5BpthTD8hS2S8DBAexsnC3TwtP8XVbeaglAozbDxJTZdd0WchHroJUpRJckVcG3k4lzGSHKb4uJHVQnZK+Pkv2SJVZKgMa5gq4d3aK0lhkcU6JTxJvJBsARZexDY+qDhz5LiEx38lSQvABRJWDC2VLFzEVenx97f/w7yxQe7Kl4Y7jc/4Li+D5T+5L+7YmCeFYbnrKuOxhCfMQcPQTx+Jq4uHEvdl2uMh/SyuTijpbp8VVzmzSFz6yRNxdUJcIGXDXBNXNsYoVhhePFzlzD1xoYu48s56CbNGXLnYUykMb0+ucmihxKGfu7LObQkzW1y5GBNrYVJeUm5KHB5WV9ahv4dh+HTlYpxbYVIuAEMkTCsX0F9cuVjSBaR0IUyTMK10oYniysWSuhAPiqsci1//eDBdOWedhKEtVy7GKFcYtj5c5dhJCcPQyDzhyoaYC+IJLfWFKWkYbTaRheiPrDLDMElxgq48Hkg8kdFG6gp1qxSGTSdX2eFuxcmWEvRzHlbcErpN/JdnFr4hrm1nrhSGBdNrcQ04m6S72SGuTSd5MUdYurpGHG7/Zimb3eLay7NHksN2X+p8kDknUyQlrGpdG3m+SakXGsJ2n2usGS76lPD6OEMGNYSr1tFSdmfvgJQOL9JVvdTPlCwXxZXJ806GS7eyQlyjZYQryLXiyjTDBkFLOSKu4VSMNITlQspLS2i/tBzGbnYc3AFSzBKGv+vBZyk4Jv84qSTs7ZTtu+A/NWSjuO/zXJDKNnezsNFadrOLnQwWal+Dz4ow4vSWtmW5sN3nDt4K2lwstYQhlp2EspOdwyTFX53NrNrDjM2y46W4k2uGOiwPSs+w7QijDJtO7NuwZufFg9mWOwR+5l2B71gSs6pMXph10kkneenq+gOO0+ft+X9p2QAAAABJRU5ErkJggg=="> Chrome Web Store</a>
        </li>
        <li class="contact__list__item contact__list__item--github">
          <a href="https://github.com/1natsu172/Outside-YouTube-Player-Bar/issues" target="_blank">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgMzIgMzIiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsLXJ1bGU6ZXZlbm9kZDsiIGQ9Ik0gMTYgNCBDIDkuMzcxMDk0IDQgNCA5LjM3MTA5NCA0IDE2IEMgNCAyMS4zMDA3ODEgNy40Mzc1IDI1LjgwMDc4MSAxMi4yMDcwMzEgMjcuMzg2NzE5IEMgMTIuODA4NTk0IDI3LjQ5NjA5NCAxMy4wMjczNDQgMjcuMTI4OTA2IDEzLjAyNzM0NCAyNi44MDg1OTQgQyAxMy4wMjczNDQgMjYuNTIzNDM4IDEzLjAxNTYyNSAyNS43Njk1MzEgMTMuMDExNzE5IDI0Ljc2OTUzMSBDIDkuNjcxODc1IDI1LjQ5MjE4OCA4Ljk2ODc1IDIzLjE2MDE1NiA4Ljk2ODc1IDIzLjE2MDE1NiBDIDguNDIxODc1IDIxLjc3MzQzOCA3LjYzNjcxOSAyMS40MDIzNDQgNy42MzY3MTkgMjEuNDAyMzQ0IEMgNi41NDY4NzUgMjAuNjYwMTU2IDcuNzE4NzUgMjAuNjc1NzgxIDcuNzE4NzUgMjAuNjc1NzgxIEMgOC45MjE4NzUgMjAuNzYxNzE5IDkuNTU0Njg4IDIxLjkxMDE1NiA5LjU1NDY4OCAyMS45MTAxNTYgQyAxMC42MjUgMjMuNzQ2MDk0IDEyLjM2MzI4MSAyMy4yMTQ4NDQgMTMuMDQ2ODc1IDIyLjkxMDE1NiBDIDEzLjE1NjI1IDIyLjEzMjgxMyAxMy40Njg3NSAyMS42MDU0NjkgMTMuODA4NTk0IDIxLjMwNDY4OCBDIDExLjE0NDUzMSAyMS4wMDM5MDYgOC4zNDM3NSAxOS45NzI2NTYgOC4zNDM3NSAxNS4zNzUgQyA4LjM0Mzc1IDE0LjA2MjUgOC44MTI1IDEyLjk5MjE4OCA5LjU3ODEyNSAxMi4xNTIzNDQgQyA5LjQ1NzAzMSAxMS44NTE1NjMgOS4wNDI5NjkgMTAuNjI4OTA2IDkuNjk1MzEzIDguOTc2NTYzIEMgOS42OTUzMTMgOC45NzY1NjMgMTAuNzAzMTI1IDguNjU2MjUgMTIuOTk2MDk0IDEwLjIwNzAzMSBDIDEzLjk1MzEyNSA5Ljk0MTQwNiAxNC45ODA0NjkgOS44MDg1OTQgMTYgOS44MDQ2ODggQyAxNy4wMTk1MzEgOS44MDg1OTQgMTguMDQ2ODc1IDkuOTQxNDA2IDE5LjAwMzkwNiAxMC4yMDcwMzEgQyAyMS4yOTY4NzUgOC42NTYyNSAyMi4zMDA3ODEgOC45NzY1NjMgMjIuMzAwNzgxIDguOTc2NTYzIEMgMjIuOTU3MDMxIDEwLjYyODkwNiAyMi41NDY4NzUgMTEuODUxNTYzIDIyLjQyMTg3NSAxMi4xNTIzNDQgQyAyMy4xOTE0MDYgMTIuOTkyMTg4IDIzLjY1MjM0NCAxNC4wNjI1IDIzLjY1MjM0NCAxNS4zNzUgQyAyMy42NTIzNDQgMTkuOTg0Mzc1IDIwLjg0NzY1NiAyMC45OTYwOTQgMTguMTc1NzgxIDIxLjI5Njg3NSBDIDE4LjYwNTQ2OSAyMS42NjQwNjMgMTguOTg4MjgxIDIyLjM5ODQzOCAxOC45ODgyODEgMjMuNTE1NjI1IEMgMTguOTg4MjgxIDI1LjEyMTA5NCAxOC45NzY1NjMgMjYuNDE0MDYzIDE4Ljk3NjU2MyAyNi44MDg1OTQgQyAxOC45NzY1NjMgMjcuMTI4OTA2IDE5LjE5MTQwNiAyNy41MDM5MDYgMTkuODAwNzgxIDI3LjM4NjcxOSBDIDI0LjU2NjQwNiAyNS43OTY4NzUgMjggMjEuMzAwNzgxIDI4IDE2IEMgMjggOS4zNzEwOTQgMjIuNjI4OTA2IDQgMTYgNCBaICI+PC9wYXRoPjwvZz48L3N2Zz4="> GitHub Issue</a>
        </li>
      </ul>
    </div>

    <div class="please">
      <p class="please__and">&</p>
      <p class="please__review">${chrome.i18n.getMessage(
        'popup_pleaseReview'
      )} 🙏</p>
      <ul class="please__reviewLink">
      <li class="please__reviewLink__item"><a href="https://chrome.google.com/webstore/detail/outside-youtube-player-ba/gmlbhbdkhnfhhmhdjopdbcfliajcafde" target="_blank">📝 ${chrome.i18n.getMessage(
        'popup_pleaseReviewLink'
      )}</a></li>
      </ul>
    </div>
  </main>
  <footer class="globalFooter">
    <p class="globalFooter__author">
      <small>${chrome.i18n.getMessage('popup_footerAuthor')}:
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IgogICAgIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIKICAgICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiAiIGQ9Ik0gNC4wNjI1IDQgQyA0LjA2MjUgNCAzLjUzMTI1IDQuOTI1NzgxIDMuNTMxMjUgNi41IEMgMy41MzEyNSA3LjU0Njg3NSAzLjc2NTYyNSA4LjEyNSAzLjkzNzUgOC40MDYyNSBDIDIuNzM0Mzc1IDkuNjYwMTU2IDIgMTEuMzQ3NjU2IDIgMTMuNTMxMjUgQyAyIDE5LjEyNSA1LjUyNzM0NCAyMSAxMiAyMSBDIDE4LjQ3MjY1NiAyMSAyMiAxOS4xMjUgMjIgMTMuNTMxMjUgQyAyMiAxMS4yNjk1MzEgMjEuMzA0Njg4IDkuNTc0MjE5IDIwLjE1NjI1IDguMzQzNzUgQyAyMC40NDE0MDYgNy40ODgyODEgMjAuNzY5NTMxIDUuODcxMDk0IDE5Ljk2ODc1IDQgQyAxNy41ODIwMzEgNCAxNS41NzAzMTMgNS44Mzk4NDQgMTUuNSA1LjkwNjI1IEMgMTQuMzg2NzE5IDUuNjYwMTU2IDEzLjIxMDkzOCA1LjUzMTI1IDEyIDUuNTMxMjUgQyAxMC43NjE3MTkgNS41MzEyNSA5LjU0Mjk2OSA1LjY4NzUgOC40MDYyNSA1Ljk2ODc1IEMgNi44MDg1OTQgNC4zNzg5MDYgNC44ODY3MTkgNCA0LjA2MjUgNCBaIE0gMTUuMjE4NzUgMTIgQyAxNS44MjAzMTMgMTEuOTkyMTg4IDE2LjM4NjcxOSAxMi4wNTQ2ODggMTYuODc1IDEyLjIxODc1IEMgMTguMTc5Njg4IDEyLjY2MDE1NiAxOSAxMy45NDUzMTMgMTkgMTUuMzc1IEMgMTguOTk2MDk0IDE5LjMzOTg0NCAxNi45OTYwOTQgMjAgMTEuODc1IDIwIEMgOC4wNjY0MDYgMjAgNC45Njg3NSAxOS4yODUxNTYgNC45Njg3NSAxNS41IEMgNC45Njg3NSAxNC4wNTQ2ODggNS43MTg3NSAxMy4yMjY1NjMgNi4yNSAxMi43MTg3NSBDIDcuNDE3OTY5IDExLjYwMTU2MyA5LjI1NzgxMyAxMi4xNTYyNSAxMS44NzUgMTIuMTU2MjUgQyAxMy4wNjI1IDEyLjE1NjI1IDE0LjIxNDg0NCAxMi4wMTE3MTkgMTUuMjE4NzUgMTIgWiBNIDggMTQgQyA3LjQ0OTIxOSAxNCA3IDE0LjY3MTg3NSA3IDE1LjUgQyA3IDE2LjMyODEyNSA3LjQ0OTIxOSAxNyA4IDE3IEMgOC41NTA3ODEgMTcgOSAxNi4zMjgxMjUgOSAxNS41IEMgOSAxNC42NzE4NzUgOC41NTA3ODEgMTQgOCAxNCBaIE0gMTYgMTQgQyAxNS40NDkyMTkgMTQgMTUgMTQuNjcxODc1IDE1IDE1LjUgQyAxNSAxNi4zMjgxMjUgMTUuNDQ5MjE5IDE3IDE2IDE3IEMgMTYuNTUwNzgxIDE3IDE3IDE2LjMyODEyNSAxNyAxNS41IEMgMTcgMTQuNjcxODc1IDE2LjU1MDc4MSAxNCAxNiAxNCBaICI+PC9wYXRoPjwvZz48L3N2Zz4=">
        <a href="https://github.com/1natsu172" target="_blank">@1natsu172</a>
      </small>
    </p>
  </footer>
</div>

`

document.body.insertAdjacentHTML('afterbegin', popupHtmlContent)
