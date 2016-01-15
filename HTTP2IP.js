
if (HTTP.statusCode >=500) {
 
  var Server = Flow.server.ipaddr
  var Client = Flow.client.ipaddr
  var Error = HTTP.statusCode
  
 
  Device.metricAddDetailCount('HTTP_Errors_linked_IP' , Client + ' has caused a '+HTTP.statusCode +' on ' + Server,1)
 
  //log('HTTP_Errors_linked_IP' + Client + ' has caused a '+HTTP.statusCode +' on ' + Server)
  
}





