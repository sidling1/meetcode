const SendRequest = async (type,url, data=null, fn=null)=>{
    const xhr = new XMLHttpRequest();

    xhr.open(type,url);
    // xhr.setRequestHeader("mode","no-cors");
    // console.log(data);
    xhr.setRequestHeader("Content-Type","application/json");

    if(fn)xhr.onreadystatechange = fn;

    xhr.send(JSON.stringify(data));

    return xhr;
}

export default SendRequest;