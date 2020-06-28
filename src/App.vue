<template>
	<div id="app" @click="closeFV" :class="{showVersion:isVersion}">
		<transition name="bg" mode="out-in">
			<div
				class="bg"
				:key="bgNum"
				:style="`background: url(bg/${bgNum}.jpg);filter: blur(${blur/6}px) brightness(${brightness/80});`"
			></div>
		</transition>
		<transition-group mode="out-in">
			<div class="sideBar" key="sideBar">
				<div class="top">
					<img class="logo" src="@/assets/logo.svg" alt @click="onBgChange" />
					<img class="gameSelect" @click="gameSelect = !gameSelect" src="@/assets/gameSelect.svg" alt />
				</div>
				<div class="buttom">
					<img class="iconBoxBtn" src="@/assets/iconBox.svg" @click="isIconBox = !isIconBox" alt />
					<img class="setting" src="@/assets/setting.svg" @click.stop="isFilter = !isFilter" alt />
					<img class="ver" src="@/assets/ver.svg" @click.stop="isVersion = !isVersion" alt />
				</div>
			</div>
			<div class="filter" v-if="isFilter" key="filter" @click.stop>
				<input class="blur" type="range" max="100" min="0" v-model="blur" />
				<input class="brightness" type="range" max="100" min="30" v-model="brightness" />
			</div>
			<div
				class="gamesContent"
				key="gamesContent"
				:class="{active:gameSelect}"
				:style="`height:${clientHeight}px`"
			>
				<div
					class="gameBtn"
					:class="{gameBtnActive:index == selectIndex}"
					v-for="(game,index) in GAME_DATA"
					:key="game.id"
					@click="onGameChange(game,index)"
				>
					<img :src="`icon/${game.id}/icon.png`" alt />
					<p>{{game.name}}</p>
				</div>
			</div>
			<DataTest
				:gameId="gameId"
				:pushNewIcon="pushNewIcon"
				@clientHeight="isClientHeight"
				key="gameId"
			/>
			<div class="iconBox" :key="gameId" v-if="isIconBox" :style="`height:${clientHeight}px`">
				<div v-for="(id,index) in iconAmount" :key="index" @click="onPushNewIcon(index)">
					<img draggable="false" :src="`icon/${gameId}/img_symbol${index}.png`" />
					<p>{{index}}</p>
				</div>
			</div>
			<Version v-if="isVersion" key="version" @onCloseVersion="onCloseVersion" />
		</transition-group>
	</div>
</template>

<script>
import DataTest from "./components/DataTest.vue";
import Version from "./components/Version.vue";
import { getLocalStorage } from "@/utils/index";

export default {
	name: "App",
	data() {
		return {
			// gameID iconAmount 和 selectIndex 默认值填写第一个游戏
			gameId: 1029,
			iconAmount: 36,
			selectIndex: 0,
			//每次点击delete计数，推入图标队列后清空
			pushNewIcon: -1,
			bgNum: 1,
			blur: 50,
			brightness: 65,
			clientHeight: 444,
			gameSelect: false,
			isIconBox: false,
			isFilter: false,
			isVersion: false
		};
	},
	created() {
		let _this = this;
		getLocalStorage(_this, "app");
	},
	components: {
		DataTest,
		Version
	},
	methods: {
		onPushNewIcon(index) {
			this.pushNewIcon = index;
		},
		onGameChange(game, index) {
			this.gameId = game.id;
			this.iconAmount = game.iconAmount;
			this.selectIndex = index;
		},
		onBgChange() {
			if (this.bgNum < 4) {
				this.bgNum++;
			} else {
				this.bgNum = 1;
			}
		},
		isClientHeight(height) {
			this.clientHeight = height;
		},
		onCloseVersion(close) {
			this.isVersion = close;
		},
		closeFV() {
			this.isFilter = false;
			this.isVersion = false;
		}
	},
	updated() {
		//获取需要持久化的数据并保存到localStorage
		let { isFilter, isVersion, pushNewIcon, ...app } = this.$data;
		localStorage.setItem("app", JSON.stringify(app));
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
	top: 0;
	left: 0;
	transform: scale(1.05);
	transform-origin: center center;
}
#app {
	width: 100vw;
	height: 100vh;
	font-family: "Microsoft Yahei", Helvetica, Tahoma, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	position: relative;
	> span {
		display: flex;
		justify-content: center;
		align-items: stretch;
		transition: 0.3s ease-in-out;
		color: #2c3e50;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
.showVersion {
	.sideBar,
	.filter,
	.gamesContent,
	.dataTest,
	.iconBox {
		filter: brightness(0.5) !important;
		transition: 0.5s ease-in-out;
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
.gamesContent {
	width: 0;
	overflow: hidden;
	overflow-y: auto;
	background-color: @setting;
	transition: width 0.3s ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border-top: 6px solid @setting;
	border-bottom: 6px solid @setting;
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
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
	.gameBtnActive {
		background-color: @setting - 20;
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
	height: 444px;
	background-color: @bg;
	margin-left: 8px;
	display: grid;
	grid-template-rows: repeat(auto-fill, 78px);
	grid-template-columns: repeat(auto-fill, 60px);
	justify-content: space-between;
	border-top: 16px solid @bg;
	border-bottom: 16px solid @bg;
	border-left: 8px solid @bg;
	border-right: 8px solid @bg;
	box-sizing: border-box;
	z-index: 1;
	overflow: hidden;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
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
.bg-enter,
.bg-leave-to {
	opacity: 0;
}
.bg-enter-active,
.bg-leave-active {
	transition: 1s ease-in-out;
}
</style>
