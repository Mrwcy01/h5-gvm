<template>
  <div class="parameter ">
    <Head title="参数列表" />
    <div class="tab">
      <van-tabs
        v-model="active"
        swipeable>
        <van-tab :title="'车辆参数'">
          <div class="car clearfix">
            <div class="Fuel left">
              <Fuel />
            </div>
            <div class="FuelHeat left">
              <FuelHeat />
            </div>
            <div class="WaterHeat left">
              <WaterHeat />
            </div>
            <div class="engine left">
              <Engine />
            </div>
          </div>
          <div class="Voltage">
            <Voltage />
          </div>
        </van-tab>
        <van-tab :title="'工时月报'">
          <div class="MonthlyTime picker">
            <van-row>
              <van-col span="7"><p style="margin-top:5px;">工时统计</p></van-col>
              <van-col span="7">
                <div class="timeSelect left">
                  <van-field
                    readonly
                    clickable
                    label=""
                    label-width="0px"
                    :value="hoursStartDateDisplay"
                    placeholder="请选择开始时间"
                    @click="hoursAddStart = true" />
                </div>
                <van-popup
                  v-model="hoursAddStart"
                  position="bottom"
                  :style="{ height: '20%' }">
                  <van-datetime-picker
                    v-model="hoursStartDate"
                    type="date"
                    @confirm="hoursStartSelectDate"
                    @cancel="hoursAddStart = false" />
                </van-popup>
              </van-col>
              <van-col span="7">
                <div class="timeSelect left">
                  <van-field
                    readonly
                    clickable
                    label=""
                    label-width="0px"
                    :value="hoursEndDateDisplay"
                    placeholder="请选择结束时间"
                    @click="hoursAddEnd = true" />
                </div>
                <van-popup
                  v-model="hoursAddEnd"
                  position="bottom"
                  :style="{ height: '20%' }">
                  <van-datetime-picker
                    v-model="hoursEndDate"
                    type="date"
                    @confirm="hoursEndSelectDate"
                    @cancel="hoursAddEnd = false" />
                </van-popup>
              </van-col>
              <van-col span="3">
                <van-button
                  type="info"
                  @click="getHours">搜索</van-button>
              </van-col>
            </van-row>
          </div>
          <div class="addTime">
            <p class="block">{{ totalHours }}小时</p>
            <p>阶段累计工时时间</p>
          </div>
          <div
            v-for="(item,index) in hoursList"
            :key="index">
            <div class="stageTime">
              <div>
                <p class="left yeu">{{ item.DailyDate }}</p>
                <van-progress
                  class="left"
                  :percentage="item.WorkPercentage" />
                <p class="right">{{ item.WorkHour }}h</p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab :title="'维保记录'">
          <div class="service">
            <div class="condition picker">
              <van-row>
                <van-col span="5">
                  <van-field
                    readonly
                    clickable
                    label=""
                    label-width="0px"
                    :value="value"
                    placeholder="选择项目"
                    @click="showPicker = true" />
                  <van-popup
                    v-model="showPicker"
                    position="bottom">
                    <van-picker
                      show-toolbar
                      :default-index="0"
                      :columns="columns"
                      @cancel="showPicker = false"
                      @confirm="onConfirm" />
                  </van-popup>
                </van-col>
                <van-col span="6">
                  <div class="timeSelect left">
                    <van-field
                      readonly
                      clickable
                      label=""
                      label-width="0px"
                      :value="serviceForm.startTime"
                      placeholder="请选择开始时间"
                      @click="serviceStart = true" />
                  </div>
                  <van-popup
                    v-model="serviceStart"
                    position="bottom"
                    :style="{ height: '20%' }">
                    <van-datetime-picker
                      v-model="serviceStartDate"
                      type="date"
                      @confirm="serviceStartSelectDate"
                      @cancel="serviceStart = false" />
                  </van-popup>
                </van-col>
                <van-col span="2">
                  <p class="left">至</p>
                </van-col>
                <van-col span="6">
                  <div class="timeSelect left">
                    <van-field
                      readonly
                      clickable
                      label=""
                      label-width="0px"
                      :value="serviceForm.endTime"
                      placeholder="请选择结束时间"
                      @click="serviceEnd = true" />
                  </div>
                  <van-popup
                    v-model="serviceEnd"
                    position="bottom"
                    :style="{ height: '20%' }">
                    <van-datetime-picker
                      v-model="serviceEndDate"
                      type="date"
                      @confirm="serviceEndSelectDate"
                      @cancel="serviceEnd = false" />
                  </van-popup>
                </van-col>
                <van-col span="2">
                  <van-icon
                    name="calender-o"
                    size="20" />
                </van-col>
                <van-col span="3">
                  <van-button
                    type="info"
                    @click="getServiceMoreList()">搜索</van-button>
                </van-col>
              </van-row>

            </div>
            <div
              v-if="serviceList.length > 0"
              class="MaintenanceRecordsList">
              <van-list
                v-model="serviceLoading"
                :finished="serviceFinished"
                finished-text="已加载全部"
                @load="getServiceMoreList">
                <div
                  v-for="item in serviceList"
                  :key="item.id"
                  class="MaintenanceRecord">
                  <p>维保类型：{{ item.MaintenanceType }}</p>
                  <p class="clearfix atime">
                    <span class="left">时间：{{ item.CreateTime }}</span>
                    <van-icon
                      class="right"
                      name="edit"
                      size="28"
                      color="#1989fa" />
                  </p>
                  <p>记录内容：{{ item.RecordInfo }}</p>

                </div>
              </van-list>

            </div>
            <p
              v-else
              class="NO">暂无数据</p>
            <div class="add">
              <van-button
                type="default"
                size="large"
                @click="addService()">添加</van-button>
            </div>
          </div>
        </van-tab>
        <van-tab :title="'转场记录'">
          <div class="Conversion condition service">
            <div class="time clearfix picker">
              <van-row>
                <van-col span="8">
                  <div class="timeSelect left">
                    <van-field
                      readonly
                      clickable
                      label=""
                      label-width="0px"
                      :value="Conversionform.startTime"
                      placeholder="请选择开始时间"
                      @click="ConversionStart = true" />
                  </div>
                  <van-popup
                    v-model="ConversionStart"
                    position="bottom"
                    :style="{ height: '20%' }">
                    <van-datetime-picker
                      v-model="ConversionStartDate"
                      type="date"
                      @confirm="ConversionStartSelectDate"
                      @cancel="ConversionStart = false" />
                  </van-popup></van-col>
                <van-col span="3">
                  <p class="left">至</p>
                </van-col>
                <van-col span="8">
                  <div class="timeSelect left">
                    <van-field
                      readonly
                      clickable
                      label=""
                      label-width="0px"
                      :value="Conversionform.endTime"
                      placeholder="请选择结束时间"
                      @click="ConversionEnd = true" />
                  </div>
                  <van-popup
                    v-model="ConversionEnd"
                    position="bottom"
                    :style="{ height: '20%' }">
                    <van-datetime-picker
                      v-model="ConversionEndDate"
                      type="date"
                      @confirm="ConversionEndSelectDate"
                      @cancel="ConversionEnd = false" />
                  </van-popup>
                </van-col>
                <van-col span="2">
                  <van-icon
                    name="calender-o"
                    size="20" />
                </van-col>
                <van-col span="3">
                  <van-button
                    type="info">搜索</van-button>
                </van-col>
              </van-row>
            </div>
            <div
              v-if="ConversionList.length > 0"
              class="MaintenanceRecordsList">
              <van-list
                v-model="ConversionLoading"
                :finished="ConversionFinished"
                finished-text="已加载全部"
                @load="getConversionList">
                <div
                  v-for="item in ConversionList"
                  :key="item.Id"
                  class="MaintenanceRecord">
                  <p>转场日期：{{ item.TransferTime }}</p>
                  <p class="clearfix atime">
                    <span class="left">转入场地：{{ item.Prosition }}</span>
                    <van-icon
                      class="right"
                      name="edit"
                      size="28"
                      color="#1989fa" />
                  </p>
                  <p>详细地址：{{ item.DetailedAddress }}</p>
                </div>
              </van-list>

            </div>
            <p
              v-else
              class="NO">暂无记录</p>
            <div class="add">
              <van-button
                type="default"
                size="large"
                @click="onAddConversion">添加</van-button>
            </div>
          </div>
        </van-tab>
        <van-tab :title="'油耗记录'">
          <div class="condition">
            <div class="time clearfix picker">
              <van-row>
                <van-col span="8">
                  <div class="timeSelect left">
                    <van-field
                      readonly
                      clickable
                      label=""
                      label-width="0px"
                      :value="oilStartDateDisplay"
                      placeholder="请选择开始时间"
                      @click="oilStart = true" />
                  </div>
                  <van-popup
                    v-model="oilStart"
                    position="bottom"
                    :style="{ height: '20%' }">
                    <van-datetime-picker
                      v-model="oilStartDate"
                      type="date"
                      @confirm="oilStartSelectDate"
                      @cancel="oilStart = false" />
                  </van-popup></van-col>
                <van-col span="3">
                  <p class="left">至</p>
                </van-col>
                <van-col span="8">
                  <div class="timeSelect left">
                    <van-field
                      readonly
                      clickable
                      label=""
                      label-width="0px"
                      :value="oilEndDateDisplay"
                      placeholder="请选择结束时间"
                      @click="oilEnd = true" />
                  </div>
                  <van-popup
                    v-model="oilEnd"
                    position="bottom"
                    :style="{ height: '20%' }">
                    <van-datetime-picker
                      v-model="oilEndDate"
                      type="date"
                      @confirm="oilEndSelectDate"
                      @cancel="oilEnd = false" />
                  </van-popup>
                </van-col>
                <van-col span="2">
                  <van-icon
                    name="calender-o"
                    size="20" />
                </van-col>
                <van-col span="3">
                  <van-button
                    type="info"
                    @click="getOilMoreList(true)">搜索</van-button>
                </van-col>
              </van-row>
            </div>
          </div>
          <div
            v-if="oilList.length > 0"
            class="recording">
            <van-list
              v-model="fansLoading"
              :finished="fansFinished"
              finished-text="已加载全部"
              @load="getOilMoreList">
              <div
                v-for="item in oilList"
                :key="item.Id"
                class="oil">
                <van-row>
                  <van-col span="5">开始时间:</van-col>
                  <van-col span="7">2012-12-25</van-col>
                </van-row>
                <van-row>
                  <van-col span="5">结束时间:</van-col>
                  <van-col span="7">2012-12-25</van-col>
                </van-row>
                <van-row>
                  <van-col span="5">加&nbsp; 油 &nbsp;量:</van-col>
                  <van-col span="7">{{ item.FuelVolume }}L</van-col>
                  <van-col span="5">阶段工时:</van-col>
                  <van-col span="7">{{ item.StageWorkingHours }}h</van-col>
                </van-row>
                <van-row>
                  <van-col span="5">阶段耗油:</van-col>
                  <van-col span="7">{{ item.StageAverageFuelConsumption * item.StageWorkingHours }}L</van-col>
                  <van-col span="5">累计耗油:</van-col>
                  <van-col span="7">{{ item.CumulativeAverageFuelConsumption * item.TotalWorkingHours }}L</van-col>
                </van-row>
              </div>
            </van-list>

          </div>
          <p
            v-else
            class="NO">暂无记录</p>
        </van-tab>
        <van-tab :title="'报警通知'">
          <div class="alarm">
            <van-row>
              <van-col span="8">报警通知</van-col>
              <van-col span="13">{{ caveatList.MsgArriveTime }}</van-col>
              <van-col span="3">
                <van-switch
                  v-model="IsOff"
                  size="24px"
                  active-color="#07c160"
                  inactive-color="#ccc" /></van-col>
            </van-row>
          </div>
          <div class="table">
            <ul class="clearfix">
              <li>报警项目 </li>
              <li>报警项目 </li>
              <li>开盒</li>
              <li>报警项目 </li>
              <li>结束断开</li>
              <li>报警项目 </li>
              <li>GPS天线</li>
              <li>报警项目 </li>
              <li>电瓶电压</li>
              <li>报警项目 </li>
              <li>电瓶断开</li>
              <li>报警项目 </li>
              <li>后备电池</li>
              <li>报警项目 </li>
            </ul>
            <div class="phone">
              <van-field
                v-model="caveatList.Phone1"
                type="digit"
                label="手机号1"
                placeholder="请输入手机号" />
              <van-field
                v-model="caveatList.Phone2"
                type="digit"
                label="手机号2"
                placeholder="请输入手机号" />
              <van-button
                type="info"
                size="large"
                @click="upCaveatPhone">设置手机号</van-button>
            </div>
          </div>
        </van-tab>
        <van-tab :title="'GPS参数'">
          <div class="GPSMsg">
            <van-row>
              <van-col span="14">GPS信息</van-col>
              <van-col span="10">{{ GPSList.MsgArriveTime }}</van-col>
            </van-row>
          </div>
          <div class="table">
            <ul class="clearfix">
              <li>信息状态</li>
              <li>{{ GPSList.GeneratorStatus }} </li>
              <li>电瓶电压</li>
              <li>{{ GPSList.BatteryVoltage }} </li>
              <li>后备电池电压</li>
              <li>{{ GPSList.BackupBatteryVoltage }} </li>
              <li>通信方式</li>
              <li>{{ GPSList.CommunicationMode }} </li>
              <li>GSM信号强度</li>
              <li>{{ GPSList.GSMSignalIntensity }} </li>
              <li>经度</li>
              <li>{{ GPSList.Longitude }} </li>
              <li>方向</li>
              <li>{{ GPSList.Direction }} </li>
              <li>速度</li>
              <li>{{ GPSList.Speed }} </li>
              <li>海拔</li>
              <li>{{ GPSList.Altitude }} </li>
              <li>可视星数</li>
              <li>{{ GPSList.VisibleStarNumber }} </li>
              <li>GPS是否最新</li>
              <li>{{ GPSList.IsGPSUpToDate }} </li>
              <li>服务开始时间</li>
              <li>{{ GPSList.ServiceStart }} </li>
              <li>服务结束时间</li>
              <li>{{ GPSList.ServiceEnd }} </li>

            </ul>
          </div>
        </van-tab>
        <van-tab :title="'位置信息'">
          <p class="clearfix">
            <span class="left">&nbsp;&nbsp;位置信息</span>
            <van-notice-bar
              color="#000"
              background="#fff"
              left-icon="location-o">
              {{ PositionMsg.Position }}
            </van-notice-bar>
          </p>
        </van-tab>
        <van-tab :title="'轨迹回放'">
          轨迹回放
        </van-tab>
        <van-tab :title="'电子围栏'" />
      </van-tabs>
    </div>
    <!-- 位置信息 -->
    <div
      v-show="active === 7"
      id="positionMap" />
    <!-- 电子围栏 -->
    <div
      v-show="active === 9"
      id="FenceMap" />
  </div>
</template>

<script>
import { GetWorkHmr,
  GetGcmCarAlarmInfo,
  SetGcmAlarm,
  GetGcmGpsParameter,
  GetGcmCarPosition,
  GetGcmEFInfo,
  GetFuelConsumptionRecord,
  GetMaintenanceList,
  GetTransferRecordList } from '@/api/car.js'
import { mapState } from 'vuex'
import Fuel from './components/Fuel'
import FuelHeat from './components/FuelHeat'
import WaterHeat from './components/WaterHeat'
import Engine from './components/engine'
import Voltage from './components/Voltage'
import Head from '@/components/Head'
export default {
  name: 'Parameter',
  components: {
    Head, Fuel, FuelHeat, WaterHeat, Engine, Voltage
  },
  data() {
    return {
      // 工时统计
      hoursAddStart: false,
      hoursAddEnd: false,
      hoursAddDate: '',
      hoursStartDateDisplay: '',
      hoursEndDateDisplay: '',
      hoursStartDate: '',
      hoursEndDate: '',
      totalHours: '',
      hoursList: [],
      // 维保记录
      serviceFinished: false,
      serviceLoading: false,
      value: '施工',
      serviceList: [],
      columns: ['施工', '保养', '加油', '维修', '保险'],
      serviceForm: {
        terminalId: this.$route.query.TerminalId, // 设备编号
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        type: 1, // 维保类型，1：施工，2保养，3加油，4维修，5保险
        pageIndex: 0, // 页码
        pageSize: 10 // 每页的数量
      },
      serviceStart: false,
      serviceEnd: false,
      serviceStartDate: '',
      serviceEndDate: '',
      // 转场记录
      ConversionList: [],
      ConversionStart: false,
      ConversionEnd: false,
      ConversionStartDate: '',
      ConversionEndDate: '',
      Conversionform: {
        terminalId: this.$route.query.TerminalId,
        startTime: '',
        endTime: '',
        pageIndex: 0,
        pageSize: 10
      },
      ConversionLoading: false,
      ConversionFinished: false,
      // 油耗
      fansLoading: false,
      fansFinished: false,
      oilStart: false,
      oilEnd: false,
      oilStartDateDisplay: '',
      oilEndDateDisplay: '',
      oilStartDate: '',
      oilEndDate: '',
      oilList: [],
      oilForm: {
        terminalId: '',
        startTime: '',
        endTime: '',
        pageIndex: 0,
        pageSize: 10
      },
      // 报警通知
      IsOff: false,
      caveatList: {},
      caveatForm: {
        TerminalId: '', // 设备号
        Account: '', // 当前操作账号
        Phone1: '', // 手机号1
        IsOff: 0, // 是否开启
        Phone2: '' // 手机号2
      },
      // GPS参数
      GPSList: {},
      // 位置信息
      PositionMsg: {},
      Fence: [{}], // 电子围栏
      showPicker: false,
      checked: true,
      active: 3,
      echarts: null,
      date: false,
      visitCurrentDate: '',
      minDate: '',
      maxDate: '',
      hours: {}
    }
  },
  computed: {
    ...mapState('login', [
      'userAccount'
    ])
  },
  created() {
    this.caveatForm.Account = this.userAccount
    this.caveatForm.TerminalId = this.$route.query.TerminalId
    this.getNowFormatDate()
    this.getHours()
    this.getCaveat()
    this.getGpsList()
  },
  mounted() {
    this.getPosition()
    this.getFence()
    this.getFenceMap()
  },
  methods: {
    /**
     * 油耗记录
     */
    // 选择开始时间
    oilStartSelectDate(date) {
      this.oilStartDate = ''
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.oilStartDateDisplay = date.getFullYear() + '-' + month + '-' + currentDate
      this.oilStartDate = date
      this.oilStart = false
    },
    // 选择结束时间
    oilEndSelectDate(date) {
      this.oilEndDate = ''
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.oilEndDateDisplay = date.getFullYear() + '-' + month + '-' + currentDate
      this.oilEndDate = date
      this.oilEnd = false
    },
    getOilMoreList(type) {
      if (type) {
        this.oilList = []
      }
      this.oilForm = {
        terminalId: this.$route.query.TerminalId,
        startTime: this.oilStartDateDisplay,
        endTime: this.oilEndDateDisplay,
        pageIndex: 1,
        pageSize: 10
      }
      this.fansLoading = true
      GetFuelConsumptionRecord(this.oilForm)
        .then(res => {
          if (res.status == 1) {
            this.oilForm.pageIndex === 1 ? this.oilList = res.data : this.oilList = this.oilList.concat(res.data)
            // 判读是否加载到最后一页
            res.data.length < 10 ? this.fansFinished = true : this.oilForm.pageIndex++
            // 请求完毕后隐藏正在 加载样式
            this.fansLoading = false
          } else {
            this.fansLoading = false
          }
        })
    },
    /*
    *工时统计
    **/
    // 选择开始时间
    hoursStartSelectDate(date) {
      this.hoursStartDate = ''
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.hoursStartDateDisplay = date.getFullYear() + '-' + month + '-' + currentDate
      this.hoursStartDate = date
      this.hoursAddStart = false
    },
    // 选择结束时间
    hoursEndSelectDate(date) {
      this.hoursEndDate = ''
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.hoursEndDateDisplay = date.getFullYear() + '-' + month + '-' + currentDate
      this.hoursEndDate = date
      this.hoursAddEnd = false
    },
    // 获取工时数据
    getHours() {
      GetWorkHmr({ StartDate: this.hoursStartDateDisplay,
        EndDate: this.hoursEndDateDisplay,
        TerminalId: this.$route.query.TerminalId })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.totalHours = res.Data.TotalWorkHmr
            var work = res.Data.WorkHmrs
            work.forEach(item => {
              item.WorkPercentage = parseInt(item.WorkPercentage.split('%')[0])
            })
            this.hoursList = work
          } else {
            this.$toast.fail(res.Msg.Msg)
          }
        })
    },
    /**
     * 维保记录
     */
    // 选择开始时间
    serviceStartSelectDate(date) {
      this.hoursStartDate = ''
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.serviceForm.startTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.serviceStartDate = date
      this.serviceStart = false
    },
    // 选择结束时间
    serviceEndSelectDate(date) {
      this.hoursEndDate = ''
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.serviceForm.endTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.serviceStartDate = date
      this.serviceEnd = false
    },
    // 选择项目
    onConfirm(value, index) {
      this.value = value
      this.type = index + 1
      this.showPicker = false
    },
    getServiceMoreList(type) {
      if (type) {
        this.serviceList = []
      }
      this.serviceLoading = true
      GetMaintenanceList(this.serviceForm)
        .then(res => {
          if (res.status == 1) {
            this.serviceForm.pageIndex === 1 ? this.serviceList = res.data : this.serviceList = this.serviceList.concat(res.data)
            // 判读是否加载到最后一页
            res.data.length < 10 ? this.serviceFinished = true : this.serviceForm.pageIndex++
            // 请求完毕后隐藏正在 加载样式
            this.serviceLoading = false
          } else {
            this.serviceLoading = false
          }
        })
    },
    /**
     * 转场记录
     */
    onAddConversion() {
      this.$router.push({
        path: '/addConversion',
        query: {
          TerminalId: this.$route.query.TerminalId
        }
      })
    },
    ConversionStartSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.Conversionform.startTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.ConversionStartDate = date
      this.ConversionStart = false
    },
    ConversionEndSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.Conversionform.endTime = date.getFullYear() + '-' + month + '-' + currentDate
      this.ConversionEndDate = date
      this.ConversionEnd = false
    },
    getConversionList(type) {
      if (type) {
        this.ConversionList = []
      }
      this.ConversionLoading = true
      GetTransferRecordList(this.Conversionform)
        .then(res => {
          if (res.status == 1) {
            this.Conversionform.pageIndex === 1 ? this.ConversionList = res.data : this.ConversionList = this.ConversionList.concat(res.data)
            // 判读是否加载到最后一页
            res.data.length < 10 ? this.ConversionFinished = true : this.Conversionform.pageIndex++
            // 请求完毕后隐藏正在 加载样式
            this.ConversionLoading = false
          } else {
            this.ConversionLoading = false
          }
        })
    },
    /**
     * 报警通知
     */
    // 列表
    getCaveat() {
      GetGcmCarAlarmInfo({ TerminalId: this.$route.query.TerminalId })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.caveatList = res.Data
            if (this.caveatList.IsOff == 1) {
              this.IsOff = true
            } else {
              this.IsOff = false
            }
          }
        })
    },
    // 报警设置手机号
    upCaveatPhone() {
      if (!this.caveatList.Phone1 && !this.caveatList.Phone2) {
        this.$toast.fail('请输入手机号')
        return false
      }
      this.caveatForm.Phone1 = this.caveatList.Phone1
      this.caveatForm.Phone2 = this.caveatList.Phone2
      if (this.IsOff) {
        this.caveatForm.IsOff = 1
      } else {
        this.caveatForm.IsOff = 0
      }
      SetGcmAlarm(this.caveatForm)
        .then(res => {
          if (res.Msg.Code == 1) {
            this.$toast.success('设置成功')
          }
        })
    },
    /**
     * GPS参数
     */
    getGpsList() {
      GetGcmGpsParameter({ TerminalId: this.$route.query.TerminalId })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.GPSList = res.Data
          }
        })
    },
    /**
     * 位置信息
     */
    getPosition() {
      GetGcmCarPosition({ TerminalId: this.$route.query.TerminalId })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.PositionMsg = res.Data
            this.getPositionMap()
          }
        })
    },
    // 电子围栏
    getFence() {
      GetGcmEFInfo({ TerminalId: this.$route.query.TerminalId })
        .then(res => {
          if (res.Msg.Code == 1) {
            this.Fence = res.Data.rectangleEFs
            this.getFenceMap()
          }
        })
    },
    addService() {
      this.$router.push({
        path: '/MaintenanceRecord',
        query: {
          TerminalId: this.$route.query.TerminalId
        }
      })
    },
    getNowFormatDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.maxDate = new Date(parseInt(year), parseInt(month - 1), parseInt(strDate))
      this.minDate = new Date(parseInt(year), parseInt(month), parseInt(strDate - 89))
      // 工时统计
      this.hoursEndDateDisplay = `${year}-${month}-${strDate}`
      this.hoursStartDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate - 7)))
      var yearHours = this.hoursStartDate.getFullYear()
      var monthHours = this.hoursStartDate.getMonth() + 1
      var strDateHours = this.hoursStartDate.getDate()
      this.hoursStartDateDisplay = `${yearHours}-${monthHours}-${strDateHours}`
      this.hoursEndDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate)))
      // 油耗
      this.oilEndDateDisplay = `${year}-${month}-${strDate}`
      this.oilStartDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate - 7)))
      var yearOil = this.oilStartDate.getFullYear()
      var monthOil = this.oilStartDate.getMonth() + 1
      var strDateOil = this.oilStartDate.getDate()
      this.oilStartDateDisplay = `${yearOil}-${monthOil}-${strDateOil}`
      this.oilEndDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate)))
      // 维保
      this.serviceForm.startTime = this.oilStartDateDisplay
      this.serviceForm.endTime = this.oilEndDateDisplay
      this.serviceStartDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate - 7)))
      this.serviceEndDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate - 7)))
      // 转场
      this.Conversionform.startTime = this.oilStartDateDisplay
      this.Conversionform.endTime = this.oilEndDateDisplay
      this.ConversionStartDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate - 7)))
      this.ConversionEndDate = new Date(Date.UTC(parseInt(year), parseInt(month - 1), parseInt(strDate - 7)))
    },
    showDate() {
      this.date = !this.date
    },
    visitSelectDate(date) {
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      this.hours.BeginDate = date.getFullYear() + '-' + month + '-' + currentDate
      this.date = false
    },
    // 位置信息
    getPositionMap() {
      var map = new BMap.Map('positionMap')
      var point = new BMap.Point(this.PositionMsg.Longitude, this.PositionMsg.Latitude)
      map.centerAndZoom(point, 15)
      var marker = new BMap.Marker(point) // 创建标注
      map.addOverlay(marker)
    },
    // 电子围栏
    getFenceMap() {
      var map = new BMap.Map('FenceMap')
      var point = new BMap.Point(this.Fence[0].MinLon, this.Fence[0].MinLat)
      map.centerAndZoom(point, 15)
      var pStart = new BMap.Point(this.Fence[0].MinLon, this.Fence[0].MinLat)
      var pEnd = new BMap.Point(this.Fence[0].MaxLon, this.Fence[0].MaxLat)
      var polygon = new BMap.Polygon([
        new BMap.Point(pStart.lng, pStart.lat),
        new BMap.Point(pEnd.lng, pStart.lat),
        new BMap.Point(pEnd.lng, pEnd.lat),
        new BMap.Point(pStart.lng, pEnd.lat)
      ], { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.5 }) // 创建多边形
      map.addOverlay(polygon) // 增加多边形
    }
  }
}
</script>

<style lang='scss'>
.NO{
  width: 100%;
  text-align: center;
  color: #ccc;
  margin-top: 50%;
}
.parameter{
  .tab{
    .wave-echart{
      width: 120px;
      height: 120px;
      border: 1px solid #ccc;
    }
    // 工时月报
    .MonthlyTime{
      width: 100%;
      padding: 20px 40px;
      border-bottom: 1px solid #ccc;
    }
    .addTime{
      width: 100%;
      text-align: center;
      margin-top: 30px;
      padding: 40px 0;
      border-bottom: 1px solid #ccc;
      p{
        line-height: 40px;
      }
    }
    .stageTime{
      margin-top: 40px;
      padding: 20px 40px;
      p{
        margin-top: -15px;
      }
      .yeu{
        margin-right: 20px;
      }
      .van-progress{
        width: 60% !important;
      }
    }
    // 维保记录
    .service{
      .condition{
        .van-col--2{
          margin-top: 10px;
        }
      }
      .MaintenanceRecordsList{
        width: 100%;
        padding: 15px 30px;
        .MaintenanceRecord{
          padding: 10px;
          border: 1px solid #ccc;
          .atime{
            height: 40px;
            margin-top: 10px;
          }
        }
      }
      .add{
        width: 100%;
        position: fixed;
        bottom: 0;
      }
    }
    // 转场记录
    .Conversion{

    }
    // 油耗
    .condition{
      .time{
        height: 70px;
        padding: 10px 40px;
        margin-top: 10px;
        border: 1px solid #ccc;
        p{
          line-height: 50px;
        }
      }
    }
    .recording{
      width: 100%;
      padding: 10px 20px;
      .oil{
        padding: 10px;
        border: 1px solid #ccc;
        .van-col{
          padding: 5px 0;
        }
      }
    }
    // 报警通知
    .alarm{
      padding: 20px 40px;
    }
    .table{
      width: 100%;
      ul{
        width: 100%;
        li{
          width: 50%;
          height: 60px;
          line-height: 60px;
          text-align: center;
          border:1px solid #ccc;
          float: left;
        }
      }
    }
    .phone{
      width: 100%;
      padding: 20px 40px;
      .van-cell{
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
      }
      .van-button--large{
        height: 70px;
        font-size: 28px;
        margin-top: 30px;
      }
    }
    // GPS
    .GPSMsg{
      padding: 20px 40px;
    }
    .van-tabs__wrap{
      height: 70px;
      padding-top: 15px;
      .van-ellipsis{
        font-size: 26px;
      }
    }
    .van-tabs__content{
      .block{
        font-weight: 600;
      }
      .van-tab__pane{
        margin-top: 40px;
        font-size: 28px;
      }
    }
  }
  .picker{
    .van-ellipsis{
      line-height: 100px;
      font-size: 30px;
    }
    .van-picker__confirm{
      font-size: 30px;
    }
    .van-picker__cancel{
      font-size: 30px;
    }
    .van-popup {
      height: 30% !important;
    }
    .van-hairline--top-bottom{
      padding-top: 20px;
      padding-bottom: 40px !important;
    }
    .van-ellipsis{
      line-height: 100px;
      font-size: 30px;
    }
  }
   #positionMap {
    width: 100%;
    height:86vh;
    margin-top: 20px;
  }
  #FenceMap{
    width: 100%;
    height:86vh;
  }
  .van-notice-bar{
    .van-icon-location-o{
      font-size: 31px;
    }
    .van-notice-bar__wrap{
      font-size: 26px;
    }
  }
}
</style>
