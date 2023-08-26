import axios from "axios";
import { useEffect, useState } from "react"
import "./style.css"


export const Home = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));
    const [restaurantData, setRestaurantData] = useState([]);

    const handleGetData = async () => {
        const token = userData.token;
        const result = await axios.get("https://staging.fastor.in/v1/m/restaurant?city_id=118&&", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log("hi pavan", result)
        if (result.status === 200) {
            console.log("hi pavan")
            setRestaurantData(result.data);
        }
    }

    useEffect(() => {
        handleGetData();
    }, [])

    return (
        <div className="home-container">
            <div>
                <h2>
                    Popular Ones
                </h2>
            </div>
            <ul>
                {
                    restaurantData.map((data) => {
                        return (
                            <li key={data.restaurant_uuid} className="list">
                                <div className="img-container">
                                    <img src={data.images[0].url} alt="" width="100%" height="100%" />
                                </div>
                                <div className="details">

                                    <h3>{data.restaurant_name}</h3>
                                    <div className="rating-cost-container">
                                        <div>
                                            {data.rating.restaurant_avg_rating}
                                        </div>
                                        <div>
                                            {data.avg_cost_for_two}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}