/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:12
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-03-29 10:00:55
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
      <van-col span="12" v-for="(item,index) in cases" :key="item.pub_date" @click.native="openCaseInfo(index)">
        <van-cell-group>
          <van-row>
            <van-col span="9">
              <img :src="JSON.parse(item.img_path.replace(/\\\\/g, '/'))[0]">
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
              @keyup="onKeyup(caseInfo.case_id)"
              class="caseTitle"
            />
          </van-cell-group>
            <p>发布时间：<span>{{caseTime}}</span></p>
          </div>
          <h3>案例图集：</h3>
          <van-row class="casePic" gutter="20">
            <van-col span="6" v-for="(caseImageInfo,index) in caseImageInfos" :key='caseImageInfo'>
              <img :src="caseImageInfo.replace(/\\/g, '/')">
              <div class="deleteImage" @click="deleteImage(index)"><van-icon name="clear" /></div>
            </van-col>
          </van-row>
          <van-button type="default" class="upload">
            <van-uploader :after-read="caseInfoAddImage" accept="image/png, image/gif, image/jpeg" multiple>
              <span>上传图片</span> <van-icon name="photograph" class="iconFont"/>
            </van-uploader>
          </van-button>
          <h3>案例内容：</h3>
          <div class="caseBody">
          <van-cell-group>
            <van-field
              @keyup="onKeyup(caseInfo.case_id)"
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
                <select v-model="selected" class="selectCase" @change='change(caseInfo.case_id)'>
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
                  <van-col span="12"><van-radio name="1" v-model="radio" @click='clickChange(caseInfo.case_id)'>是</van-radio></van-col>
                  <van-col span="12"><van-radio name="0" v-model="radio" @click='clickChange(caseInfo.case_id)'>不是</van-radio></van-col>
                </van-row>
              </van-col>
              <van-col span="12"><van-button type="default" @click="show = false">返回案例列表</van-button></van-col>
              <van-col span="12"><van-button type="danger" @click.native="deleteCase(caseInfo.case_id)">删除案例</van-button></van-col>
            </van-row>
          </div>
        </div>
    </van-popup>
    <div class="addCase clearfix">
      <van-popup v-model="addCase" position="top" class="caseInfo addCaseInfo">
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
            <van-button type="default" class="upload">
              <van-uploader :after-read="logContent" accept="image/png, image/gif, image/jpeg" multiple>
                <span>上传图片</span> <van-icon name="photograph" class="iconFont"/>
              </van-uploader>
            </van-button>
            <van-button type="default" class="upload" @click="clearImage">清空上传列表 <van-icon name="delete" /></van-button>
            <van-row class="casePic addpic" gutter="20">
              <van-col span="3" v-for="(imagArr,index) of imagArrs" :key='imagArr'>
                <img :src="imagArr">
                <div class="deleteImage" @click="adddeleteImage(index)"><van-icon name="clear" /></div>
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
                  <select v-model="addSelected" class="selectCase">
                    <option>请选择分类</option>
                    <option v-for="addCaseCate in addCaseCates" v-bind:value="addCaseCate.cate_id" :key="addCaseCate.cate_id">
                      {{addCaseCate.cate_name}}
                    </option>
                  </select>
                  <span class="fontS">{{descript}}{{addSelected}}</span>
                </van-col>
                <van-col span="12">是否为国际：</van-col>
                <van-col span="12">
                  <van-row>
                    <van-col span="12"><van-radio name="1" v-model="addRadio">是</van-radio></van-col>
                    <van-col span="12"><van-radio name="0" v-model="addRadio">不是</van-radio></van-col>
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
      list: [],
      currentPage: 1,
      caseCate: '分类ID',
      radio: '',
      addRadio: '',
      cases: [],
      images: [],
      totalCase: 0,
      caseInfo: [],
      selected: '',
      addSelected: '',
      zanf: [],
      caseTime: '',
      catePage: '',
      addCaseTitle: '',
      addCaseTime: '',
      addCaseContent: '',
      caseImageInfos: [],
      caseAu: '',
      imagArrs: [],
      descript: '您选择的分类是：',
      cates: [],
      addCaseCates: [],
      addCase: false
    }
  },
  async mounted () {
    let data = await GetCaseList(this.currentPage)
    this.addCaseTime = timestampToTime(Date.parse(new Date()) / 1000)
    this.caseAu = localStorage.getItem('userID')
    this.cases = data.caseList
    this.totalCase = data.totalCase
    if (this.addSelected === '') {
      this.addSelected = '请选择分类'
    } else {
      this.descript = '您选择的分类是：'
    }
    if (localStorage.getItem('access_token')) {
      let usertoken = localStorage.getItem('access_token')
      let url = '/apis/cate/?access_token=' + usertoken
      axios.get(url)
      .then(response => {
        this.cateList = response.data.data
        this.cates = response.data.data.cateList
        this.addCaseCates = response.data.data.cateList
        if (this.cateList.totalCate / 10 < 1) {
          this.catePage = 1
        } else if (this.cateList.totalCate / 10 === 0) {
          this.catePage = parseInt((this.cateList.totalCate / 10))
        } else if (this.cateList.totalCate / 10 > 0) {
          this.catePage = parseInt((this.cateList.totalCate / 10)) + 1
        }
        if (this.catePage >= 2) {
          for (let cateP = 2; cateP <= this.catePage; cateP++) {
            let usertoken = localStorage.getItem('access_token')
            let url = '/apis/cate/?access_token=' + usertoken + '&page=' + cateP
            axios.get(url)
            .then(response => {
              this.cates = this.cates.concat(response.data.data.cateList)
              this.addCaseCates = this.addCaseCates.concat(response.data.data.cateList)
            })
          }
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
    clearImage () {
      this.imagArrs = []
    },
    logContent (file) {
      this.imagArrs.push(file.content)
    },
    caseInfoAddImage (file) {
      this.caseImageInfos.push(file.content)
      console.log(this.caseImageInfos)
      let addImage = file.content
      let url = '/apis/imgmanage/add/' + this.caseInfo.case_id + '?access_token=' + localStorage.getItem('access_token')
      axios.post(url, qs.stringify({
        case_id: this.caseInfo.case_id,
        img: addImage
      }))
    },
    async openCaseInfo (index) {
      this.show = true
      let usertoken = localStorage.getItem('access_token')
      let url = '/apis/lcase/' + index + '?access_token=' + usertoken

      let readcase = await axios(url)

      this.caseInfo = readcase['data']['data']
      this.caseImageInfos = JSON.parse(this.caseInfo.img_path)
      this.caseTime = timestampToTime(this.caseInfo.pub_date)
      if (this.caseInfo.type_id === null || this.caseInfo.type_id === '') {
        this.selected = '请选择分类'
      } else {
        this.selected = this.caseInfo.type_id
      }
      this.radio = this.caseInfo.is_international
      this.radio = String(this.caseInfo.is_international)
    },
    deleteImage (index) {
      let delo = this.caseImageInfos.splice(index, 1)
      let url = '/apis/imgmanage/del?access_token=' + localStorage.getItem('access_token')
      axios.post(url, qs.stringify({
        case_id: this.caseInfo.case_id,
        imgarr: JSON.stringify(this.caseImageInfos),
        delimg: JSON.stringify(delo)
      }))
    },
    adddeleteImage (index) {
      this.imagArrs.splice(index, 1)
    },
    onKeyup (id) {
      let url = '/apis/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
      clearTimeout(window.t)
      window.t = setTimeout(() => {
        if (this.caseInfo.title !== '') {
          axios.put(url, qs.stringify({
            title: this.caseInfo.title,
            content: this.caseInfo.content
          }))
        }
      }, 500)
    },
    change (id) {
      let url = '/apis/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
      clearTimeout(window.t)
      window.t = setTimeout(() => {
        axios.put(url, qs.stringify({
          type_id: this.selected
        }))
      }, 500)
    },
    clickChange (id) {
      let url = '/apis/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
      clearTimeout(window.t)
      window.t = setTimeout(() => {
        if (this.caseInfo.title !== '') {
          axios.put(url, qs.stringify({
            is_international: this.radio
          }))
        }
      }, 500)
    },
    onClickAlert () {
      let url = '/apis/lcase/?access_token=' + localStorage.getItem('access_token')
      if (this.addCaseTitle !== '') {
        axios.post(url, qs.stringify({
          title: this.addCaseTitle,
          content: this.addCaseContent,
          type_id: this.addSelected,
          is_international: this.addRadio,
          writer_id: this.caseAu,
          pub_date: Date.parse(new Date()) / 1000,
          img_path: this.imagArrs
        }))
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error)
            Dialog.alert({
              title: '添加案例失败',
              message: response.data.message
            })
          } else {
            Dialog.alert({
              title: '添加案例成功',
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
    @media(max-width: 1000px)
      width: 100%
      margin-bottom: 20px
    cursor: pointer
    .van-cell-group
      height: 100%
      .van-col-15
        @media(max-width: 759px)
          width: 100%
      .van-col-9
        @media(max-width: 759px)
          width: 100%
        img
          max-width: 100%
          width: 100%
.caseInfo
  height: 100%
  width: 60%
  padding: 80px 20px 0 20px
  @media(max-width: 1000px)
    width: 90%
  @media(max-width: 759px)
    width: 95%
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
        position: relative
        img
          width: 100%
        .deleteImage
          position: absolute
          right: 14px
          top: 4px
          font-size: 20px
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
  .addCaseInfo
    @media(max-width: 1199px)
      width: 100% !important
      height: 90% !important
      overflow-y: scroll
    @media(max-width: 759px)
      width: 100% !important
      height: 100% !important
      padding-top: 0 !important
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
.van-uploader
  margin-bottom: 10px
  i
    vertical-align: middle;
.iconFont
  font-size: 18px !important
.addpic
  margin-top: 10px
.upload
  margin-top: 10px
</style>

