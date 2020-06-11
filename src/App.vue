<template>
	<div id="app">
		<Xiaoxiaole />
	</div>
</template>

<script>
import Xiaoxiaole from "./components/Xiaoxiaole.vue";

export default {
	name: "App",
	components: {
		Xiaoxiaole
	}
};
</script>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
