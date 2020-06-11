<template>
	<div class="container" @keyup.enter="startTest" @keyup.d="isDrop" @keyup.f="isFull">
		<div class="status_bar">
			<div class="set_up">
				<div>
					<label for="row">行 :</label>
					<input
						:class="{disabled:enter}"
						id="row"
						:disabled="enter"
						type="number"
						min="4"
						max="20"
						value="4"
						v-model="row"
					/>
				</div>
				<div>
					<label for="column">列 :</label>
					<input
						:class="{disabled:enter}"
						id="column"
						:disabled="enter"
						type="number"
						min="4"
						max="20"
						value="4"
						v-model="column"
					/>
				</div>
				<div class="direction" @click="isDirection">
					<span>方向 :</span>
					<svg
						id="arrow_icon"
						style="width: 20px; height: 20px;vertical-align: middle;fill: currentColor;overflow: hidden;"
						viewBox="0 0 1024 1024"
						p-id="10515"
					>
						<path
							:transform="`rotate(${isRotate})`"
							transform-origin="center"
							fill="#999999"
							d="M861.9 512.1c0 17.1-5.9 31.5-17.6 43.3L534.8 864.8c-12.4 11.7-26.8 17.6-43.3 17.6-16.2 0-30.4-5.9-42.8-17.6L413 829.2c-12.1-12-18.1-26.5-18.1-43.3 0-16.8 6-31.2 18.1-43.3l139.3-139.3H217.7c-16.5 0-29.9-5.9-40.2-17.8-10.3-11.9-15.5-26.2-15.5-43v-60.9c0-16.8 5.1-31.1 15.5-43 10.3-11.9 23.7-17.8 40.2-17.8h334.7L413.1 281C401 269.6 395 255.3 395 238.2c0-17.1 6-31.4 18.1-42.8l35.7-35.7c12-12 26.3-18.1 42.8-18.1 16.8 0 31.2 6 43.3 18.1l309.5 309.5c11.7 11.2 17.5 25.4 17.5 42.9z"
							p-id="10516"
						/>
					</svg>
				</div>
			</div>
			<button class="enter" @click="startTest" :class="{failure:enter}">开始 ( Enter )</button>
		</div>
		<div class="main">
			<!-- 获取行列数据生成格子 -->
			<div
				class="lattice"
				:style="`grid-template-rows: repeat(${row}, auto);grid-template-columns: repeat(${column}, auto)`"
			>
				<!-- 格子宽高通过列数计算，但是被css限制到了最高最宽80px -->
				<div
					v-for="(item,index) in row*column"
					:key="index"
					:style="`width:${620/row}px;height:${620/row}px`"
					@click="isDelete(index)"
				>
					<!-- <img :src="'../../public/icon/img_symbol'+jsonData[index]+'.png'" alt /> -->
					<img src="../../public/icon/img_symbol0.png" alt />
					<span>{{index+1}}</span>
				</div>
			</div>
			<div class="test">
				<button class="drop" @click="isDrop">掉落 ( D )</button>
				<button class="full" @click="isFull">补满 ( F )</button>
				<!-- 输入框失去焦点时提交数据，数据值范围被限制在了数字和逗号 -->
				<textarea
					v-model.lazy="jsonData"
					onkeyup="this.value=this.value.replace(/[^\r\n0-9\,\，]/g,'');"
				></textarea>
			</div>
		</div>
		<div class="msg">
			<p class="tips">{{tips}}</p>
			<p class="ver">消消乐 ver.{{ver}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "Xiaoxiaole",
	data() {
		return {
			enter: false,
			row: 4,
			column: 4,
			direction: 1,
			jsonData: [1, 2, 6, 2, 5, 7, 3, 22, 4, 5, 4, 2, 4, 6, 2, 3],
			tips: "上下调整行列，点击更改方向，点击输入框快捷键才会生效",
			ver: "1.0.0"
		};
	},
	methods: {
		startTest() {
			//开始按钮，更改左侧的可编辑状态
			this.enter = !this.enter;
		},
		isDirection() {
			//方向数据
			if (!this.enter) {
				if (this.direction < 4) {
					this.direction++;
				} else {
					this.direction = 1;
				}
			}
		},
		isDelete(index) {
			//删除图标
			console.log(index);
		},
		isDrop() {
			//掉落
			console.log("掉落");
		},
		isFull() {
			//补满
			console.log("补满");
		}
	},
	computed: {
		isRotate() {
			//控制箭头的旋转方向
			let routate;
			switch (this.direction) {
				case 1:
					routate = 270;
					break;
				case 2:
					routate = 180;
					break;
				case 3:
					routate = 90;
					break;
				case 4:
					routate = 0;
					break;
			}
			return routate;
		}
	},
	watch: {
		jsonData() {
			//当行列状态处于不可编辑时，验证游戏数据是否填满格子
			let amount = this.row * this.column;
			let dataLength = this.jsonData.length;
			if (amount != dataLength && this.enter == true) {
				alert("数据错误，请检查");
			} else {
				console.log("数据正确");
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
		align-items: center;
		.test {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin: 15px 15px 15px 0;
			padding-left: 15px;
			border-left: 1px solid #dbdbdb;
			button {
				margin-bottom: 20px;
			}
			textarea {
				width: 120px !important;
				min-height: 250px;
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
				overflow: hidden;
				img {
					width: 100%;
					height: 100%;
				}
				span {
					position: absolute;
					bottom: 0px;
					right: 2px;
					font-size: 13px;
					color: rgb(153, 153, 153);
				}
				&:hover span {
					color: #fff;
				}
				&::before {
					content: "删除";
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.7);
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					opacity: 0;
					transition: 0.2s ease-in-out;
					font-size: 14px;
				}
				&:hover::before {
					opacity: 0.7;
				}
			}
		}
	}
	.msg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 8px 8px;
	}
}
</style>
