<template>
  <div class="container content">
    <div class="bread">
      <p>当前位置：{{$route.name}}</p>
    </div>
    <div class="catesContent">
      <van-button type="primary" @click="addCate = true">
        <van-icon name="add-o" />添加分类</van-button>
    </div>
    <h2>分类列表</h2>
    <van-row class="catesList">
      <van-col span="12">
        <van-cell title="分类1" is-link value="编辑" @click="cateed = true"/>
      </van-col>
      <van-col span="12">
        <van-cell title="分类2" is-link value="编辑" @click="cateed = true"/>
      </van-col>
      <van-col span="12">
        <van-cell title="分类3" is-link value="编辑" @click="cateed = true"/>
      </van-col>
      <van-col span="12">
        <van-cell title="分类4" is-link value="编辑" @click="cateed = true"/>
      </van-col>
    </van-row>
    <div class="pages">
      <van-pagination v-model="currentPage" :total-items="24" :items-per-page="5" />
    </div>
    <van-popup v-model="addCate" class="addcate">
      <h2>添加用户</h2>
      <van-row>
        <van-col span="24">
          <van-field label="分类名称：" placeholder="请输入分类名称" />
          <van-field label="分类描述：" type="textarea" placeholder="请输入分类描述" rows="1" autosize />
        </van-col>
        <van-col span="24">
          <van-button type="default" @click="add = false" style="margin-right: 20px;">取消</van-button>
          <van-button type="primary" @click="onClickAlert,add = false">确认</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <van-popup v-model="cateed" class="cateb">
      <h2>编辑分类</h2>
      <van-row>
        <van-col span="24">
          <van-field label="分类名称：" value="修改分类名称" icon="clear" @click-icon="username = ''"/>
          <van-field label="分类描述：" type="textarea" value="修改分类描述" icon="clear" rows="1" autosize @click-icon="username = ''"/>
        </van-col>
        <van-col span="24">
          <van-button type="default" @click="cateb = false" style="margin-right: 20px;">取消</van-button>
          <van-button type="danger" @click="cateb = false">删除</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentPage: true,
      addCate: false,
      cateed: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.catesContent .van-icon-add-o {
  font-size: 16px;
  vertical-align: middle;
  margin-right: 6px;
}
.catesList .van-col {
  margin-bottom: 10px;
  cursor: pointer;
}
.catesList {
  padding: 10px 0;
}
.addcate,.cateb {
  padding: 10px 25px;
}
@media (max-width: 759px) {
  .addcate,.cateb {
    width: 90%;
  }
}
@media (min-width: 1000px) {
  .addcate,.cateb {
    width: 80%;
  }
}
@media (min-width: 1200px) {
  .addcate,.cateb {
    width: 50%;
  }
}
</style>

