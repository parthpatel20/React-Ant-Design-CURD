import { GetProducts, SaveProduct, EditProduct, DeleteProduct } from '../services/productApi'


export default {
  namespace: 'product',
  state: {
    products: [],
    orgProducts: [],
    loading: true,
    product: null,
    productId: null,
    toggleDrawer: false,
    drawerTitle: "ADD NEW"
  },

  effects: {
    *fetchProducts(action, { call, put }) {  // eslint-disable-line
      yield put({ type: 'FETCHING_PRODUCTS' })
      const result = yield call(GetProducts);
      yield put({ type: 'SHOW_PRODUCTS', payload: result })
    },
    *fetchProduct(action, { call, put }) {
      yield put({ type: 'SHOW__PRODUCT', payload: action.payload })
    }
    ,
    *addNew(action, { call, put }) {
      yield put({ type: 'ADD__PRODUCT' })
    },
    *saveNewProduct({ payload }, { call, put }) {
      const res = yield call(SaveProduct, payload)
      if (res) {
        yield put({ type: 'fetchProducts' })
      }
    },
    *editProduct({ payload }, { call, put }) {
      const res = yield call(EditProduct, payload)
      if (res) {
        yield put({ type: 'fetchProducts' })
      }
    },
    *deleteProduct({ payload }, { call, put }) {
      yield call(DeleteProduct, payload)
      yield put({ type: 'fetchProducts' })
    },
    *searchProduct({ payload }, { put, select }) {
      var products = []
      const productList = yield select(state => state.product.orgProducts)
      productList.forEach((product) => {
        if (product.name.toString().toLowerCase().includes(payload)) {
          products.push(product)
        }
      })
      if (products !== []) {
        yield put({ type: 'FILTERED__PRODUCTS', payload: products })  //FILTERED__PRODUCTS
      }
      else {
        yield put({ type: 'fetchProducts', })  //FILTERED__PRODUCTS

      }
    },
    *closetToggle(action, { call, put }) {
      yield put({ type: 'fetchProducts' })
    }
  },

  reducers: {
    FETCHING_PRODUCTS(state, action) {
      return {
        ...state,
        loading: true
      }
    },
    SHOW_PRODUCTS(state, action) {
      return {
        ...state,
        loading: false,
        product: null,
        productId: null,
        products: action.payload,
        orgProducts: action.payload,
        toggleDrawer: false,
      }
    },
    FILTERED__PRODUCTS(state, action) {
      return {
        ...state,
        loading: false,
        product: null,
        productId: null,
        products: action.payload,
        toggleDrawer: false,
      }
    }
    ,
    SHOW__PRODUCT(state, action) {
      return {
        ...state,
        product: action.payload,
        productId: action.payload.id,
        toggleDrawer: true,
        drawerTitle: "EDIT"
      }
    },
    ADD__PRODUCT(state, action) {
      return {
        ...state,
        product: null,
        productId: null,
        toggleDrawer: true,
        drawerTitle: "ADD NEW"
      }
    },
    CLOSE_DRAWER(state, action) {
      return {
        ...state,
        products: action.payload,
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'fetchProducts' });
        }
      })
    },
  },
}
