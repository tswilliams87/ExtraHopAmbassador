if(event == 'HTTP_REQUEST'){
   // log(HTTP.host)
    
    if( (HTTP.host.indexOf('www.indeed.com') >-1) || 
        (HTTP.host.indexOf('www.glassdoor.com')>-1) ||
        (HTTP.host.indexOf('www.monster.com')>-1) ||
        (HTTP.host.indexOf('jobs.monster.com')>-1)){
        //log('its working')
        //log(host + ' indeed has been launched' +' Query =  ' + HTTP.query + ' payload =  ' +  HTTP.payloadText)
        var search = /q=((([0-9a-zA-Z]+)\%?\+?([0-9]+)?\-?)+)/.exec(HTTP.query)
        var searchDoor = /keyword=(([0-9a-zA-Z]+\+?)+)/.exec(HTTP.query)
        
        //log(search + Flow.client.ipaddr)
        
        
        
        if (search != null){
               if ((HTTP.query.indexOf('what=true') > -1) ||
                   (HTTP.query.indexOf('pub=')>-1) ||
                   (HTTP.query.indexOf('pjcr_json')>-1)){
                    search = null
                    return;
                } else{
                
                search = search[1].replace(/\+/g, ' ' );
                //search = search.replace(/\-/g,' ' );
               log('indeed: ' + search)
               Flow.store.jobSearch = search
                }
         }
        
        
        
        else if(searchDoor != null){
            searchDoor = searchDoor[1].replace(/\+/g, ' ' );
            log('glassdoor: ' +searchDoor)
            Flow.store.jobSearch = searchDoor
        
        }
        //works but needs to be updated due to Monsters new SSL cert
        /*else if(HTTP.uri.indexOf('/search/') > -1){
             log('made it to monster')
            var monsterJob = /q=((([A-Za-z]+)\%?([0-9]+)?)+)/.exec(HTTP.query)
              
            
               if(monsterJob != null){
                monsterJob = monsterJob[1].replace(/\%\d+/g, ' ' );
                log('main page searched ' + monsterJob) 
               //Flow.store.jobSearch = monsterJob
            }else{
                monsterJob = /q=\/(([A-Za-z]+\-?)+)\_?/.exec(HTTP.query)
                monsterJob = monsterJob[1].replace(/\-/g, ' ' );
                log(monsterJob)
                //Flow.store.jobSearch = monsterJob
            
            }
            
           
        
        
        
        }*/
        
    }  
    

}












if(event == 'HTTP_RESPONSE') {

//this application has already been commited from the ExtraHOp bundle Cloud Apps.
//highly recomend downloading it. 
application = 'CloudApps'
client_floor = Flow.client.ipaddr.mask(24)
jobSearch = Flow.store.jobSearch

if(jobSearch != null){
    Application(application).metricAddDetailCount('Overall_Jobs_Searched',jobSearch, 1)
 //this is for break out of different campuses   
 switch(client_floor.toString()) {
    case '10.128.10.0' || '10.128.11.0':
       //log('case works' + client_floor);
      
        break;
    case '10.128.87.0' || '10.128.85.0' || '10.128.84.0':
          if(jobSearch != undefined){
              
           Application(application).metricAddDetailCount('Wireless_job_Searched',jobSearch, 1)
           log('metric added for search ' + jobSearch + ' IP: ' + Flow.client.ipaddr)
           Flow.store.jobSearch = null
             }
         break;
         case '10.128.20.0' || '10.128.21.0':
           if(jobSearch != undefined){
               
       Application(application).metricAddDetailCount('2nd_floor_job_Searched',jobSearch, 1)
       log('metric added for search ' + jobSearch + ' IP: ' + Flow.client.ipaddr)
       Flow.store.jobSearch = null
           }
        break;
    case '10.128.30.0' || '10.128.31.0':
       if(jobSearch != undefined){
       Application(application).metricAddDetailCount('3rd_floor__job_Searched',jobSearch, 1)
       Flow.store.jobSearch = null
       }
     
        break;
          case '10.128.40.0' || '10.128.41.0':
         if(jobSearch != undefined){
       
       Application(application).metricAddDetailCount('4th_floor__job_Searched',jobSearch, 1)
       Flow.store.jobSearch = null
         }
        break;
    case '10.128.50.0' || '10.128.51.0':
       if(jobSearch != undefined){
       Application(application).metricAddDetailCount('5th_floor__job_Searched',jobSearch, 1)
       Flow.store.jobSearch = null
       }
        break;
         
 
 }
}
}
