import axios from 'axios'

const ajaxReq = (url, type, data) => {
  return new Promise((resolve, reject) => {
    axios({ method: type, url: url, data: data }).then((res) => {
      resolve(res.data);
    }).catch(((err) => {
      reject(err)
    }))
  })
}
export const GetProducts = () => {
  return new Promise((resolve, reject) => {
    ajaxReq("http://localhost:3001/product/", 'GET').then((res) => {
      resolve(res);
    }).catch((err) => { reject(err) })
  })
}

export const GetProduct = (id) => {
  return new Promise((resolve, reject) => {
    ajaxReq("http://localhost:3001/product/" + id, "GET").then((res) => {
      resolve(res);
    }).catch((err) => { reject(err) })
  })
}
export const EditProduct = (payload) => {
  return new Promise((resolve, reject) => {
    ajaxReq("http://localhost:3001/product/" + payload.id, "PUT", payload.data).then((res) => {
      resolve(res);
    }).catch((err) => { reject(err) })
  })
}

export const SaveProduct = (data) => {
  console.log(data, 'Hello')
  return new Promise((resolve, reject) => {
    ajaxReq("http://localhost:3001/product", "POST", data).then((res) => {
      console.log(res, 'res')
      resolve(res);
    }).catch((err) => { reject(err) })
  })
}
export const DeleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    ajaxReq("http://localhost:3001/product/" + id, "DELETE").then((res) => {
      resolve(res);
    }).catch((err) => { reject(err) })
  })
}