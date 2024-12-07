const Status = {
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    FINISHED: 'finished'
};

const setStatus = (event, status) => {
    event.status = status
};

const setWinner = (event, winner) => {
    event.result = {
        winner: {
            participant: winner
        }
    };
};

const checkBets = async (eventId, winner) => {
    const betOptions = await betOptionsModel.find({event: eventId});

    for (const betOption of betOptions) {
        // Comprobar que el tipo de apuesta sea "winner"
        const participantId = betOption.participant; // Suponiendo que el ObjectId está en req.body._id
        const participantIdString = participantId.toString();
        const betOptionId = betOption._id; // Suponiendo que el ObjectId está en req.body._id
        const betOptionIdString = betOptionId.toString();


        const bets = await betModel.find({betOption: betOptionIdString});

        // Comprobamos el tipo de apuesta y actualizamos el estado de cada apuesta
        bets.forEach(async (bet) => {
            // Verificamos si la apuesta es ganadora
            if (betOption.betType === "winner") {
                if (participantIdString === winner) {
                    if (!bet.isClaimed) { // Verifica si la apuesta no ha sido cobrada
                        bet.status = "won"; // Cambia el estado a 'ganada'
                        console.log(bet.user)
                        // Actualizar el estado del dinero del usuario
                        const user = await usersModel.findById(bet.user); // Suponiendo que el ID del usuario está en la apuesta
                        if (user) {
                            const winnings = bet.amount * bet.odds; // Calcula las ganancias
                            user.balance += winnings; // Aumenta el saldo del usuario
                            await user.save(); // Guarda los cambios en el usuario
                        }
                        bet.isClaimed = true; // Marca la apuesta como cobrada
                    }
                } else {
                    if (!bet.isClaimed) {
                        bet.status = "lost";
                        bet.isClaimed = "true"
                    }
                    // Cambia el estado a 'perdida' para las que no cumplen
                }
            }
            await bet.save(); // Guarda los cambios en cada apuesta
        });

    }
}


module.exports = {setStatus, setWinner, Status, checkBets};
