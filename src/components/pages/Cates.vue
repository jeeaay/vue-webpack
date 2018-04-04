/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:12
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-04-02 15:27:42
 */
<template>
  <div class="container content">
    <div class="bread">
      <p>当前位置：{{$route.name}}</p>
    </div>
    <div class="catesContent">
      <van-button type="primary" @click="addCateBox = true">
        <van-icon name="add-o" />添加分类</van-button>
    </div>
    <h2>分类列表</h2>
    <van-row class="catesList">
      <van-col span="12" v-for="(cate,index) in cates" :key="cate.cate_id" @click.native="modCaseInfo(index)">
        <van-cell :title="cate.cate_name" is-link value="编辑"/>
      </van-col>
    </van-row>
    <div class="pages">
      <van-pagination @change="onChange" v-model="currentPage" :total-items="totalCate" :items-per-page="10" />
    </div>
    <van-popup v-model="addCateBox" class="addcate">
      <h2>添加分类</h2>
      <van-row>
        <van-col span="24">
          <van-field label="分类名称：" placeholder="请输入分类名称" v-model="addCate" icon="clear" @click-icon="addCate = ''" />
        </van-col>
        <van-col span="24">
          <van-button type="default" @click="addCateBox = false" style="margin-right: 30px;">取消</van-button>
          <van-button type="primary" @click="onClickAlert">确认</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <van-popup v-model="cateed" class="cateb">
      <h2>编辑分类</h2>
      <van-row>
        <van-col span="24">
          <van-field label="分类ID：" v-model="cateInfo.cate_id" disabled="disabled"/>
          <van-field label="分类名称：" v-model="cateInfo.cate_name" @keyup="onKeyup(cateInfo.cate_id)" icon="clear" @click-icon="cateInfo.cate_name = ''" />
        </van-col>
        <van-col span="24" class="marginMid">
          <van-button type="default" @click="cateed = false" style="margin-right: 20px;">关闭</van-button>
          <van-button type="danger" @click="cateed = false" @click.native="deleteCate(cateInfo.cate_id)">删除</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'vant'
import qs from 'qs'
let GetCateList = (currentPage) => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('access_token')) {
      let usertoken = localStorage.getItem('access_token')
      let url = '/cate/?access_token=' + usertoken + '&page=' + currentPage
      axios.get(url)
      .then(response => {
        resolve(response.data.data)
      })
    }
  })
}

export default {
  data () {
    return {
      addCateBox: false,
      cateed: false,
      cates: [],
      totalCate: 0,
      currentPage: 1,
      cateInfo: [],
      addCate: ''
    }
  },
  async mounted () {
    let data = await GetCateList(this.currentPage)
    this.cates = data.cateList
    this.totalCate = data.totalCate
  },
  methods: {
    async onChange () {
      let data = await GetCateList(this.currentPage)
      this.cates = data.cateList
      this.totalCate = data.totalCate
    },
    modCaseInfo (index) {
      this.cateed = true
      this.cateInfo = this.cates[index]
    },
    deleteCate (id) {
      let url = '/cate/' + id + '?access_token=' + localStorage.getItem('access_token')
      axios.delete(url)
        .then((response) => {
          Dialog.alert({
            title: '删除成功',
            message: response.data.data
          }).then(() => {
            this.$router.go(0)
          })
        })
    },
    onKeyup (id) {
      let url = '/cate/' + id + '?access_token=' + localStorage.getItem('access_token')
      clearTimeout(window.t)
      window.t = setTimeout(() => {
        if (this.cateInfo.cate_name !== '') {
          axios.put(url, qs.stringify({
            cate_name: this.cateInfo.cate_name
          }))
        }
      }, 500)
    },
    onClickAlert () {
      let url = '/cate/?access_token=' + localStorage.getItem('access_token')
      if (this.addUser !== '') {
        axios.post(url, qs.stringify({
          cate_name: this.addCate
        }))
        .then((response) => {
          if (response.data.error) {
            Dialog.alert({
              title: '添加分类失败',
              message: response.data.message
            })
          } else {
            Dialog.alert({
              title: '添加成功',
              message: '分类' + this.addCate + '添加成功'
            }).then(() => {
              this.$router.go(0)
            })
          }
        })
      } else {
        Dialog.alert({
          title: '错误',
          message: '请填写分类名'
        })
      }
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
.marginMid{
  padding-top: 10px;
}
.catesList .van-col {
  margin-bottom: 10px;
  cursor: pointer;
}
.catesList {
  padding: 10px 0;
}
.addcate,.cateb {
  padding: 10px 25px 25px;
}
.addcate{
  padding: 25px 20px;
}
.addcate h2{
  margin: 10px 0;
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

