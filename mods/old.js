const STYLE = `
html, body {
	width:  100%;
	min-height: 100vh;
	margin: 0;
	scrollbar-color: var(--theme-dark) var(--theme-darker);
}
html.homepage, body.homepage {
	max-width: 100vw;
	overflow-x: hidden;
}
html {
	background-color: #000000;
	background-color: var(--theme-darkest2);
}
:root {
	--theme: rgb(127, 127, 127);

	--theme-dark: rgb(63.5, 63.5, 63.5); /* color/2 */

	--theme-darker: rgb(25, 25, 25); /* color/5 */
	--theme-darker-opac85: rgba(25, 25, 25, 0.85);

	--theme-darkest: rgb(0, 0, 0); /* color-127 */
	--theme-darkest2: rgb(0, 0, 0); /* color-191 */

	--theme-opac85: rgba(127, 127, 127, 0.85);
	--theme-opac75: rgba(127, 127, 127, 0.75);
	--theme-opac50: rgba(127, 127, 127, 0.5);
	--theme-opac25: rgba(127, 127, 127, 0.25);
	--theme-opac10: rgba(127, 127, 127, 0.1);
}
/* Load the font PressStart2P-Regular.ttf */
@font-face {
	font-family: 'Press Start 2P';
	src: url('fonts/PressStart2P-Regular.ttf');
}
@font-face {
	font-family: 'VT323';
	src: url('fonts/VT323-Regular.ttf');
}
body {
	font-family: 'Press Start 2P', 'VT323', Arial;
	background-color: var(--theme-darkest2);
	color: #ffffff;
	caret-color: #e6d577;
}
html.standalone, html.standalone body {
	background-color: var(--theme-darkest);
}
::-moz-selection {
	background: #948a54;
}
::selection {
	background: #948a54;
}
.pagetitle {
	padding: 10px;
	padding-bottom: 0px;
	font-size: 0.75em;
	position: absolute;
	top: 0;
	left: 0;
}
a, .saveOption {color: rgb(255, 0, 255);text-decoration: none;}
a:hover, .saveOption:hover {filter: brightness(200%);}
a:active, a:hover:active, .saveOption:active, .saveOption:hover:active {filter: brightness(275%);}
a:hover { text-decoration: underline; }
#gameDiv { /*game canvas*/
	border: 3px solid var(--theme-opac85);
	position: relative;
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none;
	/* margin-top: 15px; */
	max-width: 100vw;
}
#gameDiv.gameDiv-wide {
  border: none !important;
  margin-top: 55px;
}
.standalone #gameDiv.gameDiv-wide {
  margin-top: 0!important
}
#game {
	image-rendering: pixelated;
	max-width: 100vw;
	max-height: 100vh;
    transform: translateX(-50%);
    left: 50%;
    position: relative;
}
#bottomInfoBox { /* place under the game canvas */
	margin: 1.5em 50px 0px 50px;
	font-family: 'Arial';
}
#bottomTopBox {
	text-align: center;
}
#bottomTopBoxColumns {
	display:flex; justify-content: space-around
}
@media screen and (max-width: 1300px) {
	#bottomTopBoxColumns {
		display:block; justify-content: unset;
	}
}
@media screen and (min-width: 1300px) {
	#newsletterFrame {
		border: none!important;
	}
}
#bottomLeftBox {
	float: left;
	width: 50%;
	text-align: left;
}
#bottomRightBox {
	float: right;
	width: 50%;
	text-align: right;
}
table {
	border-collapse: collapse;
	background-color: var(--theme-darker);
}
#controlsTable {
	width: 75%;
	margin-left: auto;
	margin-right: 0px;
}
/* alternating table row colors */
tr:nth-child(even) {
	background-color: var(--theme-darkest);
}
th, td {
	text-align: left;
	padding: 8px;
	border: 3px solid var(--theme);
}
kbd {
	/* Look like a button */
	display: inline-block;
	padding: 0.2em 0.6em 0.3em;
	font-size: 90%;
	font-weight: 700;
	color: rgb(255, 255, 255);
	background-color: rgb(95, 95, 95);
	border-radius: 0;
	border: 1px solid #000;
	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 2px rgba(0, 0, 0, 0.05);
	font-family: 'Arial';
	cursor: pointer;
}
kbd:active {filter: brightness(70%);}
#infoParent, #modParent, #settingsParent, .menuParent {
	display: none;
	position: absolute;
	border: 4px solid var(--theme);
	left: 50%;
	top: 5%;
	transform: translate(-50%, 0%);
	width: 95%;
	height: 60%;
	max-width: 700px;
	max-height: 450px;
	background-color: var(--theme-darker-opac85);
	backdrop-filter: blur(3px);
	z-index:99999
}
#infoScreen, #modManager, #settingsMenu, .menuScreen {
	position: absolute;
	height:calc(100% - 20px);
	width:calc(100% - 20px);
	padding: 10px;

	/* background-color: rgb(31, 31, 31); */
	overflow-x: hidden;
	z-index: 10;
}
#settingsParent, #savesParent, #savePromptParent {
	height: 85%;
	max-height: 623px;
}
.standalone #settingsParent {
	height: 100%;
}
#saveTags .toggleInput {
	margin-bottom: 4px;
}
#promptParent {
	height: 50%;
}
#infoSearch, #modManagerUrl, #promptInput {
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: calc(100% - 16px);
	max-width: 700px;
	height: 50px;
	background-color: var(--theme-dark);
	color: white;
	font-size: 1.5em;
	padding: 8px;
	font-family: 'Press Start 2P';
	z-index: 11;
	border: none;
	margin-left: 0;
	margin-right: 0;
}
#infoSearch:focus, #modManagerUrl:focus, #promptInput:focus {
	outline: none;
}
.menuTitle {
	font-size: 1.5em;
	text-decoration: underline;
}
.menuText {
	margin-top: 5px;
	line-height: 1.5em;
}
#infoText {
	white-space: pre-wrap;
}
.XButton {
	position: absolute;
	right: 0px;
	top: 0px;
	font-size: 2em;
	background-color: rgb(100, 33, 33);
	padding:5px;
	text-align:center;
	border: 4px solid var(--theme);
	border-top: none;
	border-right: none;
	z-index: 12;
}
.XButton:hover {
	background-color: rgb(200, 33, 33);
}
#promptMenuText {
	-webkit-user-select: text; /* Safari */
	-khtml-user-select: unset; /* Konqueror HTML */
	-moz-user-select: unset; /* Old versions of Firefox */
	-ms-user-select: unset; /* Internet Explorer/Edge */
	user-select: text;
}
/*#modManagerAdd {
	position: absolute;
	bottom: 25%;
	right: 25%;
	height: 50px;
	width: 50px;
	transform: translate(-25%, -25%);
	background-color: rgb(0, 190, 32);
	color: white;
	font-size: 2em;
	padding: 10px;
	font-family: 'Press Start 2P';
}*/
#modManagerList {
	margin-top: 20px;
}
#modManagerTagline {
	margin-bottom: 4em;
}
#modManagerList li {
	list-style-type: none;
	position: relative;
}
#modManagerList li::before {
	content: '•';
	position: absolute;
	left: -1.5em;
	font-size: 1em;
	font-family: 'Press Start 2P';
}
.removeModX {
	color: red;
	cursor: pointer;
}
.removeModX:hover {
	color: rgb(255, 107, 107);
}
.infoLink {
	color: rgb(116, 140, 221);
	cursor: pointer;
	text-decoration: underline;
}
.saveSlot {
	display: block;
	border-bottom: solid var(--theme);
	padding-top: 1em;
	padding-bottom: 1em;
	padding-left: 1em;
	position: relative;
	z-index: 20;
}
/* .saveSlot:last-child {
	border-bottom: solid var(--theme);
} */
.saveSlotName, .saveSlotSub {
	display: block;
	line-break: anywhere;
	z-index: 25;
	position: relative;
}
.saveSlotSub {
	color: var(--theme);
}
.saveSlotOptions {
	display: block;
    padding-top: 0.5em;
	z-index: 25;
	position: relative;
}
.saveSlotImage {
	background-color: black;
    position: absolute;
    height: 100%;
    top: 0;
    /* transform: translateY(-50%); */
    right: 0;
    z-index: 21;
    border-left: 2px dashed var(--theme-dark);
}
.saveSlot.current .saveSlotName {
	text-decoration: underline;
}
.saveOption {
	padding-right: 1em;
	color: #ff00ff;
	cursor: pointer;
}
.saveOptionLoad { color:#5fb0ff }
.saveOptionSave { color:#9cff5f }
.saveOptionClear { color:#ff5f5f }
.saveOption[disabled="true"] {
	color: gray;
	cursor: not-allowed;
}
.saveOption[disabled="true"]:hover {
	filter: none
}
.menuBottomButton {
	left: 0;
	width: 100%;
}
#saveFile, #loadFile, #saveConfirm, #promptOK, .promptOK, #promptCancel, #promptConfirm, .menuBottomButton {
	background-color: var(--theme-darkest2);
	text-align: center;
	vertical-align: middle;
	height: 3em;
	line-height: 3em;
	position:absolute;
	bottom: 0;
	cursor: pointer;
	border-top: 4px solid var(--theme);
	z-index: 30;
}
#saveConfirm, #promptOK, .promptOK, .promptChoices {
	bottom: 0;
	position: fixed;
}
span.danger {
	color: red
}
#saveFile, #promptCancel, .menuBottomButton.halfLeft {
	left: 0;
	width: 50%;
}
#loadFile, #promptConfirm, .menuBottomButton.halfRight {
	left: unset;
	right: 0;
	width: 50%;
	border-left: 4px solid var(--theme);
}
#saveConfirm, #promptOK, .promptOK, .promptChoices {
	left: 0;
	width: 100%;
}
.promptChoices .promptChoice {
	background-color: var(--theme-darkest2);
	text-align: center;
	height: 3em;
	line-height: 3em;
	width: 100%;
	display: block;
	cursor: pointer;
	border-top: 4px solid var(--theme);
}
.promptChoices .promptChoicesSub {
	display: flex;
    flex-direction: row;
}
button, input[type="submit"], input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	vertical-align: middle;
}
.usingTab button:focus {
	filter: brightness(75%);
	outline: none;
}
#underBox {
	position: relative;
	left: 50%;
	transform: translate(-50%, -0%);
	margin-top: 10px;
	width: 100%;
}
#underDiv {
	background-color: var(--theme-darkest);
}
#controls button {
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 1em;
	text-shadow: 0.5px 1px 4px #000000;
	color: rgba(255, 255, 255, 0.85);
	border: 2px solid var(--theme-opac85);
	margin: 0px 2px 4px 2px;
	font-variant: small-caps;
	z-index: 15;
}
#controls button.bright {
	text-shadow: 0.5px 1px 4px #ffffff;
	color: rgba(0, 0, 0, 0.85);
}
/*Darken when active*/
#controls button:active, #controls button:active:hover {
	filter: brightness(60%);
	z-index: 14;
}
#controls button:hover {
	filter: brightness(90%);
}
#controls button:disabled {
	cursor: not-allowed;
	z-index: 13;
}
button, input[type="button"] {
	transition: 0.2s;
	transition-property: transform;
}
/* #controls .elementButton:active, #controls .elementButton:active:hover */
button:active, button:active:hover,
input[type="button"]:active, input[type="button"]:active:hover {
	transform: scale(0.95);
}
#controls button[current="true"], #controls button[on="true"] {
	/* border: 2px solid #ffffff; */
	filter: brightness(110%);
	/* box-shadow: 0 5px 15px rgba(255, 255, 255, .4); */
	color: rgba(255, 255, 255, 1);
}
#controls .elementButton[current="true"] {
	/* border: 2px solid #5ee05e; */
	border-color:#5ee05e!important;
	box-shadow: 0px 1px 15px rgba(0, 255, 0, .75);
}
#controls .elementButton[modified="true"] {
	border-color:#0d62ff!important;
}
#controls button.bright[current="true"] {
	color: rgba(0, 0, 0, 1);
}
#controls button[on="true"] {
	border-color:#5ee05e;
	color:#5ee05e;
}
#controls div {
	display: -webkit-box;	  /* OLD - iOS 6-, Safari 3.1-6 */
	display: -moz-box;		 /* OLD - Firefox 19- (buggy but mostly works) */
	display: -ms-flexbox;	  /* TWEENER - IE 10 */
	display: -webkit-flex;	 /* NEW - Chrome */
	display:flex;
}
.stat {
	margin-right: 25px;
	margin-bottom: 5px;
	float:right;
}
#stats {
	padding: 0px 5px 0px 5px;
	font-size: 0.75em;
	height: 1.5em;
	line-height: 1.5em;
	/* width:calc(100% - 5px); */
	/* no wrapping */
	white-space: nowrap;
	overflow-x: hidden;
	overflow-y: hidden;
	background-color: var(--theme-darkest2);
}
#stat-pos, #stat-pixels, #stat-shift, #stat-tps, #stat-ticks, #stat-view {
	float:left;
}
#stat-element {
	margin-right:10px
}
#stats span {
	background-color: rgba(0,0,0,0.1);
}
#stat-view, #stat-element span {
	text-transform: uppercase;
}
.redText {
	color: red;
}
.categoryName {
	font-size: 0.75em;
	text-transform: uppercase;
	margin-left: 5px;
	vertical-align: middle;
}
#extraInfo {
	margin:5px;
	margin-bottom: 0;
	padding-bottom: 5px;
}
#extraInfo small, #extraInfo p {
	display: inline-block;
	margin-top: 0;
	margin-bottom: 0;
	margin-right: 1em;
}
#extraInfo small {
	margin-bottom: 10px;
}
#extraInfo #extraLinks {
	display: flex;
	flex-direction: row;
	width: 100%;
	margin-top: 15px;
	flex-wrap: wrap;
	justify-content: space-evenly;
}
#extraLinks a {
	text-align: center;
}
.gameDiv-wide .extraInfo-right {
	float:right
}
#toolControls, #category-tools {
	white-space: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	width: 100%;
	display: flex;
	justify-content: flex-start;
}
#toolControls button, #category-tools button {
	flex-grow: 1;
}
#toolControls button {
	background-color: var(--theme-darkest2);
}
#elementControls {
	flex-direction: column;
}
#category-tools {
	display: flex;
}
#category-edit {
	display: none;
	flex-wrap: wrap;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}
#category-edit .close {
	color: rgb(255, 100, 100)
}

/* Scrollbars */

#toolControls, #category-tools, #categoryControls, #elementControls {
	scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.1);
	scrollbar-width: thin;
}

@media screen and (max-width: 700px) {
	#toolControls, #category-tools, #categoryControls, #elementControls {
	margin-bottom: 5px !important;
	}
}

#toolControls::-webkit-scrollbar, #category-tools::-webkit-scrollbar, #categoryControls::-webkit-scrollbar, #elementControls::-webkit-scrollbar {
	width: 5px;
	height: 8px;
	background-color: rgba(255, 255, 255, 0.15);
}
#toolControls::-webkit-scrollbar-thumb, #category-tools::-webkit-scrollbar-thumb, #categoryControls::-webkit-scrollbar-thumb, #elementControls::-webkit-scrollbar-thumb {
	background-color: rgba(255, 255, 255, 0.25);
	border-radius: 5px;
}
#toolControls::-webkit-scrollbar-track, #category-tools::-webkit-scrollbar-track, #categoryControls::-webkit-scrollbar-track, #elementControls::-webkit-scrollbar-track {
	box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.15);
	border-radius: 10px;
}
#toolControls::-webkit-scrollbar-thumb:hover, #category-tools::-webkit-scrollbar-thumb:hover, #categoryControls::-webkit-scrollbar-thumb:hover, #elementControls::-webkit-scrollbar-thumb:hover {
	background-color: rgba(255, 255, 255, 0.3);
}

#toolControls {
	z-index: 3;
}
#category-tools {
	z-index: 2;
}

#categoryControls {
	margin-bottom: 5px;
	background-color: var(--theme-darker);
	white-space: nowrap;
	overflow-x: auto;
	flex-wrap: wrap;
	overflow-y: hidden;
	width: 100%;
	position: relative;
	z-index: 1;
	display: -webkit-box;	  /* OLD - iOS 6-, Safari 3.1-6 */
	display: -moz-box;		 /* OLD - Firefox 19- (buggy but mostly works) */
	display: -ms-flexbox;	  /* TWEENER - IE 10 */
	display: -webkit-flex;	 /* NEW - Chrome */
	display:flex;
}
#categoryControls button {
	/* Borderless buttons */
	border: none;
	border-radius: 0;
	padding-left: 3px;
	padding-right: 3px;
	margin: 0;
	padding-top: 5px;
	padding-bottom: 5px;
	display: inline-block;
	position: relative;
	z-index:0;
	flex-grow: 1;
	/* border-bottom: 2px solid rgba(255, 255, 255, 0.2); */
	border-bottom: 2px solid var(--theme-dark);
	background-color: var(--theme-darker);
}
#categoryControls button:not(:last-child) {
	border-right: 2px solid var(--theme-dark);
}
#categoryControls button[current="true"] {
	background-color: var(--theme-opac85);
}
.category {
	margin-top:0.25em;
	margin-bottom:0.25em;
	position:relative;
	display: -webkit-box;	  /* OLD - iOS 6-, Safari 3.1-6 */
	display: -moz-box;		 /* OLD - Firefox 19- (buggy but mostly works) */
	display: -ms-flexbox;	  /* TWEENER - IE 10 */
	display: -webkit-flex;	 /* NEW - Chrome */
	display:flex;
	flex-direction: row;
	text-align:center;
	justify-content:space-evenly;
	flex-wrap:wrap;
}
.category button {
	flex-grow: 1;
}
.category:after {
	content: "";
	flex-grow: 20
}

/* screen size < 800px */
@media screen and (max-width: 800px) { /* Mobile Styles */
	.pagetitle {
		font-size: 1em;
		padding-left: 0.25em;
	}
	#bottomLeftBox, #bottomRightBox {
		width: 100%;
		margin: 1px;
		text-align: left;
	}
	#bottomInfoBox {
		margin-left: 10px;
		margin-right: 10px;
	}
	table {
		width: 100%;
		margin-left: 0px;
		margin-right: 0px;
	}
	#gameDiv,
	#gameDiv.gameDiv-wide {
		/*game canvas*/
		margin-top: 35px;
	}
	.standalone #gameDiv {
		margin-top: 0;
	}
	.stat {
		margin-right: 15px;
		margin-bottom: 3px;
	}
	#stats {
		width: 97%;
		margin-left: 5px;
		font-size: 0.75em;
		height: 2.5em;
		line-height: 1;
	}
	#saveFile, #loadFile {
		font-size: small
	}
	.saveSlot {
		font-size: small
	}
	#extraLinks a {
		padding: 3px;
	}
}
@media screen and (max-width: 600px) {
	#gameDiv,
	#gameDiv.gameDiv-wide {
		border-left: none;
		border-right: none;
		border-top: none;
	}
	.standalone #gameDiv {
		margin-top: 0;
	}
	.pagetitle {
		display: none
	}
	#categoryControls {
		flex-wrap: nowrap;
	}
	#categoryControls button {
		padding-left: 8px;
		padding-right: 8px;
	}
}
@media screen and (min-width: 800px) { /* Desktop-Only Styles */
	#gameDiv {
		width:800px;
		left: 50%;
		transform: translate(-50%, -0%);
	}
}
/* screen size > 1325px, h1::after {content:" Sandboxels"} */
@media screen and (min-width: 1325px) {
	.pagetitle::after {content:" Sandboxels"}
}
button, input { /*Disable double tap zoom on mobile devices*/
	touch-action: manipulation;
	color-scheme: dark;
}
.settingsButton, select, .toggleInput, #settingsMenu input[type="number"], #settingsMenu input[type="text"], .menuScreen input[type="text"], #savePromptMenu input, input[type="email"], input[type="number"], .button {
	background-color: var(--theme-darkest2);
	vertical-align: middle;
	margin-left: 4px;
	margin-right: 4px;
	border: var(--theme) 2px solid;
	padding: 0.4em;
	color: white;
	font-size: 1em;
	font-family: Arial, Helvetica, sans-serif;
	cursor: pointer;
}
#settingsMenu .menuText {
	font-family: 'VT323';
	font-size:1.5em
}
.settingsButton, #settingsMenu .toggleInput, #settingsMenu .menuText button, #settingsMenu input[type], #settingsMenu select, .button {
	display: inline-block;
	text-align: center;
	font-family: 'VT323';
	padding-left:13px;
	padding-right:13px;
	margin:0
}
.button {
	cursor:pointer;
	font-size: 1.5em;
}
#settingsMenu input[type=color] {
	padding:0;
	background-color: var(--theme-dark);
	border: none;
	cursor: pointer;
	vertical-align: middle;
    height: 40px;
}
#settingsMenu select, #settingsMenu input[type=text] {
	font-size: 1em;
	padding:5px;
}
.toggleInput { cursor: pointer; }
.toggleInput[state="1"] {color: lime!important;}
.toggleInput[state="0"] {color: red!important;}
#settingsMenu input[type="number"] {
	width: 3em;
	text-align: left;
}
#settingsMenu input[type="text"] {
	text-align: left;
}
.settingsButton:active, .toggleInput:active {
	filter: brightness(75%);
}
.settingsReset, .settingsRefresh {
	font-style:italic;
	cursor:pointer;
	color: var(--theme);
}
#canvasDiv {
	position:relative;
	overflow-x:hidden;
	background-color: var(--theme-opac75);
}
#colorSelector {
	position:absolute;
	bottom:1em;
	right:1em;
	display: none;
}
.categoryButton.notify {
	background-color: rgba(255, 0, 0, 0.25)!important;
}
/* .elementButton.notify with a red glow */
.elementButton.notify {
	-webkit-box-shadow: 0px 0px 15px 5px #FF0000;
	box-shadow: 0px 0px 15px 5px #FF0000;
}
.noselect {
	-webkit-touch-callout: none; /* iOS Safari */
	  -webkit-user-select: none; /* Safari */
	   -khtml-user-select: none; /* Konqueror HTML */
		 -moz-user-select: none; /* Firefox */
		  -ms-user-select: none; /* Internet Explorer/Edge */
			  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
.setting-span {
	display:block;padding-bottom:0.5em
}
.multisetting {
	display: inline-block
}
.helpMark {text-decoration:dotted underline; font-style:italic; cursor:help; color:yellow}
#content {
	margin-left:10px;
	margin-right:10px;
	padding-bottom: 10px;
}
#logDiv {
	position: absolute;
	top: 0px;
	left: 0px;
	pointer-events: none;
	padding: 5px;
	white-space: pre-wrap;
	font-size: 0.75em;
	text-shadow: 0px 0px 6px black;
}
button.disabled {
	opacity: 0.5;
	cursor:not-allowed;
}

#savesMenu div.menuTab {
	padding-top:0; height:75%; overflow-y:scroll;
}
#savesMenu .menuText {
	padding-bottom: 3em;
	margin-top: 0;
}

.menuTabs {
    border-bottom: solid var(--theme) 3px;
    margin-top: 1em;
    padding-left: 1em;
	white-space: nowrap;
    overflow-x: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
	display: flex;
}
.menuTabs::-webkit-scrollbar {
    display: none;
}

button.menuTab {
    padding: 1em;
    border: solid var(--theme) 3px;
    border-bottom: none;
	color: var(--theme);
	background-color: var(--theme-darkest);
	margin-left: 0.75em;
}
button.menuTab.selected {
	filter: brightness(2);
	background-color: var(--theme-darker);
}
button.menuTab:active, button.menuTab:active:hover {
	transform: scaleY(0.9) translateY(3px);
}
button.menuTab:first-of-type {
	margin-left: 0;
}

div.menuTab {
	display: none;
}
div.menuTab.selected {
	display: block;
}

.menuTopBar {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
}
.menuTopBar input, .menuTopBar input[type="text"], .menuTopBar select, .menuTopBar button {
	flex-grow: 1;
	margin-left: 0;
	margin-right: 0;
	margin: 0;
	border-top: none;
	font-family: 'VT323', 'Press Start 2P', Arial;
	font-size: 1.3em;
}
#workshopSearch, #discordSearch {
    border-width: 3px;
    border-right: none;
}
#workshopFilter, #discordFilter {
	border-width: 3px;
}

.texticon {
	color: rgba(0,0,0,0);
	background-repeat: no-repeat;
	background-size: contain;
	height: 1.33em;
	width: 1em;
	max-width: 1em;
	overflow: hidden;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
}
a.texticon {
	background-image: url("data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20stroke%3D%22%23FF00FF%22%20stroke-width%3D%224%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-arrow-up-right%22%3E%3Cline%20x1%3D%222%22%20y1%3D%2222%22%20x2%3D%2222%22%20y2%3D%222%22%3E%3C%2Fline%3E%3Cpolyline%20points%3D%222%202%2022%202%2022%2022%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
}
a.texticon:hover, a.texticon:active, a.texticon:hover:active {
	color: rgba(0,0,0,0);
}
/* .standalone.mobile #savesButton, .standalone.mobile #extraInfo {
	display: none
} */
.standalone #extraLinks, .standalone #attribution {
	display: none!important
}
.standalone #extraInfo .extraInfo-right {
	margin-bottom: 0;
	margin-right: 0;
	float: none;
	text-align: right;
	display: block;
}
.standalone #extraInfo .extraInfo-right p {
	margin: 0;
}
#extraInfo #extraInfo-name {
	width: 0px;
	text-overflow: clip;
	overflow-x: hidden;
	opacity: 0.01;
	display: inline-block;
}
.standalone #extraInfo #extraInfo-name {
	width: unset;
	text-overflow: unset;
	overflow-x: unset;
	opacity: unset;
	padding-right: 1em;
}
img {
	image-rendering: pixelated;
}


.pixel-corners,
.pixel-corners--wrapper {

}
.pixel-corners {
}
.pixel-corners--wrapper {
}
.pixel-corners--wrapper .pixel-corners {
}
.pixel-corners::after,
.pixel-corners--wrapper::after {
}
.pixel-corners::after {
}

.controlButton, .elementButton, .pixel-corners {
  clip-path: polygon(0px calc(100% - 4px),
    2px calc(100% - 4px),
    2px calc(100% - 2px),
    4px calc(100% - 2px),
    4px 100%,
    calc(100% - 4px) 100%,
    calc(100% - 4px) calc(100% - 2px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 2px) calc(100% - 4px),
    100% calc(100% - 4px),
    100% 4px,
    calc(100% - 2px) 4px,
    calc(100% - 2px) 2px,
    calc(100% - 4px) 2px,
    calc(100% - 4px) 0px,
    4px 0px,
    4px 2px,
    2px 2px,
    2px 4px,
    0px 4px);
  position: relative;
  border: 2.5px solid transparent!important;
}
.controlButton::after, .elementButton::after, .pixel-corners::after {
  content: "";
  position: absolute;
  clip-path: polygon(0px calc(100% - 4px),
    2px calc(100% - 4px),
    2px calc(100% - 2px),
    4px calc(100% - 2px),
    4px 100%,
    calc(100% - 4px) 100%,
    calc(100% - 4px) calc(100% - 2px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 2px) calc(100% - 4px),
    100% calc(100% - 4px),
    100% 4px,
    calc(100% - 2px) 4px,
    calc(100% - 2px) 2px,
    calc(100% - 4px) 2px,
    calc(100% - 4px) 0px,
    4px 0px,
    4px 2px,
    2px 2px,
    2px 4px,
    0px 4px,
    0px 50%,
    4px 50%,
    4px 6px,
    6px 6px,
    6px 4px,
    calc(100% - 6px) 4px,
    calc(100% - 6px) 6px,
    calc(100% - 4px) 6px,
    calc(100% - 4px) calc(100% - 6px),
    calc(100% - 6px) calc(100% - 6px),
    calc(100% - 6px) calc(100% - 4px),
    6px calc(100% - 4px),
    6px calc(100% - 6px),
    4px calc(100% - 6px),
    4px 50%,
    0px 50%);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  pointer-events: none;
  margin: -4px;

  background: rgba(255,255,255,0.5);
  /* background-image: linear-gradient(to right bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.33)) */
}
.elementButton::after {
	background: var(--button-border);
}
.elementButton.bright::after {
	/* background: rgba(0,0,0,0.5); */
	/* background-image: linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.33)) */
}
#controls button[on="true"]::after {
	background: #5ee05e
}
#controls .elementButton[current="true"]::after {
	background: #5ee05e;
}
#controls .elementButton[modified="true"]::after {
	background: #0d62ff;
}
#loadingP {
	text-align:center;
	height:500px;
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
#loadingP * {
	padding: 20px;
}



#promptOK {
    justify-content:center;
}
    
#left_skyscraper {
  position: absolute;
  top: 50px;
  left: 0;
  width: 160px;
  contain: style layout;
}

#right_skyscraper {
  position: absolute;
  top: 50px;
  right: 0;
  width: 160px;
  contain: style layout;
}
  
.setting-span {
    display: inline-block;
}

.menuBottomButton {
	justify-content: center;
}

.menuNotice {
	padding-top: 10px;
	padding-bottom: 10px;
}

.footer {
	font-size: 12px;
    margin-top: 1em;
	margin-bottom: 1em;
    text-align: center;
}
.footer div {
	margin-top: 1em;
}
.infoGrid {
	flex-wrap: wrap;
    display: flex;
}
.infoGrid .infoLink {
	margin-right: 2em;
}

#gameDiv.gameDiv-wide {
  border: none !important;
  margin-top: 55px;
}
.standalone #gameDiv.gameDiv-wide {
  margin-top: 0!important
}

.setting-span:has(#saveAuthorLabel) {
	margin-top: 1.5em;
	display: block;
}

.toggleInput,.settingsButton {
    padding-top: 0.1em;
    padding-bottom: 0.1em;
}
`

function shove_up(elem, count) {
    for (let i = 0; i < count; i++) {
        if(elem.previousElementSibling)
            elem.parentNode.insertBefore(elem, elem.previousElementSibling);
    }
}

function patch_save_to_file(){
	const toggles_row = document.querySelector("#savePromptMenu .toggles-row")
    const save_include_lbl = document.getElementById("saveInclude")

    toggles_row.style.display = "inline"
    save_include_lbl.innerText = "Include:"

    shove_up(save_include_lbl, 4)
    shove_up(toggles_row, 4)
    save_include_lbl.before(document.createElement("br"))
    toggles_row.after(document.createElement("br"))

	document.getElementById("saveAuthorLabel").innerText += ":"
	document.getElementById("saveDescLabel").innerText   += ":"
	document.getElementById("saveNameLabel").innerText   += ":"
}

function patch_settings() {
	const toggles_row = document.querySelector(
		"#betterSettings\\/div\\/general.toggles-row .toggles-row,"+
		"#settingsMenu .toggles-row"
	)
	console.debug(toggles_row)
	shove_up(toggles_row, 7)
}

runAfterLoad(() => {
    const new_elem = document.createElement("style")
    new_elem.innerHTML = STYLE

    document.querySelector(`link[rel="stylesheet"][href="style.css"]`).replaceWith(new_elem)
    document.querySelectorAll(".XButton").forEach(x => x.innerText = "-")

	patch_save_to_file()
	patch_settings()
});

dependOn(
    "betterSettings.js", 
    () => {
        document.querySelectorAll(`input[id^="betterSettings"],select[id^="betterSettings"]`)
            .forEach(x => x.classList.add("settingsInput"))
    }
)
