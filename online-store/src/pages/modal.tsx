import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import './modal.css';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { refreshCart } from '../store/store';

const style = {
  position: 'absolute' as const,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '640px',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};
const cardTypes = {
  masterCard: {
    name: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjM5NyIgdmlld0JveD0iMCAwIDUxMiAzOTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPjxwYXRoIGQ9Ik05My4wNzkgMzk2LjAyM3YtMjYuMzQzYzAtMTAuMDk4LTYuMTQ3LTE2LjY4NC0xNi42ODQtMTYuNjg0LTUuMjY5IDAtMTAuOTc2IDEuNzU2LTE0LjkyOCA3LjQ2NC0zLjA3My00LjgzLTcuNDY0LTcuNDY0LTE0LjA1LTcuNDY0LTQuMzkgMC04Ljc4MSAxLjMxNy0xMi4yOTMgNi4xNDd2LTUuMjY5aC05LjIydjQyLjE0OWg5LjIydi0yMy4yN2MwLTcuNDY0IDMuOTUxLTEwLjk3NiAxMC4wOTgtMTAuOTc2czkuMjIgMy45NTEgOS4yMiAxMC45NzZ2MjMuMjdoOS4yMnYtMjMuMjdjMC03LjQ2NCA0LjM5LTEwLjk3NiAxMC4wOTgtMTAuOTc2IDYuMTQ3IDAgOS4yMiAzLjk1MSA5LjIyIDEwLjk3NnYyMy4yN2gxMC4wOTh6bTEzNi41NDQtNDIuMTQ5aC0xNC45Mjh2LTEyLjczMmgtOS4yMnYxMi43MzJoLTguMzQydjguMzQyaDguMzQydjE5LjMxOGMwIDkuNjU5IDMuOTUxIDE1LjM2NyAxNC40ODkgMTUuMzY3IDMuOTUxIDAgOC4zNDItMS4zMTcgMTEuNDE1LTMuMDczbC0yLjYzNC03LjkwM2MtMi42MzQgMS43NTYtNS43MDggMi4xOTUtNy45MDMgMi4xOTUtNC4zOSAwLTYuMTQ3LTIuNjM0LTYuMTQ3LTcuMDI1di0xOC44NzloMTQuOTI4di04LjM0MnptNzguMTUxLS44NzhjLTUuMjY5IDAtOC43ODEgMi42MzQtMTAuOTc2IDYuMTQ3di01LjI2OWgtOS4yMnY0Mi4xNDloOS4yMnYtMjMuNzA5YzAtNy4wMjUgMy4wNzMtMTAuOTc2IDguNzgxLTEwLjk3NiAxLjc1NiAwIDMuOTUxLjQzOSA1LjcwOC44NzhsMi42MzQtOC43ODFjLTEuNzU2LS40MzktNC4zOS0uNDM5LTYuMTQ3LS40Mzl6bS0xMTguMTA0IDQuMzljLTQuMzktMy4wNzMtMTAuNTM3LTQuMzktMTcuMTIzLTQuMzktMTAuNTM3IDAtMTcuNTYyIDUuMjY5LTE3LjU2MiAxMy42MTEgMCA3LjAyNSA1LjI2OSAxMC45NzYgMTQuNDg5IDEyLjI5M2w0LjM5LjQzOWM0LjgzLjg3OCA3LjQ2NCAyLjE5NSA3LjQ2NCA0LjM5IDAgMy4wNzMtMy41MTIgNS4yNjktOS42NTkgNS4yNjlzLTEwLjk3Ni0yLjE5NS0xNC4wNS00LjM5bC00LjM5IDcuMDI1YzQuODMgMy41MTIgMTEuNDE1IDUuMjY5IDE4LjAwMSA1LjI2OSAxMi4yOTMgMCAxOS4zMTgtNS43MDggMTkuMzE4LTEzLjYxMSAwLTcuNDY0LTUuNzA4LTExLjQxNS0xNC40ODktMTIuNzMybC00LjM5LS40MzljLTMuOTUxLS40MzktNy4wMjUtMS4zMTctNy4wMjUtMy45NTEgMC0zLjA3MyAzLjA3My00LjgzIDcuOTAzLTQuODMgNS4yNjkgMCAxMC41MzcgMi4xOTUgMTMuMTcxIDMuNTEybDMuOTUxLTcuNDY0em0yNDQuOTktNC4zOWMtNS4yNjkgMC04Ljc4MSAyLjYzNC0xMC45NzYgNi4xNDd2LTUuMjY5aC05LjIydjQyLjE0OWg5LjIydi0yMy43MDljMC03LjAyNSAzLjA3My0xMC45NzYgOC43ODEtMTAuOTc2IDEuNzU2IDAgMy45NTEuNDM5IDUuNzA4Ljg3OGwyLjYzNC04Ljc4MWMtMS43NTYtLjQzOS00LjM5LS40MzktNi4xNDctLjQzOXptLTExNy42NjUgMjEuOTUyYzAgMTIuNzMyIDguNzgxIDIxLjk1MiAyMi4zOTIgMjEuOTUyIDYuMTQ3IDAgMTAuNTM3LTEuMzE3IDE0LjkyOC00LjgzbC00LjM5LTcuNDY0Yy0zLjUxMiAyLjYzNC03LjAyNSAzLjk1MS0xMC45NzYgMy45NTEtNy40NjQgMC0xMi43MzItNS4yNjktMTIuNzMyLTEzLjYxMSAwLTcuOTAzIDUuMjY5LTEzLjE3MSAxMi43MzItMTMuNjExIDMuOTUxIDAgNy40NjQgMS4zMTcgMTAuOTc2IDMuOTUxbDQuMzktNy40NjRjLTQuMzktMy41MTItOC43ODEtNC44My0xNC45MjgtNC44My0xMy42MTEgMC0yMi4zOTIgOS4yMi0yMi4zOTIgMjEuOTUyem04NS4xNzYgMHYtMjEuMDc0aC05LjIydjUuMjY5Yy0zLjA3My0zLjk1MS03LjQ2NC02LjE0Ny0xMy4xNzEtNi4xNDctMTEuODU0IDAtMjEuMDc0IDkuMjItMjEuMDc0IDIxLjk1MiAwIDEyLjczMiA5LjIyIDIxLjk1MiAyMS4wNzQgMjEuOTUyIDYuMTQ3IDAgMTAuNTM3LTIuMTk1IDEzLjE3MS02LjE0N3Y1LjI2OWg5LjIydi0yMS4wNzR6bS0zMy44MDcgMGMwLTcuNDY0IDQuODMtMTMuNjExIDEyLjczMi0xMy42MTEgNy40NjQgMCAxMi43MzIgNS43MDggMTIuNzMyIDEzLjYxMSAwIDcuNDY0LTUuMjY5IDEzLjYxMS0xMi43MzIgMTMuNjExLTcuOTAzLS40MzktMTIuNzMyLTYuMTQ3LTEyLjczMi0xMy42MTF6bS0xMTAuMjAxLTIxLjk1MmMtMTIuMjkzIDAtMjEuMDc0IDguNzgxLTIxLjA3NCAyMS45NTIgMCAxMy4xNzEgOC43ODEgMjEuOTUyIDIxLjUxMyAyMS45NTIgNi4xNDcgMCAxMi4yOTMtMS43NTYgMTcuMTIzLTUuNzA4bC00LjM5LTYuNTg2Yy0zLjUxMiAyLjYzNC03LjkwMyA0LjM5LTEyLjI5MyA0LjM5LTUuNzA4IDAtMTEuNDE1LTIuNjM0LTEyLjczMi0xMC4wOThoMzEuMTczdi0zLjUxMmMuNDM5LTEzLjYxMS03LjQ2NC0yMi4zOTItMTkuMzE4LTIyLjM5MnptMCA3LjkwM2M1LjcwOCAwIDkuNjU5IDMuNTEyIDEwLjUzNyAxMC4wOThoLTIxLjk1MmMuODc4LTUuNzA4IDQuODMtMTAuMDk4IDExLjQxNS0xMC4wOTh6bTIyOC43NDUgMTQuMDV2LTM3Ljc1OGgtOS4yMnYyMS45NTJjLTMuMDczLTMuOTUxLTcuNDY0LTYuMTQ3LTEzLjE3MS02LjE0Ny0xMS44NTQgMC0yMS4wNzQgOS4yMi0yMS4wNzQgMjEuOTUyIDAgMTIuNzMyIDkuMjIgMjEuOTUyIDIxLjA3NCAyMS45NTIgNi4xNDcgMCAxMC41MzctMi4xOTUgMTMuMTcxLTYuMTQ3djUuMjY5aDkuMjJ2LTIxLjA3NHptLTMzLjgwNyAwYzAtNy40NjQgNC44My0xMy42MTEgMTIuNzMyLTEzLjYxMSA3LjQ2NCAwIDEyLjczMiA1LjcwOCAxMi43MzIgMTMuNjExIDAgNy40NjQtNS4yNjkgMTMuNjExLTEyLjczMiAxMy42MTEtNy45MDMtLjQzOS0xMi43MzItNi4xNDctMTIuNzMyLTEzLjYxMXptLTMwOC4yMTMgMHYtMjEuMDc0aC05LjIydjUuMjY5Yy0zLjA3My0zLjk1MS03LjQ2NC02LjE0Ny0xMy4xNzEtNi4xNDctMTEuODU0IDAtMjEuMDc0IDkuMjItMjEuMDc0IDIxLjk1MiAwIDEyLjczMiA5LjIyIDIxLjk1MiAyMS4wNzQgMjEuOTUyIDYuMTQ3IDAgMTAuNTM3LTIuMTk1IDEzLjE3MS02LjE0N3Y1LjI2OWg5LjIydi0yMS4wNzR6bS0zNC4yNDYgMGMwLTcuNDY0IDQuODMtMTMuNjExIDEyLjczMi0xMy42MTEgNy40NjQgMCAxMi43MzIgNS43MDggMTIuNzMyIDEzLjYxMSAwIDcuNDY0LTUuMjY5IDEzLjYxMS0xMi43MzIgMTMuNjExLTcuOTAzLS40MzktMTIuNzMyLTYuMTQ3LTEyLjczMi0xMy42MTF6Ii8+PHBhdGggZmlsbD0iI0ZGNUYwMCIgZD0iTTE4Ni41OTYgMzMuODA3aDEzOC4zMDF2MjQ4LjUwMmgtMTM4LjMwMXoiLz48cGF0aCBkPSJNMTk1LjM3NyAxNTguMDU4YzAtNTAuNDkxIDIzLjcwOS05NS4yNzQgNjAuMTUtMTI0LjI1MS0yNi43ODItMjEuMDc0LTYwLjU4OS0zMy44MDctOTcuNDY5LTMzLjgwNy04Ny4zNzEgMC0xNTguMDU4IDcwLjY4Ny0xNTguMDU4IDE1OC4wNThzNzAuNjg3IDE1OC4wNTggMTU4LjA1OCAxNTguMDU4YzM2Ljg4IDAgNzAuNjg3LTEyLjczMiA5Ny40NjktMzMuODA3LTM2LjQ0MS0yOC41MzgtNjAuMTUtNzMuNzYtNjAuMTUtMTI0LjI1MXoiIGZpbGw9IiNFQjAwMUIiLz48cGF0aCBkPSJNNTExLjQ5MyAxNTguMDU4YzAgODcuMzcxLTcwLjY4NyAxNTguMDU4LTE1OC4wNTggMTU4LjA1OC0zNi44OCAwLTcwLjY4Ny0xMi43MzItOTcuNDY5LTMzLjgwNyAzNi44OC0yOC45NzcgNjAuMTUtNzMuNzYgNjAuMTUtMTI0LjI1MXMtMjMuNzA5LTk1LjI3NC02MC4xNS0xMjQuMjUxYzI2Ljc4Mi0yMS4wNzQgNjAuNTg5LTMzLjgwNyA5Ny40NjktMzMuODA3IDg3LjM3MSAwIDE1OC4wNTggNzEuMTI2IDE1OC4wNTggMTU4LjA1OHoiIGZpbGw9IiNGNzlFMUIiLz48L3N2Zz4=',
    background: 'linear-gradient(25deg, #fbfbfb, #e8e9e5)',
  },
  visaCard: {
    name: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSIxNjZweCIgdmlld0JveD0iMCAwIDUxMiAxNjYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPiAgICA8Zz4gICAgICAgIDxwYXRoIGQ9Ik0yNjQuNzk0MTg3LDExMi40Nzk0OTEgQzI2NC41MDIwNzIsODkuNDQ4NTYxNiAyODUuMzE5MDgsNzYuNTk1NTE5OCAzMDEuMDAxMDIxLDY4Ljk1NDQxNzIgQzMxNy4xMTM0NDcsNjEuMTEzNDQ2NiAzMjIuNTI1MjU0LDU2LjA4NjAwMDggMzIyLjQ2Mzc1Niw0OS4wNzUyNTA3IEMzMjIuMzQwNzYsMzguMzQzODgzMyAzMDkuNjEwNzE0LDMzLjYwODU1MiAyOTcuNjk1NTE0LDMzLjQyNDA1ODYgQzI3Ni45MDkyNTUsMzMuMTAxMTk1MSAyNjQuODI0OTM1LDM5LjAzNTczMzYgMjU1LjIxNTkwMyw0My41MjUwNzM2IEwyNDcuNzI4NTQ1LDguNDg2Njk3NSBDMjU3LjM2ODMyNiw0LjA0MzQ4MDg3IDI3NS4yMTgwNjUsMC4xNjkxMTg5NzIgMjkzLjcyODkwNSwtMS40MjEwODU0N2UtMTQgQzMzNy4xNzcxMDYsLTEuNDIxMDg1NDdlLTE0IDM2NS42MDQ0NjgsMjEuNDQ3MzYwNSAzNjUuNzU4MjEzLDU0LjcwMjMwMDIgQzM2NS45MjczMzIsOTYuOTA1MTcwOSAzMDcuMzgxNDE5LDk5LjI0MjA4NzYgMzA3Ljc4MTE1NCwxMTguMTA2NTQgQzMwNy45MTk1MjQsMTIzLjgyNTgzNiAzMTMuMzc3NDU1LDEyOS45Mjk0OTQgMzI1LjMzODc3OCwxMzEuNDgyMzEzIEMzMzEuMjU3OTQyLDEzMi4yNjY0MSAzNDcuNjAwOTg1LDEzMi44NjYwMTQgMzY2LjEyNzIsMTI0LjMzMzE5MyBMMzczLjM5OTMxNSwxNTguMjMzODYgQzM2My40MzY2NywxNjEuODYyMjMgMzUwLjYyOTc1MiwxNjUuMzM2ODU3IDMzNC42ODY0NDUsMTY1LjMzNjg1NyBDMjkzLjc5MDQwMywxNjUuMzM2ODU3IDI2NS4wMjQ4MDMsMTQzLjU5NzM4MiAyNjQuNzk0MTg3LDExMi40Nzk0OTEgTTQ0My4yNzYyLDE2Mi40MTU3MTEgQzQzNS4zNDI5ODIsMTYyLjQxNTcxMSA0MjguNjU1MDk2LDE1Ny43ODgwMDEgNDI1LjY3MjQ1MiwxNTAuNjg1MDA0IEwzNjMuNjA1Nzg5LDIuNDkwNjYxMjIgTDQwNy4wMjMyNDIsMi40OTA2NjEyMiBMNDE1LjY2MzY4NCwyNi4zNjcxODUyIEw0NjguNzIwOTE4LDI2LjM2NzE4NTIgTDQ3My43MzI5ODksMi40OTA2NjEyMiBMNTEyLDIuNDkwNjYxMjIgTDQ3OC42MDY2OSwxNjIuNDE1NzExIEw0NDMuMjc2MiwxNjIuNDE1NzExIE00NDkuMzQ5MTA4LDExOS4yMTM1MDEgTDQ2MS44NzkyODcsNTkuMTYwODkxMiBMNDI3LjU2MzUxLDU5LjE2MDg5MTIgTDQ0OS4zNDkxMDgsMTE5LjIxMzUwMSBNMjEyLjE1MjA2MywxNjIuNDE1NzExIEwxNzcuOTI4NTMzLDIuNDkwNjYxMjIgTDIxOS4zMDExODMsMi40OTA2NjEyMiBMMjUzLjUwOTMzOSwxNjIuNDE1NzExIEwyMTIuMTUyMDYzLDE2Mi40MTU3MTEgTTE1MC45NDYzNywxNjIuNDE1NzExIEwxMDcuODgyNTMsNTMuNTY0NTkwNyBMOTAuNDYzMjc1NSwxNDYuMTE4NzkyIEM4OC40MTg0NzM0LDE1Ni40NTA0MjMgODAuMzQ2ODg2MSwxNjIuNDE1NzExIDcxLjM4MzU4MDYsMTYyLjQxNTcxMSBMMC45ODM5NjQ5MjcsMTYyLjQxNTcxMSBMMCwxNTcuNzcyNjI2IEMxNC40NTE5ODQ5LDE1NC42MzYyMzggMzAuODcxODk5NiwxNDkuNTc4MDQzIDQwLjgxOTE3LDE0NC4xNjYyMzYgQzQ2LjkwNzQ1MywxNDAuODYwNzI5IDQ4LjY0NDc2NjEsMTM3Ljk3MDMzMiA1MC42NDM0NDQ4LDEzMC4xMTM5ODcgTDgzLjYzNzAxODgsMi40OTA2NjEyMiBMMTI3LjM2MTk2LDIuNDkwNjYxMjIgTDE5NC4zOTQ1NzEsMTYyLjQxNTcxMSBMMTUwLjk0NjM3LDE2Mi40MTU3MTEiIGZpbGw9IiNGRkZGRkYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1Ni4wMDAwMDAsIDgyLjY2ODQyOCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMjU2LjAwMDAwMCwgLTgyLjY2ODQyOCkgIj48L3BhdGg+ICAgIDwvZz48L3N2Zz4=',
    background: `linear-gradient(25deg, #0f509e, #1399cd)`,
  },
  hiperCard: {
    name: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjEyMyIgdmlld0JveD0iMCAwIDUxMiAxMjMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPjxwYXRoIGQ9Ik0zNzQuMTE4IDgwLjg0MmMtNi45NDMgNi43OTctMjYuNDM0IDguNzI4LTI0LjQ0LTcuNTIgMS42NTYtMTMuNDk1IDE2LjM0OC0xNi4zNjMgMzIuMjczLTE0LjQxNC0xLjE4NCA3LjM4MS0yLjU0MiAxNi43NTUtNy44MzMgMjEuOTM0em0tMjEuOTM0LTUyLjY0MWMtLjY2MyAzLjcyMy0xLjY4MSA3LjA5Mi0yLjUwNiAxMC42NTMgNy45NTEtMS45OTMgMzIuNzA5LTguMTA1IDM1LjA5NSAyLjUwNi43OTIgMy41MjYtLjU3NCA3LjI3Mi0xLjU2NyAxMC4wMjgtMjIuMzg5LTIuMTIxLTQwLjYzNiAxLjU5OS00NS40MzUgMTcuNTQ3LTMuMjE0IDEwLjY4Mi4zNiAyMS4xOTQgNy4yMDcgMjQuMTI5IDEzLjE4NyA1LjY0OSAyOS4yMjgtLjgyMiAzNC43ODEtOS43MTQtLjU3NyAzLjA3OC0xLjEyMyA2LjE4Ny0uOTQgMTAuMDI2aDExLjU5NGMuMTIzLTExLjEwMyAxLjczOS0yMC4wOTEgMy40NDctMzAuMDgyIDEuNDU2LTguNTA4IDQuMTk1LTE2LjkzMSAzLjc1OS0yNC40NC0uOTk1LTE3LjE5Ny0yOS40ODYtMTEuMTE0LTQ1LjQzNC0xMC42NTN6bTExNi4yNDkgNTcuOTY4Yy05LjA3LjE5NS0xMy41OC01LjQxOS0xMy43ODctMTQuNzI2LS4zNjEtMTYuMzAxIDYuNzg5LTM0LjQxMSAyMS4zMDctMzYuMDM1IDYuNzYtLjc1NiAxMS42NTQuODE2IDE2LjYwNyAyLjUwOC00LjU0NyAxOC4zMS0yLjkwNSA0Ny43OTktMjQuMTI4IDQ4LjI1NHptMzAuMDgxLTg2LjE2OWMtMS4xNTUgMTAuMTI1LTIuNjk5IDE5Ljg2Mi00LjY5OSAyOS4xNC0zMy4wNTEtMTAuNDYxLTUzLjMyIDEzLjg1NS01Mi45NTYgNDMuODY4LjA3MiA1LjgwNSAxLjA3MSAxMS41NjEgNC43MDEgMTUuNjY3IDYuMjU2IDcuMDc2IDI0LjE3IDguNzY4IDMzLjIxNCAyLjgyMSAxLjc1Mi0xLjE1MSAzLjU0LTMuMjQ2IDQuNzAxLTQuNy44NzEtMS4wOTUgMi4yNTYtMy45NTkgMi41MDUtMy4xMzUtLjQ3NCAzLjE4Mi0xLjE4NSA2LjEyNy0xLjI1MiA5LjcxNWgxMi4yMmMyLjM1NC0zMy43ODQgOS42MzctNjIuNjQxIDE1LjA0LTkzLjM3NmgtMTMuNDc1em0tMzQ0Ljk4OSA4MS4xNTZjLTcuMjA5IDcuNjM1LTI0LjkzMSA3LjUxOC0yNi4zMi01LjMyOC0uNjA2LTUuNTg5IDEuNDc3LTExLjQ1IDIuNTA2LTE3LjIzMyAxLjA0MS01Ljg1MyAxLjc5MS0xMS40NjkgMi44MTktMTYuNjA5IDcuMS04LjY3IDI3Ljk2NS05LjcxNiAzMC4wODIgNC43MDEgMS44MzcgMTIuNTE3LTMuMTE3IDI4LjE0NS05LjA4NyAzNC40Njh6bTEwLjY1NC01Mi45NTVjLTExLjQwNC00LjI4NC0yNS4zMDMuODMtMzEuMzI4IDUuNjk0LjAyMS4yMTQtLjE0NC4yNDMtLjMyMS4yNTlsLjMyMS0uMjU5LS4wMDctLjA1NC45NC01LjY0aC0xMS41OTRjLTQuODMxIDMyLjE0My0xMC41NjEgNjMuMzg3LTE2LjYwNyA5NC4zMTZoMTMuNDczYzEuOTUtMTIuMDQ2IDMuMjM5LTI0Ljc1MyA1Ljk1NC0zNi4wMzQgMy4wNzcgMTEuODY1IDIzLjE2OSA5LjU5NyAzMS42NDcgNS4wMTQgMTcuNDk0LTkuNDYgMzAuOTg3LTU0LjQ4MSA3LjUyMS02My4yOTZ6bTYzLjkyMSAyMi41NjFoLTMxLjY0N2MxLjAwMS03LjI3NiA3LjU0Ny0xNS4yNzMgMTcuODU5LTE1LjY2NyA5LjcwNy0uMzcxIDE2LjY1NiAzLjU2NCAxMy43ODcgMTUuNjY3em0tMTIuODQ3LTIzLjgxNGMtOS43MzYuNzQ5LTE3Ljk2NSAzLjU1MS0yMy44MTQgOS43MTMtNy4xNzMgNy41NTgtMTIuOTgzIDI0LjI2Ni0xMS4yODEgMzkuNDgyIDIuNDI4IDIxLjcwOCAyOS40NTcgMjAuOTI5IDUxLjA3NSAxNS42NjcuMzY3LTMuODA5IDEuMjktNy4wNjYgMS44OC0xMC42NTMtOC45MDYgMy4zMzItMjQuMzY4IDcuOTg0LTMzLjUyOCAyLjE5NC02LjkxNS00LjM3My02Ljk1Ni0xNS40NDYtNC43LTI1LjA2OCAxNC41MjktLjQ2MiAyOS42MzEtLjM3NCA0NC4xODEgMCAuOTIzLTYuODIxIDMuNTY1LTE0LjI1NyAxLjI1My0yMC45OTMtMy4wNDktOC44OTQtMTMuOTYxLTExLjE5Ni0yNS4wNjctMTAuMzR6bS0xMTguNDQzIDEuMjUzYy0uMzY1LjA1Mi0uMzQxLjQ5NS0uMzE0LjkzOS0yLjk2OSAyMi4yMDMtNi45ODYgNDMuMzU4LTExLjI4IDY0LjIzNmgxMy40NzNjMy4yMzgtMjIuMzUyIDYuOTQ2LTQ0LjIzMyAxMS41OTQtNjUuMTc1aC0xMy40NzN6bTM1MS41Ny4zMTNjLTExLjkwOS01Ljk1My0yMS44MjIgNC4wMzctMjUuNjkzIDEwLjAyNyAxLjEwMi0zLjA3MyAxLjE2Ni03LjE4OCAyLjE5Mi0xMC4zMzloLTExLjkwN2MtMy4yMSAyMi4zNzktNy4wODEgNDQuMDk4LTExLjU5NCA2NS4xNzVoMTMuNzg3Yy4wODgtOC42MzggMS43ODQtMTUuMDI4IDMuMTMzLTIzLjUwMSAyLjg4Mi0xOC4wODggNy4xMTEtMzcuOTI2IDI4LjIwMi0zMS45Ni43LTMuMDYuOTktNi41MyAxLjg4LTkuNDAxem0tMTUxLjM0NSA0OS41MDhjLTEuMjQxLTMuMjA4LTEuNTYzLTguNTA3LTEuMjUzLTEyLjUzNC42OTctOS4wNTQgMy45OTYtMjAuMDc3IDkuMDg3LTI1LjA2NyA3LjAyNi02Ljg4OCAyMC44OTctNS43NDggMzEuOTYtMS44ODEuMzQzLTMuNzI5IDEuMDkzLTcuMDU0IDEuNTY3LTEwLjY1Mi0xOC4xNDUtMi45NjQtMzUuMzY1LTEuMTIxLTQ0LjQ5NCA4LjQ1OS04LjkzNiA5LjM3OC0xNC43OTYgMzAuOTMyLTEwLjY1NCA0NC40OTQgNC44NDggMTUuODcgMjYuNTgzIDE2LjczMyA0NC4xODMgMTAuNjU0Ljc3Ny0zLjE5IDEuMTktNi43NDYgMS44OC0xMC4wMjgtOS42MTYgNC45OTctMjguMDAxIDcuNTkzLTMyLjI3Ni0zLjQ0N3ptLTcuNTE5LTQ5LjgyMWMtMTEuOTQ4LTQuODI1LTIxLjMzOSAzLjMyOS0yNS42OTMgMTAuOTY3Ljk4Ny0zLjM5OCAxLjM5NC03LjM3OCAyLjE5Mi0xMC45NjdoLTExLjkwN2MtMi45MSAyMi41NzUtNy4yMDEgNDMuNzY5LTExLjI4IDY1LjE3NWgxMy40NzVjMS44ODgtMTIuNzA3IDIuNzAzLTI5LjgzNCA2Ljg5Mi00MS45ODggMy4zNDgtOS43MTMgMTIuMTExLTE3Ljk4NyAyNC43NTQtMTMuNDczLjE3OC0zLjU4MyAxLjIwMy02LjMxOCAxLjU2Ny05LjcxNHptLTIxNy4xNDYtMjYuMzIxYy0xLjkyNSAxMi40ODktNC4wOTMgMjQuNzM1LTYuMjY3IDM2Ljk3NC0xMy45NTkuMTQ3LTI4LjIxMS42OS00MS42NzQtLjMxNCAyLjU0My0xMS45NzMgNC4zNjctMjQuNjY4IDYuODkyLTM2LjY2aC0xNS4wMzljLTUuMzg1IDMwLjU0Ny0xMC4yODIgNjEuNTc5LTE2LjI5NCA5MS40OTdoMTUuMzUzYzIuNDA5LTE1LjM0OCA0LjY2MS0zMC44NTIgNy44MzMtNDUuNDM1IDEzLjA5MS0uMzIyIDI4Ljc4MS0uODg1IDQxLjM2Mi4zMTQtMi41OTQgMTUuMTYyLTUuNzI4IDI5Ljc4My04LjE0NyA0NS4xMjFoMTUuMzU0YzQuOTMyLTMwLjk5NyAxMC4xMzEtNjEuNzI4IDE2LjI5NC05MS40OTdoLTE1LjY2N3ptMzguMjI3IDEzLjc4N2MyLjY4Ni0xLjg0OSA2LjE0NS0xMC4yNzggMi4xOTQtMTMuNzg3LTEuMjUyLTEuMTExLTMuMzQ3LTEuNDMzLTYuMjY3LS45MzktMi43MS40NTctNC4yNjggMS4zNzctNS4zMjcgMi44MTktMS43MDMgMi4zMTktMy4yNjMgOS4zMS0uNjI4IDExLjkwNyAyLjU2NyAyLjUyOSA4LjMxOCAxLjE3NyAxMC4wMjggMHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
    background: 'linear-gradient(25deg, #8b181b, #de1f27)',
  },
  defaultCard: {
    name: '',
    background: '',
  },
};
const checkCardTypes = (cardNum: string) => {
  let cardUrl: { name: string; background: string } = {
    name: '',
    background: '',
  };
  switch (cardNum) {
    case '4':
      cardUrl = cardTypes.visaCard;
      break;
    case '5':
      cardUrl = cardTypes.masterCard;
      break;
    case '6':
      cardUrl = cardTypes.hiperCard;
      break;
    default:
      cardUrl = {
        name: '',
        background: '',
      };
      break;
  }
  return cardUrl;
};

export default function BasicModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nameValid, setName] = React.useState({ value: '', valid: false });
  const [phoneValid, setPhone] = React.useState({ value: '', valid: false });
  const [adressValid, setAdress] = React.useState({ value: '', valid: false });
  const [emailValid, setEmail] = React.useState({ value: '', valid: false });
  const [cardNumber, setCardNumber] = React.useState({
    value: '',
    valid: false,
    cardType: {
      name: '',
      background: '',
    },
  });
  const [cardDate, setCardDate] = React.useState({ value: '', valid: false });
  const [cardCVV, setCardCVV] = React.useState({ value: '', valid: false });

  const [seconds, setSeconds] = React.useState(3);
  const [timerActive, setTimerActive] = React.useState(false);

  React.useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
      setSeconds(3);
    }
  }, [seconds, timerActive]);
  React.useEffect(() => {
    if (seconds < 1) {
      navigate('/');
      dispatch(refreshCart(isValid));
    }
  });
  const fields = [nameValid, phoneValid, adressValid, emailValid, cardNumber, cardDate, cardCVV];
  const isValid = fields.every((item) => item.valid);

  const func = () => {
    handleOpen();
    navigate('/cart/');
  };
  const nameValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (
      newName.split(' ').length > 1 &&
      newName
        .split(' ')
        .every(
          (item) => item.length > 2 && item[0] === item[0].toUpperCase() && item.match(/[a-zA-Z]/g)
        )
    ) {
      setName({ value: newName, valid: true });
    } else {
      setName({ value: newName, valid: false });
    }
  };
  const phoneValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value.replace(/[^0-9+ ]/g, '');
    if (
      phoneNumber[0] === '+' &&
      phoneNumber.split('+').length === 2 &&
      phoneNumber.match(/[0-9+]/g) &&
      phoneNumber.length > 10
    ) {
      setPhone({ value: phoneNumber, valid: true });
    } else {
      setPhone({ value: phoneNumber, valid: false });
    }
  };
  const deliveryValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const adress = event.target.value;
    if (adress.match(/[a-zA-Z0-9_]{5,}/g) && adress!.match(/[a-zA-Z0-9_]{5,}/g)!.length > 2) {
      setAdress({ value: adress, valid: true });
    } else {
      setAdress({ value: adress, valid: false });
    }
  };
  const emailValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    if (newEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmail({
        value: newEmail,
        valid: true,
      });
    } else {
      setEmail({
        value: newEmail,
        valid: false,
      });
    }
  };
  const cardNumberValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newNumber = event.target.value.replace(/[^0-9]/g, '').substring(0, 16);
    newNumber = newNumber != '' ? newNumber!.match(/.{1,4}/g)!.join(' ') : '';
    const cardBackground = checkCardTypes(newNumber[0]);
    setCardNumber({
      value: newNumber,
      valid: true,
      cardType: cardBackground,
    });
    if (newNumber.length === 19) {
      setCardNumber({
        value: newNumber,
        valid: true,
        cardType: cardBackground,
      });
    } else {
      setCardNumber({
        value: newNumber,
        valid: false,
        cardType: cardBackground,
      });
    }
  };
  const cardDataValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = new Date().getFullYear().toString().substring(2, 4);
    const availability = Number(year) + 6;
    let date = event.target.value.replace(/[^0-9]/g, '').substring(0, 4);
    date = date != '' ? date!.match(/.{1,2}/g)!.join('/') : '';
    const cardMonth = Number(date.substring(0, 2));
    const cardYear = Number(date.substring(3, 5));
    if (date.length === 5) {
      if (
        1 <= cardMonth &&
        cardMonth <= 12 &&
        Number(year) <= cardYear &&
        cardYear <= availability
      ) {
        setCardDate({ value: date, valid: true });
      } else {
        setCardDate({ value: date, valid: false });
      }
    } else {
      setCardDate({ value: date, valid: false });
    }
  };
  const cardCvvValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cvv = event.target.value.replace(/[^0-9]/g, '').substring(0, 3);
    setCardCVV({
      value: cvv,
      valid: cvv.length !== 3 ? false : true,
    });
  };
  return (
    <div>
      <Button onClick={func}>BUY NOW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="card-modal">
          <form className="card-form">
            Personal details
            <TextField
              id="name-field"
              label="Name"
              variant="filled"
              value={nameValid.value}
              helperText={
                !nameValid.valid && nameValid.value.length > 0
                  ? 'Incorrect name'
                  : 'Enter your name'
              }
              color={nameValid.valid ? 'success' : 'warning'}
              focused
              required
              className="input name-input"
              onChange={nameValidate}
              error={!nameValid.valid && nameValid.value.length > 0}
            />
            <TextField
              id="phone-field"
              label="Phone"
              variant="filled"
              type="text"
              className="input phone-input"
              inputProps={{
                minLength: 9,
              }}
              required
              focused
              value={phoneValid.value}
              onChange={phoneValidate}
              helperText={
                !phoneValid.valid && phoneValid.value.length > 0
                  ? 'Incorrect phone'
                  : 'Enter your phone'
              }
              color={phoneValid.valid ? 'success' : 'warning'}
              error={!phoneValid.valid && phoneValid.value.length > 0}
            />
            <TextField
              id="delivery-field"
              label="Delivery"
              variant="filled"
              className="input delivery-input"
              required
              focused
              value={adressValid.value}
              onChange={deliveryValidate}
              helperText={
                !adressValid.valid && adressValid.value.length > 0
                  ? 'Incorrect adress'
                  : 'Enter your adress'
              }
              color={adressValid.valid ? 'success' : 'warning'}
              error={!adressValid.valid && adressValid.value.length > 0}
            />
            <TextField
              id="email-field"
              label="Email"
              variant="filled"
              type="email"
              className="input email-input"
              required
              focused
              value={emailValid.value}
              onChange={emailValidate}
              helperText={
                !emailValid.valid && emailValid.value.length > 0
                  ? 'Incorrect email'
                  : 'Enter your email'
              }
              color={emailValid.valid ? 'success' : 'warning'}
              error={!emailValid.valid && emailValid.value.length > 0}
            />
            <div className="card">
              <div className="card-header">Credit card details</div>
              <div className="card-info" style={{ background: cardNumber.cardType.background }}>
                <div
                  className="card-type"
                  style={{
                    backgroundImage: `url(${cardNumber.cardType.name})`,
                  }}
                ></div>
                <TextField
                  id="card-number"
                  label="Card number"
                  variant="filled"
                  required
                  focused
                  placeholder="Ex.4 , 5 , 6"
                  className="input card-input"
                  value={cardNumber.value}
                  onChange={cardNumberValidate}
                  helperText={
                    !cardNumber.valid && cardNumber.value.length > 0
                      ? 'Incorrect card number'
                      : 'Enter your card number'
                  }
                  color={cardNumber.valid ? 'success' : 'warning'}
                  error={!cardNumber.valid && cardNumber.value.length > 0}
                />
                <div className="card-addinitional">
                  <div className="card-date">
                    <TextField
                      id="card-date"
                      label="Date"
                      variant="filled"
                      required
                      inputProps={{ patten: /^[0-9]{2}[/]{1}[0-9]{2}/ }}
                      className="input data-input"
                      onChange={cardDataValidate}
                      value={cardDate.value}
                      focused
                      helperText={
                        !cardDate.valid && cardDate.value.length > 0
                          ? 'Incorrect card date'
                          : 'Enter your card date'
                      }
                      color={cardDate.valid ? 'success' : 'warning'}
                      error={!cardDate.valid && cardDate.value.length > 0}
                    />
                  </div>
                  <div className="card-cvv">
                    <TextField
                      id="card-cvv"
                      label="CVV"
                      required
                      variant="filled"
                      className="input cvv-input"
                      inputProps={{ patten: /^[0-9]{3}/ }}
                      focused
                      onChange={cardCvvValidate}
                      value={cardCVV.value}
                      helperText={
                        !cardCVV.valid && cardCVV.value.length > 0
                          ? 'Incorrect card date'
                          : 'Enter your card date'
                      }
                      color={cardCVV.valid ? 'success' : 'warning'}
                      error={!cardCVV.valid && cardCVV.value.length > 0}
                    />
                  </div>
                </div>
              </div>
            </div>
            {isValid ? (
              <Button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  setTimerActive(!timerActive);
                }}
              >
                BUY
              </Button>
            ) : (
              <Button type="submit" disabled>
                BUY
              </Button>
            )}
          </form>
          {timerActive ? (
            <div className="redirect">
              Thanks for your order. Redirect to the store after {seconds} sec{' '}
            </div>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </div>
  );
}
