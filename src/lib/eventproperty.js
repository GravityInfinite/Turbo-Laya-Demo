import turbo from "../index";
import { logger } from "../utils/tools";

export const eventProperty = {
  properties: {},
  getAppInfoSync: function () {
    try {
      if (wx?.getAccountInfoSync) {
        const info = turbo.platform_obj.getAccountInfoSync(),
          accountInfo = info && info.miniProgram ? info.miniProgram : {};
        const temp_appinfo = {
          $app_id: accountInfo.appId,
        };
        for (let item in temp_appinfo) {
          if (temp_appinfo.hasOwnProperty(item)) {
            this.properties[item] = temp_appinfo[item];
          }
        }
        return temp_appinfo;
      }
    } catch (e) {
      logger.info(e);
    }
  },
  // getNetworkType非同步，不返回值
  getNetworkType: function () {
    const _this = this;
    return new Promise(function (resolve, reject) {
      if (wx?.getNetworkType) {
        wx.getNetworkType({
          success: function (res) {
            _this.properties.$network_type = res.networkType;
            resolve(res);
          },
          fail: function (err) {
            reject(err);
          },
        });
      } else {
        resolve({ networkType: undefined });
      }
    });
  },
  getSystemInfoSync: function () {
    try {
      if (wx?.getSystemInfoSync) {
        const info = turbo.platform_obj.getSystemInfoSync();
        const temp_systeminfo = {
          $screen_width: info.screenWidth,
          $screen_height: info.screenHeight,
          $os_version: info.system,
          $os: info.platform,
          $model: info.model,
          $brand: String(info.brand).toLocaleUpperCase(),
          $manufacturer: info.brand,
          $lib_version: "3.3.2",
          $lib: "Laya",
        };
        for (let item in temp_systeminfo) {
          if (temp_systeminfo.hasOwnProperty(item)) {
            this.properties[item] = temp_systeminfo[item];
          }
        }
        return temp_systeminfo;
      }
      return {};
    } catch (error) {
      logger.info(error);
      return {};
    }
  },
  getRegisterProperties: function (obj = {}) {
    for (let item in obj) {
      this.properties[item] = obj[item];
    }
  },
  infoInit: function () {
    turbo?._setHttpRequest();
    this.getAppInfoSync();
    this.getNetworkType();
    this.getSystemInfoSync();
  },
  getProperties: function () {
    return this.properties;
  },
};
