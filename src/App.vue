<template>
	<div id="app">
		<Xiaoxiaole />
	</div>
</template>

<script>
import Xiaoxiaole from "./views/Xiaoxiaole.vue";

export default {
	name: "App",
	components: {
		Xiaoxiaole
	}
};
</script>

<style lang="less">
#app {
	font-family: Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
