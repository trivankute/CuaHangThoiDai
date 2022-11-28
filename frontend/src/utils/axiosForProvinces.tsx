import axios from 'axios'

// @ts-ignore
var dataJson = {"Hồ Chí Minh":{"code":"SG","file_path":"./data/SG.json"},"Hà Nội":{"code":"HN","file_path":"./data/HN.json"},"Đà Nẵng":{"code":"DDN","file_path":"./data/DDN.json"},"Bình Dương":{"code":"BD","file_path":"./data/BD.json"},"Sóc Trăng":{"code":"ST","file_path":"./data/ST.json"},"Kon Tum":{"code":"KT","file_path":"./data/KT.json"},"Quảng Bình":{"code":"QB","file_path":"./data/QB.json"},"Quảng Trị":{"code":"QT","file_path":"./data/QT.json"},"Trà Vinh":{"code":"TV","file_path":"./data/TV.json"},"Hậu Giang":{"code":"HGI","file_path":"./data/HGI.json"},"Sơn La":{"code":"SL","file_path":"./data/SL.json"},"Bạc Liêu":{"code":"BL","file_path":"./data/BL.json"},"Yên Bái":{"code":"YB","file_path":"./data/YB.json"},"Tuyên Quang":{"code":"TQ","file_path":"./data/TQ.json"},"Điện Biên":{"code":"DDB","file_path":"./data/DDB.json"},"Lai Châu":{"code":"LCH","file_path":"./data/LCH.json"},"Lạng Sơn":{"code":"LS","file_path":"./data/LS.json"},"Hà Giang":{"code":"HG","file_path":"./data/HG.json"},"Bắc Kạn":{"code":"BK","file_path":"./data/BK.json"},"Cao Bằng":{"code":"CB","file_path":"./data/CB.json"},"Bắc Giang":{"code":"BG","file_path":"./data/BG.json"},"Hòa Bình":{"code":"HB","file_path":"./data/HB.json"},"An Giang":{"code":"AG","file_path":"./data/AG.json"},"Vĩnh Phúc":{"code":"VP","file_path":"./data/VP.json"},"Tây Ninh":{"code":"TNI","file_path":"./data/TNI.json"},"Thái Nguyên":{"code":"TN","file_path":"./data/TN.json"},"Lào Cai":{"code":"LCA","file_path":"./data/LCA.json"},"Nam Định":{"code":"NDD","file_path":"./data/NDD.json"},"Quảng Ngãi":{"code":"QNG","file_path":"./data/QNG.json"},"Bến Tre":{"code":"BTR","file_path":"./data/BTR.json"},"Đắk Nông":{"code":"DNO","file_path":"./data/DNO.json"},"Cà Mau":{"code":"CM","file_path":"./data/CM.json"},"Vĩnh Long":{"code":"VL","file_path":"./data/VL.json"},"Ninh Bình":{"code":"NB","file_path":"./data/NB.json"},"Phú Thọ":{"code":"PT","file_path":"./data/PT.json"},"Ninh Thuận":{"code":"NT","file_path":"./data/NT.json"},"Phú Yên":{"code":"PY","file_path":"./data/PY.json"},"Hà Nam":{"code":"HNA","file_path":"./data/HNA.json"},"Hà Tĩnh":{"code":"HT","file_path":"./data/HT.json"},"Đồng Tháp":{"code":"DDT","file_path":"./data/DDT.json"},"Đồng Nai":{"code":"DNA","file_path":"./data/DNA.json"},"Khánh Hòa":{"code":"KH","file_path":"./data/KH.json"},"Hải Phòng":{"code":"HP","file_path":"./data/HP.json"},"Long An":{"code":"LA","file_path":"./data/LA.json"},"Quảng Nam":{"code":"QNA","file_path":"./data/QNA.json"},"Bà Rịa Vũng Tàu":{"code":"VT","file_path":"./data/VT.json"},"Đắk Lắk":{"code":"DDL","file_path":"./data/DDL.json"},"Cần Thơ":{"code":"CT","file_path":"./data/CT.json"},"Bình Thuận  ":{"code":"BTH","file_path":"./data/BTH.json"},"Lâm Đồng":{"code":"LDD","file_path":"./data/LDD.json"},"Thừa Thiên Huế":{"code":"TTH","file_path":"./data/TTH.json"},"Kiên Giang":{"code":"KG","file_path":"./data/KG.json"},"Bắc Ninh":{"code":"BN","file_path":"./data/BN.json"},"Quảng Ninh":{"code":"QNI","file_path":"./data/QNI.json"},"Thanh Hóa":{"code":"TH","file_path":"./data/TH.json"},"Nghệ An":{"code":"NA","file_path":"./data/NA.json"},"Hải Dương":{"code":"HD","file_path":"./data/HD.json"},"Gia Lai":{"code":"GL","file_path":"./data/GL.json"},"Bình Phước":{"code":"BP","file_path":"./data/BP.json"},"Hưng Yên":{"code":"HY","file_path":"./data/HY.json"},"Bình Định":{"code":"BDD","file_path":"./data/BDD.json"},"Tiền Giang":{"code":"TG","file_path":"./data/TG.json"},"Thái Bình":{"code":"TB","file_path":"./data/TB.json"}}
// for each data in object dataJson make an array
const initPath = "https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/data/";

export function getProvincesArray() {
    var dataProvincesArray = [];
    // dataJson is object
    for (var key in dataJson) {
        dataProvincesArray.push(key);
    }
    return dataProvincesArray;
}

export async function axiosForProvince(provinceName: any) {
    // get path of provinceName
    // @ts-ignore
    const path = dataJson[provinceName];
    // get url of provinceName
    const url = initPath + path["code"] + ".json";
    // return axios
    return await axios.get(url);
}

export function getDistricts(districtsOfAProvince:any) {
    let result = []
    // data is array
    for (var i = 0; i < districtsOfAProvince.length; i++) {
        result.push(districtsOfAProvince[i]["pre"]+" "+districtsOfAProvince[i]["name"])
    }
    return result;
}

export function getWards(districtsOfAProvince:any, districtName:any) {
    let result = []
    for (var i = 0; i < districtsOfAProvince.length; i++) {
        if((districtsOfAProvince[i]["pre"] + " " + districtsOfAProvince[i]["name"]).includes(districtName))
        {
            const district = districtsOfAProvince[i]
            for(var j = 0; j < district["ward"].length; j++)
            {
                result.push(district["ward"][j]["pre"] + " " + district["ward"][j]["name"])
            }
            break;
        }
    }
    return result;
}