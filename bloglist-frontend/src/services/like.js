import axios from "axios"

const baseUrl = '/api/blogs'

const like = async (blogObj) => {
  const response = await axios.put(`${baseUrl}/${blogObj.id}`, blogObj)
  return response.data
}

export default { like }