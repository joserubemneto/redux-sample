import api from '../api'

const getProducts = async () => {
  return await api.get("products")
}

const getProductStock = async (id: number) => {
  return await api.get(`stock/${id}`)
}

const productsService = {
  getProducts,
  getProductStock
}


export default productsService