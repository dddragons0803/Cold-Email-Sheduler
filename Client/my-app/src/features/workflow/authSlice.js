// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   loading: true,
//   user: null,
//   error: null,
// };

// export const checkAuth = createAsyncThunk(
//     'auth/checkAuth',
//     async (_, thunkAPI) => {
//       try {
//         const token = localStorage.getItem('token'); // Retrieve the token from storage
//         if (!token) throw new Error('No token found');
        
//         // Optionally, verify token with backend
//         const response = await axios.get('/api/auth/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         return response.data.user; // Assuming the API returns the user data
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   );

//   export const login = (credentials) => async (dispatch) => {
//     try {
//       const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
//       localStorage.setItem('token', response.data.token);
//       dispatch(loginSuccess({ token: response.data.token }));
//       dispatch(loadUser());
//     } catch (error) {
//       dispatch(loginFail());
//     }
//   };
  
//   export const register = (userData) => async (dispatch) => {
//     try {
//       await axios.post('http://localhost:3000/api/auth/register', userData);
//       dispatch(registerSuccess());
//     } catch (error) {
//       dispatch(registerFail());
//     }
//   };
  
//   export const loadUser = () => async (dispatch) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
//     try {
//       const response = await axios.get('http://localhost:3000/api/auth/profile');
//       dispatch(userLoaded(response.data));
//     } catch (error) {
//       dispatch(authError());
//     }
//   };
  
//   export const logoutUser = () => (dispatch) => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     dispatch(logout());
//   };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       state.loading = false;
//     },
//     loginFail: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = 'Login failed';
//     },
//     registerSuccess: (state) => {
//       state.loading = false;
//     },
//     registerFail: (state) => {
//       state.error = 'Registration failed';
//       state.loading = false;
//     },
//     userLoaded: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//       state.loading = false;
//     },
//     authError: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//       });
//   },
// });

// export const {
//   loginSuccess,
//   loginFail,
//   registerSuccess,
//   registerFail,
//   userLoaded,
//   authError,
//   logout,
// } = authSlice.actions;



// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
        console.log("credential",credentials)
      const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    try {
      const response = await axios.get('http://localhost:3000/api/auth/profile');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  return;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login fulflled")
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;

