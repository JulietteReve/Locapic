export default function(POILIst= [], action){ 
    if(action.type == 'savePOI'){
        var newPOIList = [...POILIst, action.newPOI]
        return newPOIList;
    } else if (action.type == 'deletePOI') {
        var newPOIList = [...POILIst];
        var hello = newPOIList.filter((item) => item.title != action.POI.title)
        return hello;
    }else {
        return POILIst;
    }
}