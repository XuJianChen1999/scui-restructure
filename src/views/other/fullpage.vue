<template>
  <el-container>
		<el-header>
			<el-page-header content="FullPage" @back="$router.go(-1)" />
		</el-header>
		<el-main>
			<el-empty description="FullPageMain"></el-empty>
		</el-main>
	</el-container>
</template>