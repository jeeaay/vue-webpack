/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:12
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-03-26 18:06:16
 */
<template>
  <div class="container content">
    <div class="bread">
      <p>当前位置：{{$route.name}}</p>
    </div>
    <div class="casesContent">
      <van-button type="primary" @click="addCase = true">
        <van-icon name="add-o" />添加案例</van-button>
    </div>
    <h2>案例列表</h2>
    <van-row class="cateList">
      <van-col span="12" v-for="(item,index) in cases" :key="item.case_id" @click.native="openCaseInfo(index)">
        <van-cell-group>
          <van-row>
            <van-col span="9">
              <img src="../../assets/case.jpg">
            </van-col>
            <van-col span="15">
              <van-cell :title="item.title" value="详细信息" :label="String(item.writer_id)" is-link/>
            </van-col>
          </van-row>
        </van-cell-group>
      </van-col>
    </van-row>
    <div class="pages">
      <van-pagination @change="onChange" v-model="currentPage" :total-items="totalCase" :items-per-page="10" />
    </div>
    <van-popup v-model="show" position="right" class="caseInfo">
        <div class="caseInfoBox">
          <div class="top clearfix">
          <van-cell-group class="caseTitleInput">
            <van-field
              v-model="caseInfo.title"
              icon="clear"
              placeholder="请输入案例标题"
              @click-icon="caseTitle = ''"
              class="caseTitle"
            />
          </van-cell-group>
            <p>发布时间：<span>{{caseTime}}</span></p>
          </div>
          <h3>案例图集：</h3>
          <van-row class="casePic" gutter="20">
            <van-col span="6"><img src="../../assets/case.jpg"></van-col>
            <van-col span="6"><img src="../../assets/case.jpg"></van-col>
            <van-col span="6"><img src="../../assets/case.jpg"></van-col>
          </van-row>
          <h3>案例内容：</h3>
          <div class="caseBody">
          <van-cell-group>
            <van-field
              v-model="caseInfo.content"
              type="textarea"
              placeholder="请输入案例内容"
              rows="1"
              icon="clear"
              @click-icon="caseInfo.content = ''"
              autosize
            />
          </van-cell-group>
          </div>
          <h3>其他：</h3>
          <div class="other">
            <van-row>
              <van-col span="12">案例类型：</van-col>
              <van-col span="12">
                <select v-model="selected" class="selectCase">
                  <option>请选择分类</option>
                  <option v-for="cate in cates" v-bind:value="cate.cate_id" :key="cate.cate_id">
                    {{cate.cate_name}}
                  </option>
                </select>
                <span class="fontS">选中的是：分类 {{ selected }}</span>
              </van-col>
              <van-col span="12">是否为国际：</van-col>
              <van-col span="12">
                <van-row>
                  <van-col span="12"><van-radio name="1" v-model="radio">是</van-radio></van-col>
                  <van-col span="12"><van-radio name="0" v-model="radio">不是</van-radio></van-col>
                </van-row>
              </van-col>
              <van-col span="12"><van-button type="default" @click="show = false">返回案例列表</van-button></van-col>
              <van-col span="12"><van-button type="danger" @click.native="deleteCase(caseInfo.case_id)">删除案例</van-button></van-col>
            </van-row>
          </div>
        </div>
    </van-popup>
    <div class="addCase">
      <van-popup v-model="addCase" position="top" class="caseInfo">
          <div class="caseInfoBox">
            <div class="top clearfix">
            <van-cell-group class="caseTitleInput">
              <van-field
                v-model="addCaseTitle"
                icon="clear"
                placeholder="请输入案例标题"
                @click-icon="caseTitle = ''"
                class="caseTitle"
              />
            </van-cell-group>
              <div class="addAu">
                <p>发布时间：<span>{{addCaseTime}}</span></p>
                <p>作者：{{caseAu}}</p>
              </div>
            </div>
            <h3>案例图集：</h3>
            <van-row class="casePic" gutter="20">
              <van-col span="6">
                <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
                  <van-icon name="photograph" />
                </van-uploader>
              </van-col>
            </van-row>
            <h3>案例内容：</h3>
            <div class="caseBody">
              <van-cell-group>
                <van-field
                  v-model="addCaseContent"
                  type="textarea"
                  placeholder="请输入案例内容"
                  rows="1"
                  autosize
                />
              </van-cell-group>
            </div>
            <h3>其他：</h3>
            <div class="other">
              <van-row>
                <van-col span="12">案例类型：</van-col>
                <van-col span="12">
                  <select v-model="selected" class="selectCase">
                    <option>请选择分类</option>
                    <option v-for="cate in cates" v-bind:value="cate.cate_id" :key="cate.cate_id">
                      {{cate.cate_name}}
                    </option>
                  </select>
                  <span class="fontS">选中的是：分类 {{ selected }}</span>
                </van-col>
                <van-col span="12">是否为国际：</van-col>
                <van-col span="12">
                  <van-row>
                    <van-col span="12"><van-radio name="1" v-model="radio">是</van-radio></van-col>
                    <van-col span="12"><van-radio name="0" v-model="radio">不是</van-radio></van-col>
                  </van-row>
                </van-col>
                <van-col span="12" class="btnStyle"><van-button type="default" @click="addCase = false">取消</van-button></van-col>
                <van-col span="12" class="btnStyle"><van-button type="primary" @click="onClickAlert">确认</van-button></van-col>
              </van-row>
            </div>
          </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'vant'
import qs from 'qs'
let GetCaseList = (currentPage) => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('access_token')) {
      let usertoken = localStorage.getItem('access_token')
      let url = '/apis/lcase/?access_token=' + usertoken + '&page=' + currentPage
      axios.get(url)
      .then(response => {
        resolve(response.data.data)
      })
    }
  })
}
function timestampToTime (timestamp) {
  let date = new Date(timestamp * 1000)
  let Y = date.getFullYear() + '/'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
  let D = date.getDate() + ' '
  return (Y + M + D)
}
export default {
  data () {
    return {
      addCaseBox: false,
      show: false,
      currentPage: 1,
      caseCate: '分类ID',
      radio: '',
      cases: [],
      images: [],
      totalCase: 0,
      caseInfo: [],
      selected: '',
      caseTime: '',
      catePage: '',
      addCaseTitle: '',
      addCaseTime: '',
      addCaseContent: '',
      caseAu: '',
      imagArr: [],
      cates: [],
      addCase: false
    }
  },
  async mounted () {
    let data = await GetCaseList(this.currentPage)
    this.addCaseTime = timestampToTime(Date.parse(new Date()) / 1000)
    this.caseAu = localStorage.getItem('real_name')
    this.cases = data.caseList
    this.totalCase = data.totalCase
    if (localStorage.getItem('access_token')) {
      let usertoken = localStorage.getItem('access_token')
      let url = '/apis/cate/?access_token=' + usertoken
      axios.get(url)
      .then(response => {
        this.cateList = response.data.data
        this.cates = response.data.data.cateList
        if (this.cateList.totalCate / 10 < 1) {
          this.catePage = 1
        } else if (this.cateList.totalCate / 10 === 0) {
          this.catePage = (this.cateList.totalCate / 10)
        } else if (this.cateList.totalCate / 10 > 0) {
          this.catePage = parseInt((this.cateList.totalCate / 10)) + 1
        }
        for (let cateP = 2; cateP <= this.catePage; cateP++) {
          let usertoken = localStorage.getItem('access_token')
          let url = '/apis/cate/?access_token=' + usertoken + '&page=' + cateP
          axios.get(url)
          .then(response => {
            this.cates = this.cates.concat(response.data.data.cateList)
          })
        }
      })
    }
  },
  methods: {
    async onChange () {
      let data = await GetCaseList(this.currentPage)
      this.cases = data.caseList
      this.totalCase = data.totalCase
    },
    onRead (file) {
      this.imagArr = file
      console.log(this.imagArr)
    },
    openCaseInfo (index) {
      this.show = true
      this.caseInfo = this.cases[index]
      this.caseTime = timestampToTime(this.caseInfo.pub_date)
      if (this.caseInfo.type_id === null || this.caseInfo.type_id === '') {
        this.selected = '请选择分类'
      } else {
        this.selected = this.caseInfo.type_id
      }
      this.radio = this.caseInfo.is_international
      this.radio = String(this.caseInfo.is_international)
    },
    onClickAlert () {
      let url = '/apis/lcase/?access_token=' + localStorage.getItem('access_token')
      if (this.addUser !== '') {
        axios.post(url, qs.stringify({
          title: this.addCaseTitle,
          content: this.addCaseContent,
          type_id: this.cate_name,
          is_international: this.radio,
          writer_id: this.caseAu,
          pub_date: this.addCaseTime,
          img_path: this.imagArr
        }))
        .then((response) => {
          if (response.data.error) {
            Dialog.alert({
              title: '添加案例失败',
              message: response.data.message
            })
          } else {
            Dialog.alert({
              title: '添加案例失败',
              message: '案例' + this.addCaseTitle + '添加成功'
            }).then(() => {
              this.$router.go(0)
            })
          }
        })
      } else {
        Dialog.alert({
          title: '错误',
          message: '请填写案例名'
        })
      }
    },
    deleteCase (id) {
      let url = '/apis/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
      axios.delete(url)
        .then((response) => {
          Dialog.alert({
            title: '删除成功',
            message: response.data.data
          }).then(() => {
            this.$router.go(0)
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.cateList
  .van-col-12
    margin-bottom: 10px
    cursor: pointer
    .van-cell-group
      height: 100%
      .van-col-9
        img
          max-width: 100%
          width: 100%
.caseInfo
  height: 100%
  width: 60%
  padding: 80px 20px 0 20px
  .caseInfoBox
    .top
      .caseTitleInput
        float: left
        .caseTitle
          padding-left: 0
          input
            font-size: 1.5rem 
            font-weight: 700
            color: #333
            height: 50px
      p
        float: right
        margin-top: 15px
    .casePic
      .van-col
        img
          width: 100%
      .button
        padding: 30px 40px !important
    .caseBody
      textarea 
        height: 100px
.other
  .van-col
    margin-bottom: 20px
  .caseCate
    padding-left: 0
.selectCase
  width: 140px
  padding-left: 5px
  height: 30px
  font-size: 16px
  border: 1px solid #ccc
  color: #333
.fontS
  font-size: 14px
  color: #777
.addCase
  .btnStyle
    button
      width: 60%
      margin: 0 auto
      display: block
  .addAu
    float: right
    p
      margin-left: 15px
      clear: both
      float: left !important
      margin: 10px 0 !important
      font-size: 15px

</style>

