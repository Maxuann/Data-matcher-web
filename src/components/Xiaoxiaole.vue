<template>
	<div class="container">
		<div class="status_bar">
			<div class="set_up">
				<div>
					<label for="row">行 :</label>
					<input
						id="row"
						v-model="row"
						:class="{disabled:enter}"
						:disabled="enter"
						type="number"
						min="4"
						max="20"
						value="4"
					/>
				</div>
				<div>
					<label for="column">列 :</label>
					<input
						id="column"
						v-model="column"
						:class="{disabled:enter}"
						:disabled="enter"
						type="number"
						min="4"
						max="20"
						value="4"
					/>
				</div>
				<div class="direction" @click="onDirection">
					<span>方向 :</span>
					<svg
						id="arrow_icon"
						class="icon"
						style="width: 20px; height: 20px;vertical-align: middle;fill: currentColor;overflow: hidden;"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="10515"
					>
						<path
							transition=" 0.3s ease"
							:transform="`rotate(${isRotate})`"
							transform-origin="center"
							fill="#999999"
							d="M861.9 512.1c0 17.1-5.9 31.5-17.6 43.3L534.8 864.8c-12.4 11.7-26.8 17.6-43.3 17.6-16.2 0-30.4-5.9-42.8-17.6L413 829.2c-12.1-12-18.1-26.5-18.1-43.3 0-16.8 6-31.2 18.1-43.3l139.3-139.3H217.7c-16.5 0-29.9-5.9-40.2-17.8-10.3-11.9-15.5-26.2-15.5-43v-60.9c0-16.8 5.1-31.1 15.5-43 10.3-11.9 23.7-17.8 40.2-17.8h334.7L413.1 281C401 269.6 395 255.3 395 238.2c0-17.1 6-31.4 18.1-42.8l35.7-35.7c12-12 26.3-18.1 42.8-18.1 16.8 0 31.2 6 43.3 18.1l309.5 309.5c11.7 11.2 17.5 25.4 17.5 42.9z"
							p-id="10516"
						/>
					</svg>
				</div>
			</div>
			<button class="enter" :class="{failure:enter}" @click="startTest">开始 ( Enter )</button>
		</div>
		<div class="main">
			<div
				class="lattice"
				:style="`grid-template-rows: repeat(${row}, ${100/row}%);grid-template-columns: repeat(${column}, ${100/column}%)`"
			>
				<div
					v-for="(item,index) in row*column"
					:key="index"
					:style="`width:${620/row}px;height:${620/row}px`"
					@click="onDelete(index)"
				>
					<transition :name="dropAnimate" mode="out-in">
						<img
							:key="symbolImg(symbolsList[index].id)"
							v-if="!symbolsList[index].isDelete && symbolsList[index].id >=0"
							:src="symbolImg(symbolsList[index].id)"
							alt
						/>
					</transition>
					<span>{{ symbolsList[index].arrId }}</span>
				</div>
			</div>
			<div class="test">
				<button class="drop" @click="onDrop">掉落 ( D )</button>
				<button class="full" @click="onFull">补满 ( F )</button>
				<div class="nextID">下个图标ID：{{ nextIndex }}</div>
				<div class="dataBox">
					<transition mode="out-in">
						<textarea
							v-if="dataEdit"
							v-model.lazy="inputString"
							onkeyup="this.value=this.value.replace(/[^\r\n0-9,]/g,'');"
						/>
						<div v-else class="currSymbol">
							<span
								v-for="(symbolId,index) in jsonData"
								:key="index"
								:class="isCurrSymbol(index)"
							>{{ symbolId }},</span>
						</div>
					</transition>
					<transition name="nextImg" mode="out-in">
						<img
							:key="nextIndex"
							class="nextImg"
							:src="`http://maxlearn.top/slot-icon/1029/img_symbol${nextIndex-10}.png`"
							alt
						/>
					</transition>
					<div class="switchBtn" @click="dataEdit = !dataEdit" :class="{switchBtnActive:!dataEdit}">
						<div class="btn"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="msg">
			<p class="tips">{{ tips }}</p>
			<p class="ver">消消乐 ver.{{ ver }}</p>
		</div>
	</div>
</template>

<script>
import { deepClone } from "@/utils/index";
export default {
	name: "Xiaoxiaole",
	data() {
		return {
			enter: false,
			gameId: 1029,
			row: 4,
			column: 4,
			direction: 1,
			inputString:
				"4,2,3,4,1,2,3,4,1,2,3,4,1,1,3,4,6,7,8,9,10,11,12,13,14,10,11,12,13,2,4,4,6,3,2,5,4,5,3,2,4,4,5,23,4,5",
			jsonData: [],
			symbolsList: [],
			nextIndex: 0,
			tips: "点击输入框上下调整行列，点击或空格更改掉落方向",
			// 是不是横向掉落（左、右为横向掉落，上、下为纵向掉落）
			isH: false,
			// 是不是从数组的后面压入掉落图标（右和下为true）
			isPushEnd: true,
			loop1Cnt: 0,
			loop2Cnt: 0,
			dataEdit: true,
			ver: "1.0.0"
		};
	},
	computed: {
		rowPercent() {
			return 100 / this.row + "%";
		},
		columnPercent() {
			return 100 / this.column + "%";
		},
		isRotate() {
			let routate;
			switch (this.direction) {
				case 1:
					routate = 90;
					break;
				case 2:
					routate = 0;
					break;
				case 3:
					routate = 270;
					break;
				case 4:
					routate = 180;
					break;
			}
			return routate;
		},
		dropAnimate() {
			switch (this.direction) {
				case 1:
					return "down";
					break;
				case 2:
					return "right";
					break;
				case 3:
					return "up";
					break;
				case 4:
					return "left";
					break;
				default:
					return null;
					break;
			}
		}
	},
	watch: {
		inputString() {
			const amount = this.row * this.column;
			this.jsonData = this.inputString.split(",");
			const dataLength = this.jsonData.length;
			if (amount > dataLength && this.enter === true) {
				alert("数据错误，请检查");
			} else {
				console.log("数据正确");
			}
		}
	},
	created() {
		this.initTable();
		//键盘监听控制
		document.onkeyup = () => {
			if (event.keyCode == 13)
				//Enter
				this.startTest();

			if (event.keyCode == 32)
				//Space
				this.onDirection();

			if (event.keyCode == 68)
				//D
				this.onDrop();

			if (event.keyCode == 70)
				//F
				this.onFull();
		};
	},
	methods: {
		startTest() {
			const symbolCnt = this.row * this.column;
			this.jsonData = this.makeData(this.inputString);
			if (this.jsonData.length < symbolCnt) {
				alert("开始前请填满" + symbolCnt.toString() + "个初始数据");
				return;
			}
			this.enter = !this.enter;
			this.symbolsList = [];
			this.isH = this.direction % 2 === 0; // 横向
			this.isPushEnd = this.direction > 2; // 下和右是
			if (this.isH) {
				// 横向 先循环行，再列
				this.loop1Cnt = this.row;
				this.loop2Cnt = this.column;
			} else {
				// 纵向 先循环列，再行
				this.loop1Cnt = this.column;
				this.loop2Cnt = this.row;
			}
			for (var i = 0; i < symbolCnt; i++) {
				var symbol = {
					id: this.jsonData[i],
					arrId: i,
					isDelete: false
				};
				this.symbolsList.push(symbol);
			}
			this.nextIndex = symbolCnt;
		},
		makeData(strData) {
			return strData
				.replace(/[^0-9,，]/g, "")
				.replace(/[，]/g, ",")
				.split(",");
		},
		initTable() {
			this.symbolsList = [];
			for (var i = 0; i < this.row * this.column; i++) {
				var symbol = {
					id: -1,
					arrId: -1,
					isDelete: false
				};
				this.symbolsList.push(symbol);
			}
		},
		symbolImg(symbolID) {
			// 显示图标
			if (this.gameId < 0) return;
			if (symbolID >= 0) {
				return require("@/assets/images/dianyou/" +
					this.gameId +
					"/img_symbol" +
					symbolID +
					".png");
			} else {
				// return require('@/assets/welcome/transparent.png');
			}
			return "";
		},
		isCurrSymbol(id) {
			return id === this.nextIndex ? "curr_color" : "";
		},
		onDirection() {
			if (!this.enter) {
				if (this.direction < 4) {
					this.direction++;
				} else {
					this.direction = 1;
				}
			}
		},
		onDelete(index) {
			//判断测试是否开始，没有开始不执行任何操作
			switch (this.enter) {
				case true:
					//   console.log(index);
					this.symbolsList[index].isDelete = true;
					break;
				case false:
					null;
					break;
			}
		},
		onDrop() {
			//判断测试是否开始，没有开始不执行任何操作
			switch (this.enter) {
				case true:
					// 掉落图标
					// 操作思想：一条线一条线的把未消除的图片摘出来，放到新数组里，并记录在一条线上的index顺序
					// 然后再调resetLineSymbols方法整理，把未消除的图片放入正确位置
					var loop1, loop2;
					var symbols = deepClone(this.symbolsList);
					for (loop1 = 0; loop1 < this.loop1Cnt; loop1++) {
						var dropLine = []; // 未消除的图标列表
						var lineIdList = []; // 在一条线的index列表
						for (loop2 = 0; loop2 < this.loop2Cnt; loop2++) {
							var row = loop2;
							var col = loop1;
							if (this.isH) {
								// 横向的是先循环行，再列
								row = loop1;
								col = loop2;
							}
							var id = row * this.column + col;
							lineIdList.push(id);
							var item = symbols[id];
							if (!item.isDelete) {
								dropLine.push(item);
							}
						}
						this.resetLineSymbols(symbols, dropLine, lineIdList); // 整理这一条线
					}
					this.symbolsList = deepClone(symbols);

					break;
				case false:
					null;
					break;
			}
		},
		resetLineSymbols(symbols, dropLine, lineIdList) {
			// 整理一条线的图标，把未消除的图标压入正确的位置，剩下的位置设置成空位
			var dropLineId = 0;
			for (var i = 0; i < lineIdList.length; i++) {
				var id = lineIdList[i];
				if (
					dropLineId < dropLine.length &&
					((this.isPushEnd && i < dropLine.length) ||
						(!this.isPushEnd && lineIdList.length - i - 1 < dropLine.length))
				) {
					// isPushEnd==true 从开始把没消的图标压进去，后面的成空位
					// isPushEnd==false 前面先补空位，到没消的图标够压入时，再依次往后压入
					symbols[id] = dropLine[dropLineId];
					symbols[id].isDelete = false;
					dropLineId++;
				} else {
					symbols[id] = { id: -1, arrId: -1, isDelete: false }; // 设置成空位
				}
			}
		},
		onFull() {
			//判断测试是否开始，没有开始不执行任何操作
			switch (this.enter) {
				case true:
					// 先做掉落动作
					this.onDrop();
					// 补图标
					var symbols = deepClone(this.symbolsList);
					var loop1, loop2;
					var allEmptyList = [];
					var maxEmptyCnt = 0;
					for (loop1 = 0; loop1 < this.loop1Cnt; loop1++) {
						var lineIdList = []; // 在一条线的index列表
						for (loop2 = 0; loop2 < this.loop2Cnt; loop2++) {
							var row = loop2;
							var col = loop1;
							if (this.isH) {
								// 横向的是先循环行，再列
								row = loop1;
								col = loop2;
							}
							var id = row * this.column + col;
							if (symbols[id].id < 0) {
								lineIdList.push(id);
							}
						}
						maxEmptyCnt = Math.max(maxEmptyCnt, lineIdList.length);
						if (lineIdList.length > 0) {
							allEmptyList.push(lineIdList);
						}
					}
					for (var i = maxEmptyCnt; i > 0; i--) {
						for (var j = 0; j < allEmptyList.length; j++) {
							if (allEmptyList[j].length > 0) {
								var emptyId = -1;
								if (this.isPushEnd) {
									emptyId = allEmptyList[j].shift();
								} else {
									emptyId = allEmptyList[j].pop();
								}
								if (this.jsonData.length > this.nextIndex) {
									symbols[emptyId] = {
										id: this.jsonData[this.nextIndex],
										arrId: this.nextIndex,
										isDelete: false
									}; // 加入新的
									this.nextIndex++;
								}
							}
						}
					}
					this.symbolsList = deepClone(symbols);
					break;
				case false:
					null;
					break;
			}
		}
	}
};
</script>

<style scoped lang="less">
.container {
	.status_bar {
		height: 64px;
		.set_up {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			div:not(:first-child) {
				margin-left: 26px;
			}
		}
	}
	.main {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		.test {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: stretch;
			margin: 15px 15px 15px 0;
			padding-left: 15px;
			border-left: 1px solid #dbdbdb;
			button {
				margin-bottom: 20px;
			}
			.nextID {
				text-align: left;
				margin-bottom: 6px;
			}
			.dataBox {
				position: relative;
				width: 120px;
				min-height: 200px;
				height: 20vh;
				border-radius: 4px;
				background-color: #e0e0e0;
				textarea,
				.currSymbol {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					padding: 6px;
					font-family: "Helvetica";
					resize: none;
					text-align: justify;
				}
				.currSymbol {
					height: auto;
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
				}
				.switchBtn {
					position: absolute;
					bottom: 3px;
					left: 3px;
					width: 30px;
					height: 15px;
					padding: 2px;
					background-color: #62b600;
					border-radius: 4px;
					transition: 0.2s ease-in-out;
					.btn {
						width: 50%;
						height: 100%;
						background-color: #fff;
						border-radius: 4px;
						transition: 0.2s ease-in-out;
					}
				}
				.switchBtnActive {
					background-color: #999999;
					.btn {
						transform: translateX(100%);
					}
				}
				.nextImg {
					position: absolute;
					bottom: 3px;
					right: 3px;
					width: 60px;
				}
			}
		}
		.lattice {
			width: auto;
			height: auto;
			display: grid;
			margin: 10px;
			> div {
				max-width: 80px;
				max-height: 80px;
				border-radius: 4px;
				background-color: #e0e0e0;
				display: inline-grid;
				margin: 5px;
				position: relative;
				// overflow: hidden;
				img {
					width: 100% !important;
					height: 100% !important;
				}
				span {
					position: absolute;
					bottom: 0px;
					right: 2px;
					font-size: 13px;
					color: rgb(153, 153, 153);
				}
				// &:hover span {
				// 	color: #fff;
				// }
				// &::before {
				// 	content: "删除";
				// 	position: absolute;
				// 	width: 100%;
				// 	height: 100%;
				// 	background-color: rgba(0, 0, 0, 0.7);
				// 	color: #fff;
				// 	display: flex;
				// 	justify-content: center;
				// 	align-items: center;
				// 	opacity: 0;
				// 	transition: 0.2s ease-in-out;
				// 	font-size: 14px;
				// }
				// &:hover::before {
				// 	opacity: 0.7;
				// }
			}
		}
	}
	.msg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 8px 8px;
	}
	.curr_color {
		color: #f00;
	}
}
//默认淡入淡出切换
.v-enter,
.v-leave-to {
	opacity: 0;
}
.v-enter-active,
.v-leave-active {
	transition: 0.15s ease-in-out;
}
//下一个图标下移出现
.nextImg-enter {
	opacity: 0;
	transform: translateY(-10px);
}
.nextImg-leave-to {
	opacity: 0;
}
.nextImg-enter-active,
.nextImg-leave-active {
	transition: 0.4s ease-out;
}
//四个掉落方向切换动画-----------------
//向下↓↓↓↓↓↓↓↓↓↓
.down-enter {
	opacity: 0;
	transform: translateY(-100%);
}
.down-leave-to {
	opacity: 0;
	transform: translateY(100%);
}
.down-enter-active,
.down-leave-active {
	transition: 0.3s ease-in-out;
}
//向上↑↑↑↑↑↑↑↑↑↑
.up-enter {
	opacity: 0;
	transform: translateY(100%);
}
.up-leave-to {
	opacity: 0;
	transform: translateY(-100%);
}
.up-enter-active,
.up-leave-active {
	transition: 0.3s ease-in-out;
}
//向左 ← ← ← ← ←
.left-enter {
	opacity: 0;
	transform: translateX(100%);
}
.left-leave-to {
	opacity: 0;
	transform: translateX(-100%);
}
.left-enter-active,
.left-leave-active {
	transition: 0.3s ease-in-out;
}
//向右 → → → → →
.right-enter {
	opacity: 0;
	transform: translateX(-100%);
}
.right-leave-to {
	opacity: 0;
	transform: translateX(100%);
}
.right-enter-active,
.right-leave-active {
	transition: 0.3s ease-in-out;
}
</style>
