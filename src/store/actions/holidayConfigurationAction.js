import {
  createHolidayListService,
  fetchHolidaysListService,
  fetchHolidayTypeCodeListService,
  updateHolidayListService,
  deleteHolidayListService,
} from "../services/holidaysListService";
import { showAlert } from "../slices/alertSlice";
import {
  storeHolidayList,
  storePaginateIndexSize,
  storeAllCategoryHolidayList,
} from "../slices/holidaySlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

import { useSelector } from "react-redux";

const currentYear = new Date().getFullYear();

export const storePaginationIndexSize = (pageIndex, pageSize) => {
  return (dispatch) => {
    dispatch(storePaginateIndexSize({ pageIndex, pageSize }));
  };
};

export const fetchAllHolidaysLeaves = (pageIndex, pageSize, year) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchHolidaysListService(pageIndex, pageSize, year)
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeHolidayList(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: res?.message || "Holidays fetched Successfully",
          }),
        );
        console.log("leave details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Holidays Get Failed",
            message: err?.message || "Holidays fetched API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const createHolidayList = (
  payload,
  setPagination,
  paginationIndex,
  paginationSize,
) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    createHolidayListService(payload)
      .then((res) => {
        dispatch(globalLoaderClose());
        // setPagination((prev) => ({
        //   ...prev,
        //   pageIndex: 0,
        // }));
        dispatch(
          fetchAllHolidaysLeaves(paginationIndex, paginationSize, currentYear),
        );
        dispatch(
          showAlert({
            type: "success",
            title: res?.message || "Holidays created Successfully",
          }),
        );
        console.log("leave details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Holidays created Failed",
            message: err?.message || "Holidays created API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const updateHolidayList = (
  holidayId,
  setPagination,
  payload,
  paginationIndex,
  paginationSize,
) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    updateHolidayListService(payload, holidayId)
      .then((res) => {
        dispatch(globalLoaderClose());
        // setPagination((prev) => ({
        //   ...prev,
        //   pageIndex: 0,
        // }));
        dispatch(
          fetchAllHolidaysLeaves(paginationIndex, paginationSize, currentYear),
        );
        dispatch(
          showAlert({
            type: "success",
            title: res?.message || "Holidays created Successfully",
          }),
        );
        console.log("leave details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Holidays created Failed",
            message: err?.message || "Holidays created API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const deleteHolidayList = (
  holidayId,
  setPagination,
  payload,
  paginationIndex,
  paginationSize,
) => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    deleteHolidayListService(holidayId)
      .then((res) => {
        dispatch(globalLoaderClose());
        // setPagination((prev) => ({
        //   ...prev,
        //   pageIndex: 0,
        // }));
        dispatch(
          fetchAllHolidaysLeaves(paginationIndex, paginationSize, currentYear),
        );
        dispatch(
          showAlert({
            type: "success",
            title: res?.message || "Holidays deleted Successfully",
          }),
        );
        console.log("leave details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Holidays deleted Failed",
            message: err?.message || "Holidays deleted API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};

export const fetchHolidayTypeCodeList = () => {
  return (dispatch) => {
    dispatch(globalLoaderOpen());
    fetchHolidayTypeCodeListService()
      .then((res) => {
        dispatch(globalLoaderClose());
        dispatch(storeAllCategoryHolidayList(res?.data?.data));
        dispatch(
          showAlert({
            type: "success",
            title: res?.message || "Holidays created Successfully",
          }),
        );
        console.log("leave details___", res);
      })
      .catch((err) => {
        dispatch(globalLoaderClose());
        dispatch(
          showAlert({
            type: "error",
            title: err?.error || "Holidays created Failed",
            message: err?.message || "Holidays created API failed",
          }),
        );

        console.log("error_message", err?.message);
      });
  };
};
