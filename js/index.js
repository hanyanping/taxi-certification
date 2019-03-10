var phone = '';
var applyNum = '';
window.onload = function() {
    document.addEventListener('message', function(msg) {
        var data = JSON.parse(msg.data)
        if(data.hasOwnProperty('phoneNum')){
            phone = data.phoneNum;
            localStorage.setItem('phone',data.phoneNum)
            getDetail();
        }
    });
}

$(function(){


})
function refresh(){
    $(".zhegaiceng").css({'display': 'block'})
    var data = {
        phoneNum: phone,
        applyNum: applyNum
    }
    data = JSON.stringify(data)
    $.ajax({
        url: ajaxUrl + 'refreshStatus',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            $(".zhegaiceng").css({'display': 'none'})
            if(response.rescode == 200){
                getDetail()
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
}
function getDetail(){
    $(".zhegaiceng").css({'display': 'block'})
    var data = {
        phoneNum: phone
    }
    data = JSON.stringify(data)
    $.ajax({
        url: ajaxUrl + 'getTaxiInfo',
        timeout: 3000,
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        dataType: "json",
        data:data,
        success: function(response) {
            $(".zhegaiceng").css({'display': 'none'})
            if(response.rescode == 200){
                var content = response;
                $(".zhinan").attr("href",content.guideUrl);
                localStorage.setItem('companyList',JSON.stringify(content.companyList))
                if(content.dataFlag == 1 ){//有数据
                    applyNum = content.applyNum;
                    $(".showUserinfo").css({'display':"block"});
                    $(".name").html(content.name);
                    $(".cardNum").html(content.cardNum)
                    $(".licenseNum ").html(content.licenseNum )
                    $(".engineNum ").html(content.engineNum )
                    $(".auditCompany").html(content.company)
                    $(".cardPhotoUrl").attr('src',content.cardPhotoUrl);
                    $(".auditStatusName").html(content.auditStatusName);
                    $(".refresh").css({'display':'none'})
                    if(content.auditStatus == 4 || content.auditStatus == 3){
                        $(".validTime").html(content.validTime)
                        $(".statusIcon").attr("src",'./images/chenggong.jpg')
                    }
                    if(content.auditStatus == 1 || content.auditStatus == 2 || content.auditStatus == 5){
                        $(".reApplay").css({'display':'block'})
                        $(".statusIcon").attr("src",'./images/fail.jpg')
                    }
                }
                if(content.dataFlag == 2 ){//无数据
                    $(".goUserinfo").css({'display':"block"})
                }
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
}