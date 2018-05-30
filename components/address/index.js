import { getItem } from '../utils/utils';
import address from './data';

const VALUE_TYPE = ['code', 'name'];

Component({
    properties: {
        value: {
            type: Array,
            value: []
        },
        valueType: {
            type: String,
            value: 'code'
        },
        customer: {
            type: Boolean,
            value: false
        },
        url: {
            type: String,
            value: ''
        }
    },
    attached() {
        const { url } = this.data;

        if (url) {
            this._loadData(url);
        } else {
            this._initData(address);
        }
        
    },
    data: {
        addressRange: [],               // picker中显示的三列的数据
        oldAddressRange: [],            // picker中显示的三列的数据
        provinceData: [],               // 省的数组
        cityData: {},                   // 所有市的数据
        districtData: {},               // 所有区域的数据
        selectedIndexArray: [0, 0, 0],  //滑动中被选中的item在数组中的位置
    },
    methods: {
        _loadData(url) {
            let localData = getItem('areaData') || "";
            if (!localData) {
                wx.request({
                    url,
                    method: 'GET',
                    success(res) {
                        this._initData(res.data);
                    },
                    fail(error) {
                        console.log(error)
                    }
                })
            }
        },
        _initData(fetchedAddress) {
            const { value, valueType } = this.data;
            if (VALUE_TYPE.indexOf[valueType] === -1) {
                throw new Error('address组件valueType必须是code和name中的一个');
            }
            const addressData = this._formatAddress(fetchedAddress);
            const { provinceData, cityData, districtData } = addressData;
    
            let provinceIndex = this._findIndex(provinceData, value[0] || '110000', valueType);
            let province_code = provinceData[provinceIndex].national_code;
            let province_name = provinceData[provinceIndex].region_name;
            
            let city = cityData[province_code];
            let cityIndex = this._findIndex(city, value[1] || '110100', valueType);
            let city_code = city[cityIndex].national_code;
            let city_name = city[cityIndex].region_name;
    
            let district = districtData[city_code];
            let districtIndex = this._findIndex(district, value[2] || '110101', valueType);
            let district_code = district[districtIndex].national_code;
            let district_name = district[districtIndex].region_name;
    
            this.setData({
                provinceData,
                cityData,
                districtData,
                addressRange: [provinceData, city, district],
                oldAddressRange: [provinceData, city, district],
            });
            value.length === 3 && this._initItem(
                {
                    province_code, province_name,
                    city_code, city_name,
                    district_code, district_name
                },
                [provinceIndex, cityIndex, districtIndex]
            );
        },
        _formatAddress(address = []) {
            let provinceData = [], cityData = {}, districtData = {};
            for (let i = 0; i < address.length; i++) {
                let obj = {};
                obj = {
                    national_code: address[i].national_code,
                    region_name: address[i].region_name,
                    parent_id: address[i].parent_id
                };
                provinceData.push(obj);
    
                if (address[i].children && address[i].children.length > 0) {
                    cityData[address[i].national_code] = this._getCityData(address[i].children).cityData;
                    districtData = { ...districtData, ...this._getCityData(address[i].children).districtData };
                }
            }
            return { provinceData, cityData, districtData };
        },
        _getCityData(address = []) {
            let cityData = [], districtData = {};
            for (let i = 0; i < address.length; i++) {
                let obj = {};
                obj = {
                    national_code: address[i].national_code,
                    region_name: address[i].region_name,
                    parent_id: address[i].parent_id
                };
                cityData.push(obj);
    
                if (address[i].children && address[i].children.length > 0) {
                    districtData[address[i].national_code] = this._getDistrictData(address[i].children);
                }
            }
            return { cityData, districtData };
        },
        _getDistrictData(address = []) {
            let districtData = [];
            for (let i = 0; i < address.length; i++) {
                let obj = {};
                obj = {
                    national_code: address[i].national_code,
                    region_name: address[i].region_name,
                    parent_id: address[i].parent_id
                };
                districtData.push(obj);
            }
            return districtData;
        },
        _findIndex(array = [], value, type = 'code') {
            if (type == 'code') {
                return array.findIndex((item) => item.national_code === value);
            } else if (type == 'name') {
                return array.findIndex((item) => item.region_name === value);
            }
        },
        _initItem(data, indexArray) {
            console.log(indexArray)
            this.setData({
                selectedIndexArray: [...indexArray],
                value: [...indexArray], // 将外部传入的地址数据（code / name）数组改为index(索引)数组
            })
            this.triggerEvent('ready', {value: { ...data }});
        },
        handleClose() {
            this.triggerEvent('close', {});
        },
        handleChange(event) {
            const { selectedIndexArray, addressRange } = this.data;

            // 点击确定更新显示的值
            this.setData({
                value: selectedIndexArray,
                oldAddressRange: addressRange
            });
            this.handleClose();
            this.triggerEvent('ok', {value: {
                province_code: addressRange[0][selectedIndexArray[0]].national_code,
                province_name: addressRange[0][selectedIndexArray[0]].region_name,
                city_code: addressRange[1][selectedIndexArray[1]].national_code,
                city_name: addressRange[1][selectedIndexArray[1]].region_name,
                district_code: addressRange[2][selectedIndexArray[2]].national_code,
                district_name: addressRange[2][selectedIndexArray[2]].region_name
            }});
        },
        handleCancel(event) {
            const { value, addressRange, oldAddressRange } = this.data;
            console.log(value)
            
            // 点击取消返回原先的状态
            this.setData({
                selectedIndexArray: value,
                addressRange: oldAddressRange
            });
            this.handleClose();
            this.triggerEvent('cancel', {});
        },
        handleColumnChange(event) {
            const { provinceData, cityData, districtData, selected, addressRange, selectedIndexArray } = this.data;
            const { column = 0, value = 0 } = event.detail;
            let selectedValue = [...selectedIndexArray];
            
            switch (column) {
                case 0:
                    let city = cityData[provinceData[value].national_code]; // 市的数组
                    let district_0 = districtData[city[0].national_code]; // 区域的数组 
                    selectedValue[0] = value;
                    selectedValue[1] = 0;
                    selectedValue[2] = 0;
                    this.setData({
                        addressRange: [provinceData, city, district_0],
                        selectedIndexArray: [...selectedValue]
                    });
                    break;
                case 1:
                    let district_1 = districtData[addressRange[1][value].national_code]; // 区域的数组
                    selectedValue[1] = value;
                    selectedValue[2] = 0;
                    this.setData({
                        addressRange: [provinceData, addressRange[1], district_1],
                        selectedIndexArray: [...selectedValue]
                    });
                    break;
                case 2:
                    selectedValue[2] = value;
                    this.setData({
                        selectedIndexArray: [...selectedValue]
                    });
                    break;
            }
        }
    }
})