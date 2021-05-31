import REGION_DATA from './dist/pc.json';
console.log('🚀 ~ file: index.js ~ line 2 ~ REGION_DATA', REGION_DATA);
import { cloneDeep } from 'lodash-es';

// code转汉字大对象
const CodeToText = {};
// 汉字转code大对象
const TextToCode = {};
const provinceObject = REGION_DATA['86']; // 省份对象
const regionData = [];
let provinceAndCityData = [];

CodeToText[''] = '全部';

// 计算省
for (const prop in provinceObject) {
  regionData.push({
    value: prop, // 省份code值
    label: provinceObject[prop], // 省份汉字
  });
  CodeToText[prop] = provinceObject[prop];
  TextToCode[provinceObject[prop]] = {
    code: prop,
  };
  TextToCode[provinceObject[prop]]['全部'] = {
    code: '',
  };
}
// 计算市
for (let i = 0, len = regionData.length; i < len; i++) {
  const provinceCode = regionData[i].value;
  const provinceText = regionData[i].label;
  const provinceChildren = [];
  for (const prop in REGION_DATA[provinceCode]) {
    provinceChildren.push({
      value: prop,
      label: REGION_DATA[provinceCode][prop],
    });
    CodeToText[prop] = REGION_DATA[provinceCode][prop];
    TextToCode[provinceText][REGION_DATA[provinceCode][prop]] = {
      code: prop,
    };
    TextToCode[provinceText][REGION_DATA[provinceCode][prop]]['全部'] = {
      code: '',
    };
  }
  if (provinceChildren.length) {
    regionData[i].children = provinceChildren;
  }
}
provinceAndCityData = cloneDeep(regionData);

// 计算区
for (let i = 0, len = regionData.length; i < len; i++) {
  const province = regionData[i].children;
  const provinceText = regionData[i].label;
  if (province) {
    for (let j = 0, len = province.length; j < len; j++) {
      const cityCode = province[j].value;
      const cityText = province[j].label;
      const cityChildren = [];
      for (const prop in REGION_DATA[cityCode]) {
        cityChildren.push({
          value: prop,
          label: REGION_DATA[cityCode][prop],
        });
        CodeToText[prop] = REGION_DATA[cityCode][prop];
        TextToCode[provinceText][cityText][REGION_DATA[cityCode][prop]] = {
          code: prop,
        };
      }
      if (cityChildren.length) {
        province[j].children = cityChildren;
      }
    }
  }
}

// 添加“全部”选项
const provinceAndCityDataPlus = cloneDeep(provinceAndCityData);
provinceAndCityDataPlus.unshift({
  value: '',
  label: '全部',
});
for (let i = 0, len = provinceAndCityDataPlus.length; i < len; i++) {
  const province = provinceAndCityDataPlus[i].children;
  if (province && province.length) {
    province.unshift({
      value: '',
      label: '全部',
    });

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children;
      if (city && city.length) {
        city.unshift({
          value: '',
          label: '全部',
        });
      }
    }
  }
}

const regionDataPlus = cloneDeep(regionData);
regionDataPlus.unshift({
  value: '',
  label: '全部',
});
for (let i = 0, len = regionDataPlus.length; i < len; i++) {
  const province = regionDataPlus[i].children;
  if (province && province.length) {
    province.unshift({
      value: '',
      label: '全部',
    });

    for (let j = 0, len = province.length; j < len; j++) {
      const city = province[j].children;
      if (city && city.length) {
        city.unshift({
          value: '',
          label: '全部',
        });
      }
    }
  }
}
export {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
};
