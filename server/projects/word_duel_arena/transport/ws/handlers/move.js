const { produce } = require('immer')
const { commitSessionState } = require('../broadcast')
const { markAliveByDevice } = require('../../../domain/session/session')
const { SessionStatuses } = require('../../../config/constants/session')
const { MatchStatuses } = require('../../../config/constants/game')
const { getSolutionState } = require('../../../domain/session/move')

const moveHandler = ({ session, deviceId, payload }) => {
    const nextState = produce(session.state, (draft) => {
        markAliveByDevice(draft, deviceId)
        handleMove(draft, deviceId, payload)
    })

    commitSessionState(session, nextState)
}

function handleMove(draft, deviceId, payload) {
    if (draft.status !== SessionStatuses.ACTIVE) return
    if (draft.currentMatch.status !== MatchStatuses.ACTIVE) return

    getSolutionState(draft, deviceId, payload)
}

module.exports = { moveHandler }
