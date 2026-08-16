import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionsSlice"

const Connections = () => {

    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()

    const fetchConnections = async() => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true})
            dispatch(addConnections(res?.data?.data))
        } catch(err) {
            //
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(!connections) {
        return (
            <div> Loading... </div>
        )
    }

    if(connections.length === 0 ) {
        return <h2 className="font-bold text-center">There are no connections!</h2>
    }

    return (
        <div className="my-10">
            <h1 className="text-center font-bold text-2xl p-2">Connections</h1>
            {connections.map((connection) => {
                const {firstName, lastName, photoUrl, age, gender, about } = connection

                return (
                    <div className="flex p-4 rounded-lg bg-base-300 w-1/2 m-auto">
                        <div className="p-4">
                            <img alt="user-photo" className="w-30 h- 30 rounded-full" src = {photoUrl}/>
                        </div>
                        <div>
                            <h2 className="font-bold text-xl"> { firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Connections;