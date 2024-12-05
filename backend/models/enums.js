const EventStatusEnum = {
    SCHEDULED: 'scheduled',
    IN_PROGRESS: 'in_progress',
    FINISHED: 'finished'
};

const BetProposalTypeEnum = Object.freeze({
    WINNER: 'WinnerBet'
});

const BetProposalStatusEnum = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
};

const ResultStatusEnum = {
    OPEN: 'open',
    CLOSED: 'closed'
};

const UserBetStatusEnum = Object.freeze({
    OPEN: 'open',
    WON: 'won',
    LOST: 'lost',
    CANCELLED: 'cancelled'
});

const UserRolesEnum = Object.freeze({
    USER: 'user',
    ADMIN: 'admin',
});

const EventTagsEnum = Object.freeze({
    TRIATLON: 'triatlon',
    DUATLON: 'duatlon',
    SPRINT: 'sprint',
    10: '10k',
    MEDIA: '21k',
    SUPER_SPINT: 'super_sprint',
    HALF: 'half',
    LIGA_DU: 'liga_du',
    LIGA_TRI: 'liga_tri',
    OLIMPICO: 'olimpico',
    CTO_ESPANA: 'cto_espana',
    CTO_MAD: 'cto_mad',
});

module.exports = { UserRolesEnum, EventTagsEnum, EventStatusEnum, BetProposalStatusEnum, BetProposalTypeEnum, UserBetStatusEnum, ResultStatusEnum};