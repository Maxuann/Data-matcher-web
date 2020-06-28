<template>
	<div class="version" @click.stop>
		<div class="logo">
			<img src="@/assets/logo.svg" alt />
			<p>Version 0.7.0</p>
		</div>
		<img src="@/assets/logo.svg" alt class="bgLogo" />
		<p class="copyright">©2020 Data Matcher</p>
		<!-- <p class="reduction">一键还原</p> -->
		<p class="close" @click="onVersion">×</p>
		<p class="howToUse">
			<span>使用方式:</span>
			<br />1.通过点击
			<img class="select" src="@/assets/gameSelect.svg" alt />展开，来选择游戏
			<br />2.开始前在右侧输入游戏数据
			<br />3.点击行或列，键盘上下键调整数值
			<br />4.点击箭头或空格更改方向
			<br />5.回车开始测试，会锁定行列和方向的更改
			<br />6.点击
			<img src="@/assets/iconBox.svg" alt />打开图标盒子，点击会把对应图标推入数组最后一个
			<br />7.点击左侧图标会删除对应图标，图标队列会滚到最上显示下一个出现的图标
			<br />8.补满后，图标队列会删除补充的图标，但是不会修改数组数据
			<br />9.无需切换，摁C一键复制游戏数据到剪贴板
			<br />
			<br />○ 全局快捷键控制
			<br />○ 游戏和设置数据被持久化保存，刷新页面只清空数据，窗口状态不变
			<br />○ 如需复位，点击键盘Esc还原所有设置
			<br />○ 点击窗口logo试试~
		</p>
	</div>
</template>

<script>
export default {
	methods: {
		onVersion() {
			this.$emit("onCloseVersion", false);
		}
	}
};
</script>

<style lang="less" scoped>
.version {
	width: 500px;
	height: 262px;
	background-color: @bg;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
	z-index: 500;
	.logo {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		top: 15px;
		left: 15px;
		img {
			width: 36px;
			filter: brightness(0.25);
		}
		p {
			color: @sideBar;
			padding-left: 15px;
			font-size: 16px;
			font-weight: 1;
		}
	}
	.bgLogo {
		width: 310px;
		filter: brightness(0.95);
		position: absolute;
		top: -60px;
		right: 15px;
	}
	.copyright {
		position: absolute;
		left: 15px;
		bottom: 15px;
		font-size: 13px;
	}
	// .reduction {
	// 	position: absolute;
	// 	right: 15px;
	// 	bottom: 15px;
	// 	font-size: 13px;
	// }
	.close {
		width: 26px;
		height: 26px;
		position: absolute;
		top: 6px;
		right: 6px;
		font-size: 22px;
		line-height: 22px;
		font-weight: lighter;
	}
	.howToUse {
		width: 470px;
		height: 114px;
		position: absolute;
		top: 88px;
		left: 15px;
		overflow: hidden;
		overflow-y: auto;
		font-size: 12px;
		line-height: 20px;
		text-align: left;
		&::-webkit-scrollbar {
			display: none;
		}
		span {
			font-size: 14px;
			font-weight: bold;
		}
		img {
			width: 20px;
			filter: brightness(0.35);
			vertical-align: middle;
			position: relative;
			top: -1px;
			left: -2px;
		}
		.select {
			width: 16px;
		}
	}
}
</style>