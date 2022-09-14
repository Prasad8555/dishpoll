// import { useSelector } from 'react-redux'
import React from 'react'
import './index.scss'

const VoteItem = (props) => {
    const {vote, onClickVote, itemRank} = props
    const {rank} = vote

    const classNameValue = itemRank === rank ? 'active vote-button' : 'vote-button'

    return(
        <button className={classNameValue}  rank={rank} type="button" onClick={() => onClickVote(rank) }>{rank}</button>
    )
}

export default VoteItem