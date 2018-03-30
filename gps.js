var gps = {
    pos: {
        latitude: 39.897445,
        longitude: 116.331398,
    },
    init: function() {
        var _self = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(_self.location, _self.err);
        } else {
            _self.err_msg = "当前浏览器不支持Geolocation";
            alert(_self.err_msg);
        }
    },
    location: function(position) {
        this.pos.latitude = position.coords.latitude;
        this.pos.longitude = position.coords.longitude;
        this.init_map();
    },
    init_map: function() {
        // 百度地图API功能
        var map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(116.331398, 39.897445), 11);
        map.enableScrollWheelZoom(true);

        // 用经纬度设置地图中心点
        map.clearOverlays();
        var new_point = new BMap.Point(this.pos.longitude, this.pos.latitude);
        var marker = new BMap.Marker(new_point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        map.panTo(new_point);
    },
    err_msg: 'success',
    err: function(error) {
        var _self = this;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                _self.err_msg = "用户拒绝请求地理位置"
                break;
            case error.POSITION_UNAVAILABLE:
                _self.err_msg = "位置信息不可用"
                break;
            case error.TIMEOUT:
                _self.err_msg = "用户位置的请求超时"
                break;
            case error.UNKNOWN_ERROR:
                _self.err_msg = "未知的错误发生"
                break;
        }
        alert(_self.err_msg);
    }
}