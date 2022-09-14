import { useSelector } from "react-redux"

const LeaderBoardItem = (props) => {
    const {dish, indexValue} = props
    const { id, image, dishName} = dish

    const {isLogged, ranks, user} = useSelector((store) => store.dishes)
    let classNameVlaue = 'leader-board-item'
    if (isLogged !== undefined && isLogged !== false){
        const userRanks = ranks[user]
        const selectedItemsIds = [userRanks['first'], userRanks['secound'], userRanks['thered']]
        classNameVlaue = selectedItemsIds.includes(id) ? 'leader-board-item selected' : 'leader-board-item'
    }

    return(
        <li className={classNameVlaue} >
            <img src={image} alt={dishName} />
            <h1>{dishName}</h1>
            <h1>{indexValue + 1}</h1>
        </li>
        )
    }

export default LeaderBoardItem