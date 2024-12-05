const models = {
    usersModel: require('./nosql/users'),
    eventModel: require('./nosql/events'),
    participantModel: require('./nosql/participants'),
    betModel: require('./nosql/bets'),
    resultModel: require('./nosql/results'),
    winnerBetModel: require('./nosql/winnerBets')
}

module.exports = models