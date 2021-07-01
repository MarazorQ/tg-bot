class CalculateHalper{
    randomIntegerNumber(min, max){
        let rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
    }
    caclucationWins(count_win, count_fail){
        return Math.floor((count_win / (count_win + count_fail)) * 100)
    }
}

module.exports = new CalculateHalper()