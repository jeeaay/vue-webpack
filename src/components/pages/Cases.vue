/*
 * @Author: londy
 * @Date: 2018-02-24 16:42:12
 * @Last Modified by: hs.londy
 * @Last Modified time: 2018-04-09 16:48:53
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
    <van-row class="cateList" gutter="20">
      <van-col span="12" v-for="(item,index) in cases" :key="item.pub_date" @click.native="openCaseInfo(index)">
        <van-cell-group>
          <van-row>
            <van-col span="9">
              <img :src="!item.img_path ? '' : JSON.parse(item.img_path.replace(/\\\\/g, '/'))[0]">
            </van-col>
            <van-col span="15">
              <p>{{item.title}}</p>
              <select v-model="item.type_id" class="caseNameSelected" disabled="disabled">
                <option>请选择分类</option>
                <option v-for="cate in cates" v-bind:value="cate.cate_id" :key="cate.cate_id">
                  分类：{{cate.cate_name}}
                </option>
              </select>
              <p class="float-right">详细信息 <van-icon name="arrow" /></p>
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
          <div class="timeSwitch">
            <div v-if="isShow" @click="showToggle" class="noselect">更新时间：<span>{{updatatime}}</span></div>
            <div v-else @click="showToggle" class="noselect">发布时间：<span>{{caseTime}}</span></div>
          </div>
          </div>
          <van-row class="caseMainInfo">
            <van-cell-group>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.dep"
                    label="部门"
                    icon="clear"
                    placeholder="请输入采集部门"
                    @click-icon="caseInfo.dep = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.dep_user"
                    label="填写人"
                    icon="clear"
                    placeholder="请输入填写人员"
                    @click-icon="caseInfo.dep_user = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.info_source"
                    label="联系方式"
                    icon="clear"
                    placeholder="请输入联系方式"
                    @click-icon="caseInfo.info_source = ''"
                  />
                </van-col>
            </van-cell-group>
          </van-row>
          <div class="other">
            <van-row>
              <van-col span="12">案例类型：
                <select v-model="selected" class="selectCase paddingLeftS" @change='change(caseInfo.case_id)'>
                  <option>请选择分类</option>
                  <option v-for="cate in cates" v-bind:value="cate.cate_id" :key="cate.cate_id">
                    {{cate.cate_name}}
                  </option>
                </select>
                <span class="fontS">选中的是：分类 {{ selected }}</span>
              </van-col>
              <!-- <van-col span="12">
                  <div class="ina">是否为国际：</div>
                  <van-radio name="1" v-model="radio" @click='clickChange(caseInfo.case_id)'>是</van-radio>
                  <van-radio name="0" v-model="radio" @click='clickChange(caseInfo.case_id)'>不是</van-radio>
              </van-col> -->
            </van-row>
          </div>
          <van-row class="caseMainInfo">
            <van-cell-group>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.production_areas"
                    label="投产地区"
                    icon="clear"
                    placeholder="如是国际案例，中英文均需填写"
                    @click-icon="caseInfo.production_areas = ''"
                  />
                </van-col>
                <van-col span="12" class="dataTime">
                  <van-field
                    v-model="dataTimeZ"
                    label="投产时间"
                    icon="clear"
                    placeholder="请输入投产时间"
                    @click="dataTime()"
                    @click-icon="caseInfo.production_date = ''"
                  />
                  <van-datetime-picker
                    v-model="currentDate2"
                    v-show="caseDataTime"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel= "closeData"
                    @confirm= "postTime(caseInfo.case_id)"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.equipment"
                    label="设备配置"
                    icon="clear"
                    placeholder="请输入设备配置"
                    @click-icon="caseInfo.equipment = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.material"
                    label="加工物料"
                    icon="clear"
                    placeholder="如是国际案例，中英文均需填写"
                    @click-icon="caseInfo.material = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.capacity"
                    label="产量"
                    icon="clear"
                    placeholder="请输入产量"
                    @click-icon="caseInfo.capacity = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.feed_size"
                    label="进料粒度"
                    icon="clear"
                    placeholder="请输入进料粒度"
                    @click-icon="caseInfo.feed_size = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.output_size"
                    label="出料粒度"
                    icon="clear"
                    placeholder="请输入出料粒度"
                    @click-icon="caseInfo.output_size = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.application"
                    label="应用领域"
                    icon="clear"
                    placeholder="请输入应用领域"
                    @click-icon="caseInfo.application = ''"
                  />
                </van-col>
                <van-col span="12">
                  <van-field
                    @keyup="onKeyup(caseInfo.case_id)"
                    v-model="caseInfo.other"
                    label="其他"
                    icon="clear"
                    placeholder="其他"
                    @click-icon="caseInfo.other = ''"
                  />
                </van-col>
            </van-cell-group>
          </van-row>
          <h3>案例图集：</h3>
          <van-row class="casePic" gutter="20">
            <van-col span="6" v-for="(caseImageInfo,index) in caseImageInfos" :key='caseImageInfo'>
              <img :src="caseImageInfo.replace(/\\/g, '/')">
              <div class="deleteImage" @click="deleteImage(index)"><van-icon name="clear" /></div>
            </van-col>
          </van-row>
          <van-button type="default" class="upload">
            <!-- <van-uploader :after-read="caseInfoAddImage" accept="image/png, image/gif, image/jpeg" multiple result-type="null">
              <span>上传图片</span> <van-icon name="photograph" class="iconFont"/>
            </van-uploader> -->
            <uploader @uploadImgFile="onChangeImgList">
              <span>上传图片</span> <van-icon name="photograph" class="iconFont"/>
            </uploader>
          </van-button>
          <h3>工艺流程：</h3>
          <div class="caseBody">
            <van-cell-group>
              <van-field
                @keyup="onKeyup(caseInfo.case_id)"
                v-model="caseInfo.scene"
                type="textarea"
                placeholder="请输入工艺流程"
                rows="1"
                icon="clear"
                @click-icon="caseInfo.scene = ''"
                autosize
              />
            </van-cell-group>
          </div>
          <h3>客户评价：</h3>
          <div class="caseBody">
            <van-cell-group>
              <van-field
                @keyup="onKeyup(caseInfo.case_id)"
                v-model="caseInfo.content"
                type="textarea"
                placeholder="请输入客户评价"
                rows="1"
                icon="clear"
                @click-icon="caseInfo.content = ''"
                autosize
              />
            </van-cell-group>
          </div>
          <van-row>
            <van-col span="12" class="infoBtn">
              <van-button type="default" @click="show = false">返回列表</van-button>
            </van-col>
            <van-col span="12" class="infoBtn">
              <van-button type="danger" @click.native="deleteCase(caseInfo.case_id)">删除案例</van-button>
            </van-col>
          </van-row>
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
            <van-row class="caseMainInfo">
              <van-cell-group>
                  <van-col span="12">
                    <van-field
                      v-model="dep"
                      label="部门："
                      icon="clear"
                      placeholder="请输入采集部门"
                      @click-icon="dep = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="dep_user"
                      label="填写人："
                      icon="clear"
                      placeholder="请输入填写人员"
                      @click-icon="dep_user = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="info_source"
                      label="联系方式："
                      icon="clear"
                      placeholder="请输入联系方式"
                      @click-icon="info_source = ''"
                    />
                  </van-col>
              </van-cell-group>
            </van-row>
            <div class="other">
              <van-row>
                <van-col span="12">
                  案例类型：
                  <select v-model="addSelected" class="selectCase">
                    <option>请选择分类</option>
                    <option v-for="addCaseCate in addCaseCates" v-bind:value="addCaseCate.cate_id" :key="addCaseCate.cate_id">
                      {{addCaseCate.cate_name}}
                    </option>
                  </select>
                  <span class="fontS">{{descript}}{{addSelected}}</span>
                </van-col>
                <!-- <van-col span="12">
                  <div class="ina">是否为国际：</div>
                  <van-radio name="1" v-model="addRadio">是</van-radio>
                  <van-radio name="0" v-model="addRadio">不是</van-radio>
                </van-col> -->
              </van-row>
            </div>
            <van-row class="caseMainInfo">
              <van-cell-group>
                  <van-col span="12">
                    <van-field
                      v-model="productionAreas"
                      label="投产地区"
                      icon="clear"
                      placeholder="如是国际案例，中英文均需填写"
                      @click-icon="productionAreas = ''"
                    />
                  </van-col>
                  <van-col span="12" class="dataTime">
                    <van-field
                      v-model="productionDate"
                      label="投产时间"
                      icon="clear"
                      placeholder="投产时间"
                      @click="dataTime()"
                      @click-icon="productionDate = ''"
                    />
                    <van-datetime-picker
                      v-model="currentDate"
                      v-show="caseDataTime"
                      type="date"
                      :min-date="minDate"
                      :max-date="maxDate"
                      @cancel= "closeData"
                      @confirm= "returnTime"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="equipment"
                      label="设备配置："
                      icon="clear"
                      placeholder="请输入设备配置"
                      @click-icon="equipment = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="material"
                      label="加工物料："
                      icon="clear"
                      placeholder="如是国际案例，中英文均需填写"
                      @click-icon="material = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="capacity"
                      label="产量："
                      icon="clear"
                      placeholder="请输入产量"
                      @click-icon="capacity = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="feed_size"
                      label="进料粒度："
                      icon="clear"
                      placeholder="请输入进料粒度"
                      @click-icon="feed_size = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="output_size"
                      label="出料粒度："
                      icon="clear"
                      placeholder="请输入出料粒度"
                      @click-icon="output_size = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="application"
                      label="应用领域："
                      icon="clear"       
                      placeholder="请输入应用领域"
                      @click-icon="application = ''"
                    />
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-model="other"
                      label="其他："
                      icon="clear"
                      placeholder="其他"
                      @click-icon="other = ''"
                    />
                  </van-col>
              </van-cell-group>
            </van-row>
            <h3>案例图集：</h3>
            <van-button type="default" class="upload">
              <!-- <van-uploader :after-read="logContent" accept="image/png, image/gif, image/jpeg" multiple result-type="text">
                <span>上传图片</span> <van-icon name="photograph" class="iconFont"/>
              </van-uploader> -->
              <uploader @uploadImgFile="onUploadImgFile">
                <span>上传图片</span> <van-icon name="photograph" class="iconFont"/>
              </uploader>
            </van-button>
            <van-row class="casePic addpic" gutter="20">
              <van-col span="6" v-for="(imagArr,index) of imagArrs" :key='imagArr'>
                <img :src="imagArr">
                <div class="deleteImage" @click="adddeleteImage(index)"><van-icon name="clear" /></div>
              </van-col>
            </van-row>
            <h3>客户评价：</h3>
            <div class="caseBody">
              <van-cell-group>
                <van-field
                  v-model="addCaseContent"
                  type="textarea"
                  placeholder="请输入客户评价"
                  rows="1"
                  autosize
                />
              </van-cell-group>
            </div>
            <h3>工艺流程：</h3>
            <div class="caseBody">
              <van-cell-group>
                <van-field
                  v-model="scene"
                  type="textarea"
                  placeholder="请输入工艺流程"
                  rows="1"
                  autosize
                />
              </van-cell-group>
            </div>
            <van-row>
                <van-col span="12" class="btnStyle"><van-button type="default" @click="addCase = false">取消</van-button></van-col>
                <van-col span="12" class="btnStyle"><van-button type="primary" @click="onClickAlert">确认</van-button></van-col>
            </van-row>
          </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'vant'
import qs from 'qs'
import Uploader from '@/components/common/Uploader'
let GetCaseList = (currentPage) => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('access_token')) {
      let usertoken = localStorage.getItem('access_token')
      let url = '/lcase/?access_token=' + usertoken + '&page=' + currentPage
      axios.get(url)
      .then(response => {
        resolve(response.data.data)
      })
    }
  })
}
function upDataToTime (timestamp) {
  let date = new Date(timestamp * 1000)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let H = date.getHours() + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  return (Y + M + D + H + m)
}
function DataTime (data) {
  return (new Date(Date.parse(data))).toLocaleDateString()
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
      addRadio: '0',
      cases: [],
      images: [],
      dataTimeZ: '',
      totalCase: 0,
      caseInfo: [],
      selected: '',
      addSelected: '',
      caseDataTime: false,
      zanf: [],
      caseTime: '',
      isShow: false,
      catePage: '',
      addCaseTitle: '',
      productionAreas: '',
      minDate: new Date(1980, 10, 1),
      maxDate: new Date(),
      dep: '',
      dep_user: localStorage.getItem('real_name'),
      info_source: '',
      scene: '',
      equipment: '',
      material: '',
      capacity: '',
      feed_size: '',
      output_size: '',
      application: '',
      other: '',
      addCaseTime: '',
      updatatime: '',
      addCaseContent: '',
      productionDate: '',
      caseImageInfos: [],
      currentDate: new Date(),
      currentDate2: new Date(),
      caseAu: '',
      imagArrs: [],
      descript: '您选择的分类是：',
      cates: [],
      addCaseCates: [],
      addCase: false
    }
  },
  components: {
    Uploader
  },
  async mounted () {
    let data = await GetCaseList(this.currentPage)
    this.addCaseTime = upDataToTime(Date.parse(new Date()) / 1000)
    this.caseAu = localStorage.getItem('real_name')
    this.productionDate = DataTime(this.currentDate)
    this.cases = data.caseList
    this.totalCase = data.totalCase
    if (this.addSelected === '') {
      this.addSelected = '请选择分类'
    } else {
      this.descript = '您选择的分类是：'
    }
    if (localStorage.getItem('access_token')) {
      let usertoken = localStorage.getItem('access_token')
      let url = '/cate/?access_token=' + usertoken
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
            let url = '/cate/?access_token=' + usertoken + '&page=' + cateP
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
    dataTime () {
      this.caseDataTime = true
    },
    closeData () {
      this.caseDataTime = false
    },
    returnTime () {
      this.productionDate = DataTime(this.currentDate)
      this.caseDataTime = false
    },
    async postTime (id) {
      this.dataTimeZ = DataTime(this.currentDate2)
      this.caseDataTime = false
      let url = '/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
      axios.put(url, qs.stringify({
        production_date: this.currentDate2
      }))
    },
    showToggle () {
      this.isShow = !this.isShow
    },
    async onChange () {
      let data = await GetCaseList(this.currentPage)
      this.cases = data.caseList
      this.totalCase = data.totalCase
    },
    clearImage () {
      this.imagArrs = []
    },
    async openCaseInfo (index) {
      this.show = true
      let usertoken = localStorage.getItem('access_token')
      let readcase = await axios('/lcase/' + this.cases[index]['case_id'] + '?access_token=' + usertoken)
      this.caseInfo = readcase['data']['data']
      this.dataTimeZ = DataTime(this.caseInfo.production_date)
      if (!this.caseInfo.img_path) {
        this.caseImageInfos = []
      } else {
        this.caseImageInfos = JSON.parse(this.caseInfo.img_path)
      }
      this.caseTime = upDataToTime(this.caseInfo.pub_date)
      this.updatatime = upDataToTime(this.caseInfo.up_date)
      if (this.caseInfo.type_id === null || this.caseInfo.type_id === '') {
        this.selected = '请选择分类'
      } else {
        this.selected = this.caseInfo.type_id
      }
      this.radio = this.caseInfo.is_international
      this.radio = String(this.caseInfo.is_international)
    },
    async deleteImage (index) {
      let data = {
        delimg: this.caseImageInfos[index],
        case_id: this.caseInfo.case_id,
        imgarr: this.caseImageInfos
      }
      this.caseImageInfos.splice(index, 1)
      data.imgarr = this.caseImageInfos
      let url = '/imgmanage/del?access_token=' + localStorage.getItem('access_token')
      await axios.post(url, qs.stringify(data))
    },
    async adddeleteImage (index) {
      let url = '/imgmanage/del?access_token=' + localStorage.getItem('access_token')
      await axios.post(url, qs.stringify({delimg: this.imagArrs[index]}))
      this.imagArrs.splice(index, 1)
    },
    async onUploadImgFile (file) {
      let param = new FormData()
      param.append('img', file, file.name)
      let response = await axios.post('/imgmanage/add/?access_token=' + localStorage.getItem('access_token'), param, {headers: {'Content-Type': 'multipart/form-data'}})
      this.imagArrs.push(response.data.data.imgpath)
    },
    async onChangeImgList (file) {
      let param = new FormData()
      let url = '/imgmanage/add/?access_token=' + localStorage.getItem('access_token')
      param.append('img', file, file.name)
      url = url + '&case_id=' + this.caseInfo.case_id
      let response = await axios.post(url, param, {headers: {'Content-Type': 'multipart/form-data'}})
      this.caseImageInfos.push(response.data.data.imgpath)
    },
    onKeyup (id) {
      let url = '/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
      clearTimeout(window.t)
      window.t = setTimeout(() => {
        if (this.caseInfo.title !== '') {
          axios.put(url, qs.stringify({
            title: this.caseInfo.title,
            content: this.caseInfo.content,
            dep: this.caseInfo.dep,
            dep_user: this.caseInfo.dep_user,
            info_source: this.caseInfo.info_source,
            scene: this.caseInfo.scene,
            equipment: this.caseInfo.equipment,
            material: this.caseInfo.material,
            capacity: this.caseInfo.capacity,
            feed_size: this.caseInfo.feed_size,
            application: this.caseInfo.application,
            other: this.caseInfo.other,
            output_size: this.caseInfo.output_size,
            production_areas: this.caseInfo.production_areas
          }))
        }
      }, 500)
    },
    change (id) {
      let url = '/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
      clearTimeout(window.t)
      window.t = setTimeout(() => {
        axios.put(url, qs.stringify({
          type_id: this.selected
        }))
      }, 500)
    },
    clickChange (id) {
      let url = '/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
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
      if (this.dep === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入采集部门'
        })
        return false
      }
      if (this.dep_user === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入填写人员'
        })
        return false
      }
      if (this.info_source === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入联系方式'
        })
        return false
      }
      if (this.productionAreas === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入投产地区'
        })
        return false
      }
      if (this.equipment === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入设备配置'
        })
        return false
      }
      if (this.material === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入加工物料'
        })
        return false
      }
      if (this.capacity === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入产量'
        })
        return false
      }
      if (this.feed_size === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入进料粒度'
        })
        return false
      }
      if (this.output_size === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入出料粒度'
        })
        return false
      }
      if (this.application === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入应用领域'
        })
        return false
      }
      if (this.addCaseContent === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入客户评价'
        })
        return false
      }
      if (this.scene === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入工艺流程'
        })
        return false
      }
      let url = '/lcase/?access_token=' + localStorage.getItem('access_token')
      if (this.addCaseTitle !== '') {
        axios.post(url, qs.stringify({
          title: this.addCaseTitle,
          dep: this.dep,
          dep_user: this.dep_user,
          info_source: this.info_source,
          equipment: this.equipment,
          material: this.material,
          capacity: this.capacity,
          feed_size: this.feed_size,
          output_size: this.output_size,
          application: this.application,
          production_areas: this.productionAreas,
          production_date: this.productionDate,
          other: this.other,
          scene: this.scene,
          content: this.addCaseContent,
          type_id: this.addSelected,
          is_international: this.addRadio,
          writer_id: localStorage.getItem('userID'),
          img_path: this.imagArrs
        }))
        .then((response) => {
          if (response.data.error) {
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
      let url = '/lcase/' + id + '?access_token=' + localStorage.getItem('access_token')
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
    float: none
    display: inline-block
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
  width: 65%
  padding: 80px 20px 0 20px
  overflow-y: scroll
  @media(max-width: 1000px)
    width: 90%
  @media(max-width: 759px)
    padding: 15px 20px 0 20px
    width: 100%
  .caseInfoBox
    .top
      .caseTitleInput
        float: left
        @media(max-width: 759px)
          float: none
        .caseTitle
          padding-left: 0
          input
            font-size: 1.5rem 
            font-weight: 700
            color: #333
            height: 50px
      .timeSwitch
        float: right
        @media(max-width: 759px)
          float: none
          margin-bottom: 10px
        margin-top: 15px
    .casePic
      .van-col-6
        @media(max-width: 759px)
          width: 40% !important
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
  margin-top: 20px
  font-size: 14px
  .ina,.van-radio
    float: left
  .van-radio
    margin: 0 20px 0 10px
  .van-col
    margin-bottom: 20px
  .caseCate
    padding-left: 0
.selectCase
  width: 60%
  padding-left: 5px
  height: 30px
  border: 1px solid #ccc
  margin-left: 12px
  color: #333
.fontS
  font-size: 14px
  color: #777
.addCase
  .addCaseInfo
    overflow-y: scroll
    @media(max-width: 1199px)
      width: 100% !important
      height: 90% !important
    @media(max-width: 759px)
      width: 100% !important
      height: 100% !important
      padding-top: 0 !important
  .btnStyle
    margin-bottom: 20px
    margin-top: 20px
    button
      width: 60%
      margin: 0 auto
      display: block
  .addAu
    float: right
    @media(max-width: 759px)
      float: none
    p
      margin-left: 15px
      clear: both
      float: left !important
      margin: 10px 0 !important
      font-size: 15px
.van-uploader
  margin-bottom: 10px
  i
    vertical-align: middle
.iconFont
  font-size: 18px !important
.addpic
  margin-top: 10px
.fontS
  display: none
.upload
  margin-top: 10px
.caseOther
  .van-cell
    padding-left: 0
    padding-right: 0
.other
  @media(max-width: 759px)
    .van-col-12
      width: 100%
    .selectCase
      width: 40%
.caseMainInfo
  .van-col-12
    .van-cell
      padding-left: 0
    @media(max-width: 759px)
      width: 100%
.caseNameSelected
  border: 0
  appearance: none
  -moz-appearance: none
  -webkit-appearance: none
.float-right
  float: right
  font-size: 14px
  color: #333
.noselect
  cursor: pointer
  -webkit-touch-callout: none
  webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
.paddingLeftS
  padding-left: 0
  margin-left: 16px
.infoBtn
  button
    width: 60%
    margin: 20px 0
.cateList
  .van-col-15
    padding-left: 10px
.van-icon-add-o
  font-size: 16px
  vertical-align: middle
  margin-right: 6px
.dataTime
  position: relative
  .van-picker
    position: absolute
    top: 48px
    width: 80%
    left: 0
    z-index: 200
    border: 1px solid #EAEAEA
    border-radius: 5px
    box-shadow: 2px 2px 2px #eee
    cursor: pointer
</style>