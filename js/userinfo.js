// var calendar = new LCalendar();
// calendar.init({
//     'trigger': '#start_date', //标签id
//     'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
//     'minDate': (new Date().getFullYear()) + '-' + 1 + '-' + 1, //最小日期
//     // 'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
// });
// var calendar = new LCalendar();
// calendar.init({
//     'trigger': '#end_date', //标签id
//     'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
//     'minDate': (new Date().getFullYear()-3) + '-' + 1 + '-' + 1, //最小日期
//     'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
// });
var provinces = new Array("京","沪","浙","苏","粤","鲁","晋","冀",
    "豫","川","渝","辽","吉","黑","皖","鄂",
    "津","贵","云","桂","琼","青","新","藏",
    "蒙","宁","甘","陕","闽","赣","湘");

var keyNums = new Array("0","1","2","3","4","5","6","7","8","9",
    "Q","W","E","R","T","Y","U","I","O","P",
    "A","S","D","F","G","H","J","K","L",
    "OK","Z","X","C","V","B","N","M","Del");
var next=0;
function showProvince(){
    $("#pro").html("");
    var ss="";
    for(var i=0;i<provinces.length;i++){
        ss=ss+addKeyProvince(i)
    }
    $("#pro").html("<ul class='clearfix ul_pro'>"+ss+"<li class='li_close' onclick='closePro();'><span>关闭</span></li><li class='li_clean' onclick='cleanPro();'><span>清空</span></li></ul>");
}
function showKeybord(){
    $("#pro").html("");
    var sss="";
    for(var i=0;i<keyNums.length;i++){
        sss=sss+'<li class="ikey ikey'+i+' '+(i>9?"li_zm":"li_num")+' '+(i>28?"li_w":"")+'" ><span onclick="choosekey(this,'+i+');">'+keyNums[i]+'</span></li>'
    }
    $("#pro").html("<ul class='clearfix ul_keybord'>"+sss+"</ul>");
}
function addKeyProvince(provinceIds){
    var addHtml = '<li>';
    addHtml += '<span onclick="chooseProvince(this);">'+provinces[provinceIds]+'</span>';
    addHtml += '</li>';
    return addHtml;
}

function chooseProvince(obj){
    $(".input_pro span").text($(obj).text());
    $(".input_pro").addClass("hasPro");
    $(".input_pp").find("span").text("");
    $(".ppHas").removeClass("ppHas");
    next=0;
    showKeybord();
}


function choosekey(obj,jj){
    if(jj==29){
        alert("车牌："+$(".car_input").attr("data-pai"));
        layer.closeAll();
    }else if(jj==37){
        if($(".ppHas").length==0){
            $(".hasPro").find("span").text("");
            $(".hasPro").removeClass("hasPro");
            showProvince();
            next=0;
        }
        $(".ppHas:last").find("span").text("");
        $(".ppHas:last").removeClass("ppHas");
        next=next-1;
        if(next<1){
            next=0;
        }
        console.log(next);
    }else{
        if(next>5){
            return
        }
        console.log(next);
        for(var i = 0; i<$(".input_pp").length;i++){
            if(next==0 & jj<10 & $(".input_pp:eq("+next+")").hasClass("input_zim")){
                layer.open({
                    content: '车牌第二位为字母',
                    skin: 'msg',
                    time: 1
                });
                return
            }
            $(".input_pp:eq("+next+")").find("span").text($(obj).text());
            $(".input_pp:eq("+next+")").addClass("ppHas");
            next=next+1;
            if(next>5){
                next=6;
            }
            getpai();
            return
        }

    }

}
function closePro(){
    layer.closeAll()
}
function cleanPro(){
    $(".ul_input").find("span").text("");
    $(".hasPro").removeClass("hasPro");
    $(".ppHas").removeClass("ppHas");
    next=0;
}
function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
function getpai(){
    var pai=trimStr($(".car_input").text());
    $(".car_input").attr("data-pai",pai);
}
window.onload = function() {

    $(".input_pro").click(function(){
        layer.open({
            type: 1
            ,content: '<div id="pro"></div>'
            ,anim: 'up'
            ,shade :false
            ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
        });
        showProvince()
    })
    $(".input_pp").click(function(){
        if($(".input_pro").hasClass("hasPro")){ // 如果已选择省份
            layer.open({
                type: 1
                ,content: '<div id="pro"></div>'
                ,anim: 'up'
                ,shade :false
                ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: auto; padding:0; border:none;'
            });
            showKeybord()
        }else{
            $(".input_pro").click()
        }
    })


}
$(function() {


});
var phone = '',
    userinfo = {
        phoneNum:'',
        name: '',       // 姓名
        cardNum: '',    // 身份证号
        licenseNum: '', // 车牌号
        engineNum : '',
        photoData: '',
        companyCode:'',
        photoList:[]
    },
    isShowthree = false,
    companyList = [],
    deptList = [],
    acceptNameList = [],
    isSelect = true,
    provinceData = ['京','津','沪','渝','冀','晋','辽','吉','黑','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','琼','川','贵','云','陕','甘','青','藏','桂','蒙','宁','新','使','WJ'],
    numData = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','R','U','V','W','X','Y','Z','学','警','领','港','澳','试','挂','临']
carId = '',
    carData = [],
    entourageList = [],
    headerImage = '',
    chapterUrl =  '';
$(function(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android??
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios??
    if(isAndroid){
        $("#fileandroid").css({"display":"block"})
    }
    if(isiOS){
        $("#fileios").css({"display":"block"})
    }
    if(localStorage.getItem('phone')){
        phone = localStorage.getItem('phone');
        // $("#idPhone").val(phone)
    }
    // $("#idPhone").val(phone)
    getCompany();
    $("#company").on("change",function(){
        userinfo.company = $(this).find('option:selected').val();
        if(userinfo.company){
            for(var item of companyList){
                if(item.code === userinfo.company){
                    deptList = item.deptList;
                    var str='';
                    for(let item of deptList){
                        str+='<option value='+item.code+'>'+item.name+'</option>'
                    }
                    $("#department").append(str)
                }
            }
        }else{
            deptList = [];
            var str='<option value="">请选择受访部门</option>';
            $("#department").html(str)
            userinfo.department = '';
        }
    })
    document.addEventListener('message', function(msg) {//获取客户端人脸识别数据
        var data = JSON.parse(msg.data);
        if(data){
            if(data.hasOwnProperty('imageData')){
                chapterUrl = data.imageData;
                localStorage.setItem("url",chapterUrl)
                if(chapterUrl){
                    $(".zhegaiceng").css({'display': 'block'})
                    sureJump()
                }
            }
        }else{
            Toast("检测失败，请重新检测")
        }
    });
    $("#shoufangperson").bind("input", function () {
        var val = $(this).val();
        if(val){
            getNameList(val)
        }
    })
    $("#idCard").on('change',function(){
        var reg= /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
        console.log($("#idCard").val())
        if(!(reg.test($("#idCard").val()))){
            tanwin('请输入正确身份证号')
        }
    })
    $("#input1").attr("checked","checked");//默认第一个选中
    $('input:radio[name="radio1"]').change(function () {
        if($("#input1").is(":checked")){
            isSelect = true;
            $("#carSpan").css({"display":"block"})
        }
        if($("#input2").is(":checked")){
            isSelect = false;
            $("#carSpan").css({"display":"none"})
        }
    })

    function tab(pa) {
        $(pa + ".title li").click(function() {
            //找到是点击第几个
            var ind = $(pa + "#title li").index($(this));
            //alert(ind);
            //以前显示的隐藏
            $(pa + ".wrap div:visible").hide();
            //第几个显示
            $(pa + ".wrap div:eq(" + ind + ")").show();
            //有高亮ho 去掉高亮ho
            $(pa + ".title li.ho").removeClass("ho");
            //被点击的元素添加ho
            $(this).addClass("ho");

        }) //clicked
    } //tab ed
    tab(".carcodeBox ");
    var strProvince = '';
    for(let item of provinceData){
        strProvince+=' <a class="province"  ontouchend="selectItem(this)">'+item+'</a>'
    }
    $(".provinceBox").append(strProvince);
    var strNumber = '';
    for(let item of numData){
        strNumber+=' <a class="province"  ontouchend="selectItem(this)">'+item+'</a>'
    }
    $(".numberBox").append(strNumber);
    $(".sureCar").on("touchend",function(){
        $('#carCode').css({'display':'none'})
    })
    $(".addCarInfo").on("touchend",function(){
        if(carData.length != 0){
            $(".carTable").css({'display':"block"})
        }
        if(carData.length ==5){
            tanwin(" 车辆最多可添加5辆");
            return;
        }
        var carNUm = $(".showCarText").text();
        if(carNUm){
            if (carNUm.length == 7 || carNUm.length == 8){
                carData.push(carNUm);
                carId = '';
                $(".showCarText").text('请输入车牌号');
                var str = '<tr><td>'+carNUm+'</td><td data-id="'+carNUm+'" ontouchend="deleteItem(this)">删除</td></tr>'
                $(".carTableBox").append($(str))
            }else{
                tanwin(" 请输入正确车牌号");
            }
        }else{
            tanwin(" 请输入车牌号");
        }
    })
})
function getFile(idname,type) {
    // let files = $(event).target.files || $(event).dataTransfer.files;
    var files = $('#'+idname).get(0).files;
    if (!files.length) {
        return;
    }
    var picavalue = files[0];

    if (picavalue.size / 1024 > 10000) {//大于10M
        tanwin("图片过大不支持上传");
    } else {
        imgPreview(picavalue, '',type);
    }
}
function imgPreview(file, callback,type) {

    //判断支不支持FileReader
    if (!file || !window.FileReader) return;

    let reader = new FileReader();
    // 将图片将转成 base64 格式
    reader.readAsDataURL(file);
    // if((file.size/1024>1*1024) && type=='isiOS'){
    //     Orientation = 6;
    // }
    // this.imgType = file.type.substr((file.type.indexOf("/"))+1)
    var imgType = file.name;
    reader.onloadend = function () {
        let result = reader.result;
        let img = new Image();
        img.src = result;            //判断图片是否大于100K,是就直接上传，反之压缩图片
        if (reader.result.length <= (50 * 1024)) {
            headerImage = result;
            postImg()
        } else {
            img.onload = function () {
                var orient = getPhotoOrientation(img);
                let data = compress(img,orient);
                headerImage = data;
                if(data){
                    postImg();
                }
            }
        }
    }
}
function postImg(){
    $(".showIcon").css({"display":"none"});
    $(".showImg").css({"display":"block"});
    $(".showImg").attr("src",headerImage)
    if(headerImage.length != 0){
        var index = headerImage.indexOf(',');
        headerImage = headerImage.substring(index+1)
    }
    // 发送请求;

    console.log(headerImage)
}
function getPhotoOrientation(file){
    var orient;
    EXIF.getData(file, function() {
        EXIF.getAllTags(this);
        orient = EXIF.getTag(this, 'Orientation');
    });
    return orient
}
function compress(img,orient){
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let initSize = img.src.length;
    var originWidth = img.width;
    var originHeight = img.height;
    var maxWidth = 800,
        maxHeight = 800;
    var targetWidth = originWidth,
        targetHeight = originHeight;
//                let width = img.width;
//                let height = img.height;
    // 图片尺寸超过400x400的限制
    if(originWidth > maxWidth || originHeight > maxHeight) {
        if(originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
    }
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    var canvas_w = Number(ctx.canvas.width);
    var canvas_h = Number(ctx.canvas.height);
    // 铺底色
    // 清除画布
    ctx.clearRect(0, 0, targetWidth, targetHeight);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (orient == 6) {
        ctx.save(); //保存状态
        ctx.translate(canvas_w / 2, canvas_h / 2); //设置画布上的(0,0)位置，也就是旋转的中心点
        ctx.rotate(90 * Math.PI / 180); //把画布旋转90度
        // 执行Canvas的drawImage语句
        ctx.drawImage(img, Number(0) - canvas_h / 2, Number(0) - canvas_w / 2, targetHeight, targetWidth); //把图片绘制在画布translate之前的中心点，
        ctx.restore(); //恢复状态
    } else {
        // 执行Canvas的drawImage语句
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    }
    //进行最小压缩
    let ndata = canvas.toDataURL("image/png", 0.04);

    return ndata;
}
function deleteItem(ev){
    $(ev.target).parent().remove();
}
function getNameList(name){
    var data = {
        acceptName: name
    }
    data = JSON.stringify(data)

    $.ajax({
        url: ajaxUrl + 'getAcceptNameList',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            if(response.rescode == 200){
                acceptNameList = response.acceptNameList;
                if(acceptNameList.length != 0){
                    $(".ulList").css({"display":'block'});
                    var str = '';
                    for(var item of acceptNameList){
                        str+='<li class="ulListli" onclick="getName(this)"  data-name="'+item.name+'">'+item.name+'</li>'
                    }
                    $(".ulList").find('ul').html($(str));
                }
            }else{
                tanwin(response.data.resdes)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
        }
    });
}
function getCompany(){
    companyList = JSON.parse(localStorage.getItem('companyList'))
    console.log(companyList)
    // var data = {
    //     phoneNum: phone
    // }
    // data = JSON.stringify(data)
    var str='';
    for(let item of companyList){
        str+='<option value='+item.companyCode+'>'+item.companyName+'</option>';
    }
    $("#company").append(str);
}
function addPerson(){
    var companyName = $("#personName").val();
    var companyCard = $("#personIdnum").val();
    if(entourageList.length ==5){
        tanwin("陪同人最多可添加5人");
        return;
    }
    if(companyName == ''){
        tanwin("请输入陪同人姓名");
        return;
    }
    if(companyName.length > 10){
        companyName = companyName.substring(0,10);
    }
    if(companyCard == ''){
        tanwin('请输入陪同人身份证号');
        return;
    }
    var obj = {
        name: companyName,
        cardNum:companyCard
    }
    entourageList.push(obj);
    console.log(entourageList)
    var str='';
    str+='<tr> <td>'+companyName+'</td><td>'+companyCard+'</td><td onClick="deletePerson(this)"">删除</td></tr>';
    companyName = '';
    companyCard = '';
    $("#carBox").append($(str))
}
function deletePerson(el){
    $(e.target).parent().remove()
}
function sureJump(){
    userinfo = {
        name:  $('#applicant').val(),           // 姓名
        phoneNum: phone,         // 手机号
        cardNum: $('#idCard').val(),        // 身份证号
        licenseNum: $(".car_input").attr("data-pai"),     // 车牌号
        companyCode: $('#company').val(),    // 所属公司
        engineNum : $('#chejiaCode').val(),     // 车架号
        photoList: [],
        jiazhengNum: $('#zhunjiaCode').val(),
        photoData: chapterUrl,
    };
    userinfo = JSON.stringify(userinfo);
//  调用出租车身份认证提交接口  /taxiforh5/submitTaxiInfo
    $.ajax({
        url: ajaxUrl + 'submitTaxiInfo',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:userinfo,
        success: function(response) {
            $(".zhegaiceng").css({'display': 'none'});
            if(response.rescode === '200'){
                window.location.href = './index.html'
            }else{
                tanwin(response.resdes)
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $(".zhegaiceng").css({'display': 'none'})
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            $(".zhegaiceng").css({'display': 'none'})
        }
    });
};
function submit(){

    //
    //  验证表单
    var flag = verfilFrom();
    if (!flag) return;
    if(flag){
        window.postMessage('success');
    }



}
function verfilFrom() {
    console.log($(".car_input").attr("data-pai"),next)
    var userinfo = {
        name: '',           // 姓名
        mobile: '',         // 手机号
        cardNum: '',        // 身份证号
        licenseNum: '',     // 车牌号
        companyCode: '',    // 所属公司
        chejiaCode: '',     // 车架号
        zhunjiaCode: '',    // 准驾证号
    };
    var name = $('#applicant').val();
    var cardNum = $('#idCard').val();
    // var mobile = $('#idPhone').val();
    var licenseNum = $('#licenseNum').html();
    var companyCode = $('#company').val();
    var chejiaCode = $('#chejiaCode').val();
    var zhunjiaCode = $('#zhunjiaCode').val();

    var regName =/^[\u4e00-\u9fa5]{2,20}$/;
    var regCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    // var regCheCard = /^[0-9A-Za-z]{1,8}$/;
    //  验证姓名
    if (!regName.test(name)) {
        tanwin('真实姓名填写有误');
        return false;
    }
    //  验证身份证号
    if (!regCard.test(cardNum)) {
        tanwin('身份证号填写有误');
        return false;
    }

    if (!companyCode) {
        tanwin('请选择所属公司');
        return false;
    }
    //  验证车牌号
    if (!($(".car_input").attr("data-pai")) && next !=6) {
        tanwin('车牌号填写有误');
        return false;
    }
    if (!chejiaCode) {
        tanwin('请填写车架号');
        return false;
    }
    if (!zhunjiaCode) {
        tanwin('请填写准驾证号');
        return false;
    }
    return true;
}
function getName(ev) {
    var val = $(ev).text()
    $("#shoufangperson").val(val)
    $(".enquiries-ul").empty()  //清空ul元素内容
    $(".ulList").css({"display":'none'})
}
function selectItem(ev){
    if(carId.length == 7||carId.length == 8){

    }else{
        carId+=$(ev).text();
        console.log($(ev).text())
        $('.showCarText').text(carId)
    }
}