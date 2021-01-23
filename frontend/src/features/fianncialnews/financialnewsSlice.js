import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const apiUrlNews = `${process.env.REACT_APP_DEV_API_URL}api/news/`;
const apiUrl = "http://127.0.0.1:8000/"

export const fetchAsyncGetNews = createAsyncThunk("news/get", async () => {
  const res = await axios.get(`${apiUrl}api/news`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});


export const newsSlice = createSlice({
  name: "news",
  initialState: {
    isLoadingNews: false,
    openNewNews: false,
    financial_news: [
      {
        publisher: 1,
        title: "",
        detail: "",
        detail_url: "",
        article_timestamp: "",
      },
    ],
  },
  reducers: {
    fetchNewsStart(state) {
      state.isLoadingNews = true;
    },
    fetchNewsEnd(state) {
      state.isLoadingNews = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetNews.fulfilled, (state, action) => {
      state.financial_news = action.payload;
    });
  },
});

export const {
  fetchNewsStart,
  fetchNewsEnd,
} = newsSlice.actions;

//外にstateを出力するためのselect
export const selectIsLoadingNews = (state) =>
  state.financial_news.isLoadingNews;
export const selectNews = (state) => state.news.financial_news;

export default newsSlice.reducer;