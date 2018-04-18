<template>
  <div class="addCase clearfix container">
    <h2 class="text-center">{{$route.name}}</h2>
    <div class="addCaseInfo">
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
          <van-row>
              <van-col span="12" class="btnStyle"><van-button type="default" @click="goBack()">取消</van-button></van-col>
              <van-col span="12" class="btnStyle"><van-button type="primary" @click="onClickAlert">确认</van-button></van-col>
          </van-row>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { Dialog } from 'vant'
import qs from 'qs'
import Uploader from '@/components/common/Uploader'
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
      caseCate: '分类ID',
      addRadio: '0',
      dataTimeZ: '',
      selected: '',
      addSelected: '',
      caseDataTime: false,
      zanf: [],
      caseTime: '',
      catePage: '',
      addCaseTitle: '',
      productionAreas: '',
      minDate: new Date(1980, 10, 1),
      maxDate: new Date(),
      dep: '',
      dep_user: '',
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
      imagArrs: [],
      descript: '您选择的分类是：',
      addCaseCates: []
    }
  },
  components: {
    Uploader
  },
  async mounted () {
    this.addCaseTime = upDataToTime(Date.parse(new Date()) / 1000)
    this.productionDate = DataTime(this.currentDate)
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
              this.addCaseCates = this.addCaseCates.concat(response.data.data.cateList)
            })
          }
        }
      })
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    addCase () {
      this.$router.push('/addcase')
    },
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
    async adddeleteImage (index) {
      let url = '/apis/imgmanage/del?access_token=' + localStorage.getItem('access_token')
      await axios.post(url, qs.stringify({delimg: this.imagArrs[index]}))
      this.imagArrs.splice(index, 1)
    },
    async onUploadImgFile (file) {
      let param = new FormData()
      param.append('img', file, file.name)
      let response = await axios.post('/apis/imgmanage/add/?access_token=' + localStorage.getItem('access_token'), param, {headers: {'Content-Type': 'multipart/form-data'}})
      this.imagArrs.push(response.data.data.imgpath)
    },
    onClickAlert () {
      if (this.dep === '') {
        Dialog.alert({
          title: '添加案例失败',
          message: '请输入采集部门'
        })
        return false
      }
      if (this.imagArrs === []) {
        Dialog.alert({
          title: '添加案例失败',
          message: '至少上传一张图片'
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
      let url = '/apis/lcase/?access_token=' + localStorage.getItem('access_token')
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
    }
  }
}
</script>
<style lang="sass" scoped>
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
  padding-top: 20px
  .btnStyle
    margin-bottom: 20px
    margin-top: 20px
    button
      width: 60%
      margin: 0 auto
      display: block
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
.caseTitleInput
  font-weight: 700
  .caseTitle
    padding-left: 0
.text-center
  text-align: center
  color: #333
</style>


