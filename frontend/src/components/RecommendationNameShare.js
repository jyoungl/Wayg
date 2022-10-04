import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"



function RecommendationNameShare() {
  let { placeName } = useParams()
  console.log(placeName)

  useEffect(() => {
    const fetchInfo = async () => {
    try {
      const response = await axios.post(
      process.env.REACT_APP_HOST+`place/search`, {"placeName":placeName}
    )
    console.log(response)
    } catch (e) {
      console.log(e)
      }
}
    fetchInfo()
  },[])



  return (
    <div>
      {placeName}
    </div>
  )
}

export default RecommendationNameShare