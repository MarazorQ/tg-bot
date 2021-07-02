class CalculateHalper{
    randomIntegerNumber(min, max){
        let rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
    }
    caclucationWins(count_win, count_fail){
        return Math.floor((count_win / (count_win + count_fail)) * 100)
    }
    haversineDistance(latitude2, longitude2, latitude1, longitude1){
        function toRad(x1){
            return  x1* Math.PI / 180;
        }
        let lat2 = latitude2
        let lon2 = longitude2 
        let lat1 = latitude1 
        let lon1 = longitude1 
         
        let R = 6371; // km 
        let x1 = lat2-lat1;
        let dLat = toRad(x1);  
        let x2 = lon2-lon1;
        let dLon = toRad(x2);  
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                         Math.sin(dLon/2) * Math.sin(dLon/2);  
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c;

        return d
    }
}

module.exports = new CalculateHalper()