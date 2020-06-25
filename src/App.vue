<template>
	<div id="app">
		<div
			class="bg"
			:style="`background: url(bg/4.jpg);filter: blur(${blur/6}px) brightness(${brightness/80});`"
		></div>
		<transition-group mode="out-in">
			<div class="sideBar" key="sideBar">
				<div class="top">
					<img class="logo" src="@/assets/logo.svg" alt />
					<img class="gameSelect" @click="gameSelect = !gameSelect" src="@/assets/gameSelect.svg" alt />
				</div>
				<div class="buttom">
					<img class="iconBoxBtn" src="@/assets/iconBox.svg" @click="isIconBox = !isIconBox" alt />
					<img class="setting" src="@/assets/setting.svg" @click="isFilter = !isFilter" alt />
					<img class="ver" src="@/assets/ver.svg" alt />
				</div>
			</div>
			<div class="filter" v-if="isFilter" key="filter">
				<input class="blur" type="range" max="100" min="0" v-model="blur" />
				<input class="brightness" type="range" max="100" min="30" v-model="brightness" />
			</div>
			<div class="settingContent" key="setting" :class="{active:gameSelect}">
				<div class="gameBtn" v-for="game in GAME_DATA" :key="game.id" @click="onGameChange(game)">
					<img :src="`icon/${game.id}/icon.png`" alt />
					<p>{{game.name}}</p>
				</div>
			</div>
			<Xiaoxiaole :gameId="gameId" :pushNewIcon="pushNewIcon" key="gameId" />
			<div class="iconBox" key="iconBox" v-if="isIconBox">
				<div v-for="(id,index) in iconAmount" :key="index" @click="onPushNewIcon(index)">
					<img draggable="false" :src="`icon/${gameId}/img_symbol${index}.png`" />
					<p>{{index}}</p>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
import Xiaoxiaole from "./views/Xiaoxiaole.vue";

export default {
	name: "App",
	data() {
		return {
			isIconBox: false,
			gameId: 1029,
			iconAmount: 18,
			pushNewIcon: -1,
			blur: 50,
			brightness: 65,
			gameSelect: false,
			isFilter: false,
			tips: "点击输入框上下调整行列，点击或空格更改掉落方向",
			ver: "0.1.0"
		};
	},
	components: {
		Xiaoxiaole
	},
	methods: {
		onPushNewIcon(index) {
			this.pushNewIcon = index;
		},
		onGameChange(game) {
			this.gameId = game.id;
			this.iconAmount = game.iconAmount;
		}
	}
};
</script>

<style lang="less">
.bg {
	width: 100vw;
	height: 100vh;
	z-index: -1;
	background-size: cover !important;
	background-position: center center !important;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(1.05);
}
#app {
	font-family: Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	span {
		display: flex;
		justify-content: center;
		align-items: stretch;
		transition: 0.3s ease-in-out;
	}
}
.sideBar {
	width: 50px;
	background-color: @sideBar;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 13px 0;
	box-sizing: border-box;
	> div {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	img {
		width: 25px;
		opacity: 0.85;
	}
	.logo {
		margin-bottom: 14px;
	}
	.gameSelect {
		border-radius: 3px;
		padding: 3px;
		transition: 0.15s ease-in-out;
		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
	.iconBoxBtn,
	.setting,
	.ver {
		margin-top: 4px;
		border-radius: 50%;
		padding: 2px;
		transition: 0.15s ease-in-out;
		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
}
.settingContent {
	width: 0;
	background-color: @setting;
	overflow: hidden;
	transition: width 0.3s ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding: 6px 0;
	box-sizing: border-box;
	.gameBtn {
		width: 150px;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid @setting - 20;
		transition: 0.2s ease-in-out;
		&:hover {
			background-color: @setting - 20;
		}
		img {
			width: 26px;
			margin-right: 2px;
		}
		p {
			font-size: 14px;
			line-height: 14px;
			white-space: nowrap;
			text-align: right;
		}
	}
}
.active {
	width: 150px;
}
.container {
	z-index: 10;
}
.iconBox {
	width: 320px;
	background-color: @bg;
	margin-left: 8px;
	display: grid;
	grid-template-rows: repeat(auto-fill, 78px);
	grid-template-columns: repeat(auto-fill, 60px);
	justify-content: space-between;
	padding: 16px 8px;
	box-sizing: border-box;
	z-index: 1;
	div {
		position: relative;
		margin: 3px;
		background-color: @lattice;
		border-radius: 4px;
		transition: 0.3s ease-in-out;
		&:hover {
			background-color: @lattice - 30;
		}
		img {
			width: 100%;
		}
		p {
			font-size: 13px;
			transform: translateY(-4px);
		}
	}
}
.filter {
	position: absolute;
	width: 80px !important;
	height: 26px !important;
	padding: 16px 24px;
	bottom: 32px;
	left: 60px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	background-color: @sideBar + 10;
	border-radius: 4px;
	z-index: 40;
	&::before {
		content: "";
		width: 10px;
		height: 10px;
		background-color: @sideBar + 10;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%) rotate(45deg);
	}
}
.v-enter,
.v-leave-to {
	opacity: 0;
	transform: translateX(-10%);
}
.v-enter-active,
.v-leave-active {
	transition: 0.3s ease-in-out;
}
.v-move {
	transition: 0.3s ease-in-out;
}
.v-leave-active {
	position: absolute;
	height: 100%;
}
</style>
